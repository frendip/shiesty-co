import React from 'react';

interface CommonButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	size?: 'auto' | 'full';
	view?: keyof typeof viewType;
	children: React.ReactNode;
}

const viewType = {
	primary: 'bg-black text-white hover:bg-gray-800',
	secondary: 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
} as const;

function CommonButton({size = 'full', view = 'primary', children, ...buttonProps}: CommonButtonProps) {
	const width = size === 'auto' ? 'w-fit' : 'w-full';

	return (
		<button
			{...buttonProps}
			className={`${width} ${viewType[view]} py-4 px-6 rounded-lg font-semibold transition-colors duration-200`}
		>
			{children}
		</button>
	);
}

export default CommonButton;
