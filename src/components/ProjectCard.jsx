import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProjectCard({ title, description, link }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<a
			href={link}
			className="relative block w-full p-6 bg-canvas border border-slate/20 rounded-sm shadow-md transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<h3 className="text-xl font-serif text-ink mb-2 relative z-20">{title}</h3>
			<p className="text-sm font-sans text-slate relative z-20">{description}</p>

			<svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
				<motion.path
					d="M 10,120 L 10,45 L 25,30 L 180,30"
					fill="transparent"
					stroke="#D47A6A"
					strokeWidth="2"
					strokeLinecap="square"
					strokeLinejoin="miter"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{
						pathLength: isHovered ? 1 : 0,
						opacity: isHovered ? 1 : 0
					}}
					transition={{ duration: 0.35, ease: "easeOut" }}
				/>
				<motion.circle
					cx="180"
					cy="30"
					r="3"
					fill="#D47A6A"
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						scale: isHovered ? 1 : 0,
						opacity: isHovered ? 1 : 0
					}}
					transition={{ duration: 0.2, delay: isHovered ? 0.3 : 0 }}
				/>
			</svg>
		</a>
	);
}