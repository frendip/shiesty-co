import React from 'react';
import {getProductById} from '@/lib/api/index';
import {ProductSlider} from '@/components';

interface ShirtProps {
	params: {id: string};
}

export default async function Shirt({params}: ShirtProps) {
	const product = await getProductById(params.id);

	const sliderImages = Object.values(product.item.imageData.urls).map((url, index) => ({
		src: url,
		alt: `Фото ${index + 1}`
	}));

	return (
		<div className="w-4/5 mx-auto my-12">
			<div className="grid grid-cols-2 gap-7">
				<ProductSlider className="h-[60vh]" sliderImages={sliderImages} />
				<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit explicabo odit, sunt excepturi incidunt minus iusto vitae reiciendis exercitationem expedita voluptatem, illo debitis quidem voluptatibus totam, dicta est quos! Maiores!
				Sit commodi cumque corporis omnis? Eius officia dolore recusandae modi, laudantium hic? Ipsam, ab? Enim, nesciunt et ipsum expedita nam nulla consequatur minima, sunt, illo architecto molestias cupiditate hic? Cum!
				Velit, iusto odit facere vero sint nisi veritatis optio ut tempore eligendi quaerat aliquam aliquid? Fugit in aliquid iste exercitationem architecto assumenda veritatis alias deleniti impedit illum dolore, maiores esse.
				Commodi iure repellendus possimus aliquid laborum? Ut tempora amet id, nostrum voluptate assumenda, aliquid quaerat distinctio maxime nisi, enim voluptatem. Delectus iure deserunt nemo maiores, ipsam ad ipsum totam praesentium.
				Nulla, asperiores. Nisi porro fuga voluptate officia, velit incidunt dicta, exercitationem a distinctio itaque est non delectus! Eveniet adipisci ipsum aspernatur necessitatibus quaerat, expedita, numquam repellendus nobis deleniti sit perferendis!
				Distinctio eos sequi illo placeat eaque quo quos possimus inventore dolore cumque. Repellat odit qui sequi odio ducimus. Impedit harum nulla incidunt distinctio suscipit iure perferendis ea sapiente eos molestias!
				Totam et qui amet asperiores, in quae nulla alias. Explicabo, velit asperiores? Debitis libero porro iste ipsum eos nesciunt sit ad alias asperiores eius, facilis mollitia vel beatae recusandae cupiditate?
				Laudantium alias reiciendis voluptates quaerat, laboriosam magni odit eligendi necessitatibus animi hic delectus ipsam consequuntur? Nobis enim nulla maxime, facere autem ullam nemo aliquam beatae? Repellendus ratione excepturi placeat tempora?
				Aut, consequatur nam officiis neque ipsam omnis blanditiis at soluta unde ipsum autem. Optio, quos molestias! Facilis eaque, porro ex dolor mollitia corporis accusamus nulla voluptatibus obcaecati minima enim. Hic.
				Impedit voluptatibus atque, esse quos placeat quasi doloremque consectetur, voluptates cupiditate omnis pariatur quia dolore fugit commodi, expedita vel suscipit asperiores perferendis sequi adipisci. Nesciunt eligendi quisquam voluptate aperiam iure!</div>
			</div>
		</div>
	);
}
