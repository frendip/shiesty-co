import React from 'react';

interface LinkButtonProps {
	href: string;
	label: string;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	className?: string;
}

function LinkButton({href, label, className = '', Icon}: LinkButtonProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`${className || ''} flex items-center gap-1 p-2 hover:text-gray-300 transition-colors duration-200`}
		>
			<Icon className="w-5 h-5 fill-current" />
			<span className="font-medium">{label}</span>
		</a>
	);
}

export default LinkButton;
