import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [isWorkPage, setIsWorkPage] = useState(false);

	const actionWords = ["building", "experimenting", "iterating", "smiling", "creating", "tinkering", "exploring"];
	const [wordIndex, setWordIndex] = useState(0);

	useEffect(() => {
		const checkPath = () => {
			const currentPath = window.location.pathname;
			setIsWorkPage(currentPath === '/work' || currentPath === '/work/');
		};

		checkPath();
		document.addEventListener('astro:page-load', checkPath);
		return () => document.removeEventListener('astro:page-load', checkPath);
	}, []);

	const handleWordCycle = () => {
		setWordIndex((prev) => (prev + 1) % actionWords.length);
	};

	const links = [
		{ name: 'Home', path: '/' },
		{ name: 'About', path: '/about' },
		{ name: 'Work', path: '/work' },
		{ name: 'Garden', path: '/garden' },
		{ name: 'Guest Book', path: '/guestbook' },
		{ name: 'Download CV', path: '/cv' },
		{ name: 'Contact', path: '/contact' }
	];

	const headerTextColor = (isWorkPage && !isOpen) ? 'text-canvas' : 'text-ink';
	const headerSubTextColor = (isWorkPage && !isOpen) ? 'text-canvas/70' : 'text-ink/80';

	return (
		<>
			<header className={`fixed top-0 left-0 right-0 w-full flex justify-between items-center p-8 z-50 pointer-events-none transition-colors duration-1000 ease-in-out`}>

				<a
					href="/"
					onClick={handleWordCycle}
					className={`text-sm italic font-serif pointer-events-auto transition-colors duration-1000 hover:text-ink ${headerSubTextColor} flex items-center`}
					aria-label="Return Home">
					<span>endlessly&nbsp;</span>
					<AnimatePresence mode="wait">
						<motion.span
							key={actionWords[wordIndex]}
							initial={{ opacity: 0, y: 5 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -5 }}
							transition={{ duration: 0.2 }}
							className="inline-block"
						>
							{actionWords[wordIndex]}
						</motion.span>
					</AnimatePresence>
				</a>

				<a
					href="/"
					className="absolute left-1/2 -translate-x-1/2 pointer-events-auto flex items-center justify-center"
					aria-label="Return Home"
				>
					<img
						src="/logo.png"
						alt="My Studio Logo"
						className="w-12 h-12 md:w-16 md:h-16 object-contain -rotate-6 transition-all duration-300 ease-out hover:rotate-0 hover:scale-110"
					/>
				</a>

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

			{/* THE FULL SCREEN MENU */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						transition={{ duration: 0.4 }}
						className="fixed inset-0 bg-canvas/95 z-40 flex items-center justify-center"
					>
						<nav className="flex flex-col gap-4 items-start">
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