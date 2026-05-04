import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

	const links = [
		{ name: 'Home', path: '/' },
		{ name: 'About', path: '/about' },
		{ name: 'Work', path: '/work' },
		{ name: 'Garden', path: '/garden' },
		{ name: 'Guest Book', path: '/guestbook' },
		{ name: 'Download CV', path: '/cv' },
		{ name: 'Contact', path: '/contact' }
	];

	return (
		<>
			<header className="fixed top-0 left-0 right-0 w-full flex justify-between items-center p-8 z-50 pointer-events-none">

				<div className="text-sm text-slate italic font-serif pointer-events-auto">
					endlessly building
				</div>

				<div className="text-xl font-serif text-slate/60 pointer-events-auto absolute left-1/2 -translate-x-1/2">
					my studio
				</div>

				<button
					onClick={() => setIsOpen(!isOpen)}
					className="w-8 h-8 flex items-center justify-center text-3xl pointer-events-auto hover:text-slate transition-colors font-sans"
					aria-label="Toggle Menu"
				>
					<motion.div
						initial={false}
						animate={{ rotate: isOpen ? 180 : 0 }}
						transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					>
						{isOpen ? '−' : '+'}
					</motion.div>
				</button>
			</header>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						transition={{ duration: 0.4 }}
						className="fixed inset-0 bg-canvas/75 z-40 flex items-center justify-center"
					>
						<nav className="flex flex-col gap-4 text-center">
							{links.map((link, i) => (
								<motion.a
									key={link.name}
									href={link.path}
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 15 }}
									transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
									className="text-left leading-tight text-3xl md:text-4xl font-serif text-ink hover:text-slate transition-colors"
									onClick={() => setIsOpen(false)}
								>
									{link.name}
								</motion.a>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}