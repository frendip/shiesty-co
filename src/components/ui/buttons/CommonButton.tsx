import React from 'react';

interface CommonButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	size?: 'auto' | 'full';
	children: React.ReactNode;
}

function CommonButton({size = 'full', children, ...buttonProps}: CommonButtonProps) {
	const width = size === 'auto' ? 'w-fit' : 'w-full';

	return (
		<button
			{...buttonProps}
			className={`${width} bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200`}
		>
			{children}
		</button>
	);
}

export default CommonButton;
