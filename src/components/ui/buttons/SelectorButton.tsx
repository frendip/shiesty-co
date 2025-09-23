import React from 'react';

interface SelectorButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	view?: keyof typeof viewType;
	size?: keyof typeof sizeType;
	isActive?: boolean;
	children: React.ReactNode;
}

const activeButtonStyle = 'border-black bg-black text-white';
const inactiveButtonStyle = 'border-gray-300 bg-white text-gray-700 hover:border-gray-400';

const viewType = {
	single: 'rounded-lg',
	left: 'rounded-l-lg border-r-0',
	right: 'rounded-r-lg border-l-0',
	center: 'border-l-0  border-r-0'
} as const;

const sizeType = {
	small: 'px-3 py-1.5',
	base: 'px-4 py-2'
} as const;

function SelectorButton({view = 'single', size = 'base', isActive, children, ...buttonProps}: SelectorButtonProps) {
	return (
		<button
			{...buttonProps}
			type="button"
			className={`${sizeType[size]} border-2 ${viewType[view]} font-medium transition-colors duration-150 ${
				isActive ? activeButtonStyle : inactiveButtonStyle
			}`}
		>
			{children}
		</button>
	);
}

export default SelectorButton;
