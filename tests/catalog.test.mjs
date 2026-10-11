import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {readFile} from 'node:fs/promises';
import {createServer} from 'node:net';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const next = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const env = {
	...process.env,
	NEXT_TELEMETRY_DISABLED: '1',
	// The catalog must work even when no external API is available.
	NEXT_PUBLIC_API_URL: 'http://127.0.0.1:1'
};

function runNext(args, context) {
	const child = spawn(process.execPath, [next, ...args], {
		cwd: root,
		env,
		stdio: ['ignore', 'pipe', 'pipe']
	});
	const abort = () => child.kill('SIGKILL');
	context.signal.addEventListener('abort', abort, {once: true});
	child.once('exit', () => context.signal.removeEventListener('abort', abort));
	let output = '';
	child.stdout.on('data', (chunk) => { output += chunk; });
	child.stderr.on('data', (chunk) => { output += chunk; });
	return {child, output: () => output};
}

async function availablePort() {
	const server = createServer();
	server.listen(0, '127.0.0.1');
	await once(server, 'listening');
	const port = server.address().port;
	await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
	return port;
}

test('production catalog works without a separately running API', {timeout: 120_000}, async (t) => {
	const build = runNext(['build'], t);
	const [buildCode] = await once(build.child, 'exit');
	assert.equal(buildCode, 0, build.output());

	const port = await availablePort();
	const app = runNext(['start', '--hostname', '127.0.0.1', '--port', String(port)], t);
	const base = `http://127.0.0.1:${port}`;
	t.after(async () => {
		if (app.child.exitCode === null && app.child.signalCode === null) {
			const exited = once(app.child, 'exit');
			app.child.kill('SIGTERM');
			await exited;
		}
	});

	let ready = false;
	for (let attempt = 0; attempt < 100; attempt++) {
		if (app.child.exitCode !== null) break;
		try {
			await fetch(base + '/api/products', {signal: AbortSignal.timeout(1000)});
			ready = true;
			break;
		} catch {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
	}
	assert.ok(ready, app.output());

	const products = JSON.parse(await readFile(new URL('../src/data/products.json', import.meta.url), 'utf8'));
	assert.ok(products.length > 0, 'The storefront needs at least one product');
	const product = products[0];

	await t.test('catalog API returns the local catalog and filters it', async () => {
		let response = await fetch(base + '/api/products');
		assert.equal(response.status, 200);
		assert.deepEqual(await response.json(), {items: products, total: products.length});

		for (const query of ['category=missing-category', 'maxPrice=0', 'minPrice=999999999']) {
			response = await fetch(base + '/api/products?' + query);
			assert.equal(response.status, 200);
			assert.deepEqual(await response.json(), {items: [], total: 0});
		}

		response = await fetch(base + '/api/products?minPrice=0');
		assert.deepEqual(await response.json(), {items: products, total: products.length});
	});

	await t.test('product API returns an item or 404', async () => {
		let response = await fetch(base + '/api/products/' + product.id);
		assert.equal(response.status, 200);
		assert.deepEqual(await response.json(), {item: product});

		response = await fetch(base + '/api/products/missing-product');
		assert.equal(response.status, 404);
		assert.deepEqual(await response.json(), {error: 'missing-product'});
	});

	await t.test('storefront pages render the catalog and product', async () => {
		let response = await fetch(base);
		assert.equal(response.status, 200);
		assert.ok((await response.text()).includes('/shirts/' + product.id));

		response = await fetch(base + '/shirts/' + product.id);
		assert.equal(response.status, 200);
		assert.ok((await response.text()).includes(product.imageData.urls.front));

		response = await fetch(base + '/shirts/missing-product');
		assert.equal(response.status, 404);
	});
});
