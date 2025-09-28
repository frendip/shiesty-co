import React from 'react';

interface SelectorButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	type?: keyof typeof typeVariants;
	isActive?: boolean;
	children: React.ReactNode;
}

const activeButtonStyle = 'border-black bg-black text-white hover:bg-gray-800';
const inactiveButtonStyle = 'border-gray-300 bg-white text-gray-700 hover:border-gray-400';

const typeVariants = {
	single: 'rounded-lg',
	left: 'rounded-l-lg border-r-0',
	right: 'rounded-r-lg border-l-0',
	center: 'border-l-0  border-r-0'
} as const;

function SelectorButton({type = 'single', className, isActive, children, ...buttonProps}: SelectorButtonProps) {
	return (
		<button
			{...buttonProps}
			type="button"
			className={`${className || ''} ${typeVariants[type]} border-2 font-medium transition-colors duration-150 ${
				isActive ? activeButtonStyle : inactiveButtonStyle
			}`}
		>
			{children}
		</button>
	);
}

export default SelectorButton;
