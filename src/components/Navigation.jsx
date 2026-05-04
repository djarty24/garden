import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

	const [isWorkPage, setIsWorkPage] = useState(false);

	useEffect(() => {
		const checkPath = () => {
			const currentPath = window.location.pathname;
			setIsWorkPage(currentPath === '/work' || currentPath === '/work/');
		};

		checkPath();

		document.addEventListener('astro:page-load', checkPath);

		return () => document.removeEventListener('astro:page-load', checkPath);
	}, []);

	const links = [
		{ name: 'Home', path: '/' },
		{ name: 'About', path: '/about' },
		{ name: 'Work', path: '/work' },
		{ name: 'Garden', path: '/garden' },
		{ name: 'Guest Book', path: '/guestbook' },
		{ name: 'Download CV', path: '/cv' },
		{ name: 'Contact', path: '/contact' }
	];

	const headerTextColor = isWorkPage ? 'text-canvas' : 'text-ink';
	const headerSubTextColor = isWorkPage ? 'text-canvas/70' : 'text-slate/60';

	return (
		<>
			<header className={`fixed top-0 left-0 right-0 w-full flex justify-between items-center p-8 z-50 pointer-events-none transition-colors duration-1000 ease-in-out`}>

				<div className={`text-sm italic font-serif pointer-events-auto transition-colors duration-1000 ${headerSubTextColor}`}>
					endlessly building
				</div>

				<div className={`text-xl font-serif pointer-events-auto absolute left-1/2 -translate-x-1/2 transition-colors duration-1000 ${headerSubTextColor}`}>
					my studio
				</div>

				<button
					onClick={() => setIsOpen(!isOpen)}
					className={`w-8 h-8 flex items-center justify-center text-3xl pointer-events-auto transition-colors duration-1000 font-sans ${headerTextColor}`}
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
						className="fixed inset-0 bg-canvas/95 z-40 flex items-center justify-center"
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