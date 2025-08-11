import React from 'react';

interface SelectorButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	isActive: boolean;
	children: React.ReactNode;
}

const activeButtonStyle = 'border-black bg-black text-white';
const inactiveButtonStyle = 'border-gray-300 bg-white text-gray-700 hover:border-gray-400';

function SelectorButton({isActive, children, ...buttonProps}: SelectorButtonProps) {
	return (
		<button
			{...buttonProps}
			type="button"
			className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors duration-150 ${
				isActive ? activeButtonStyle : inactiveButtonStyle
			}`}
		>
			{children}
		</button>
	);
}

export default SelectorButton;
