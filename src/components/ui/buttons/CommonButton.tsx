import React from 'react';

interface CommonButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	sizeX?: number;
	sizeY?: number;
	isStretched?: boolean;
	view?: keyof typeof viewVariants;
	children: React.ReactNode;
}

const viewVariants = {
	primary: 'bg-black border-black text-white hover:bg-gray-800 hover:border-gray-800',
	secondary: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
} as const;

function CommonButton({
	sizeX = 4,
	sizeY = 4,
	view = 'primary',
	isStretched,
	children,
	...buttonProps
}: CommonButtonProps) {
	return (
		<button
			{...buttonProps}
			className={`${viewVariants[view]}
			${
				isStretched ? 'w-full' : 'w-auto'
			} px-${sizeX} py-${sizeY} border-2 rounded-lg font-semibold transition-colors duration-200`}
		>
			{children}
		</button>
	);
}

export default CommonButton;
