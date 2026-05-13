import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
	const stage1Delay = 0;
	const stage2Delay = 0.8;
	const stage3Delay = 1.6;

	const [isSpinning, setIsSpinning] = useState(false);
	
	const [showNamePhoto, setShowNamePhoto] = useState(false);
	const [showMakerPhoto, setShowMakerPhoto] = useState(false);
	const [showIdeasPhoto, setShowIdeasPhoto] = useState(false);
	
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [delayedPos, setDelayedPos] = useState({ x: 0, y: 0 });
	
	const animationFrameId = useRef(null);

	const handleVinylClick = () => {
		if (isSpinning) return;
		setIsSpinning(true);
		
		setTimeout(() => {
			const nextSection = document.getElementById('about');
			if (nextSection) {
				nextSection.scrollIntoView({ behavior: 'smooth' });
			} else {
				window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
			}
			setTimeout(() => setIsSpinning(false), 1000);
		}, 1200);
	};

	const handleMouseMove = (e) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	useEffect(() => {
		const updateDelayedPos = () => {
			setDelayedPos((prev) => {
				const dx = mousePos.x - prev.x;
				const dy = mousePos.y - prev.y;
				const speed = 0.08; 
				return {
					x: prev.x + dx * speed,
					y: prev.y + dy * speed,
				};
			});
			animationFrameId.current = requestAnimationFrame(updateDelayedPos);
		};

		animationFrameId.current = requestAnimationFrame(updateDelayedPos);

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [mousePos]);

	const photoStyle = {
		left: `${delayedPos.x - 120}px`,
		top: `${delayedPos.y - 80}px`,
		opacity: 1,
	};

	const handleAboutClick = (e) => {
		e.preventDefault();
		const aboutSection = document.getElementById('about');
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-24 items-center max-w-360 mx-auto pt-8 lg:pt-0">
			<nav className="flex flex-row lg:flex-col gap-4 md:gap-8 lg:gap-8 justify-center items-end lg:items-end w-full px-4 lg:px-0">
				<motion.div
					initial={{ opacity: 0, x: 150, y: 100 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay, type: "spring", bounce: 0.3 }}
				>
					<a 
						href="/#about" 
						onClick={handleAboutClick}
						className="flex flex-col items-center gap-3 lg:gap-5 group lg:translate-x-12"
					>
						<div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center">
							<img src="/hero/about-icon.png" alt="About" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:-rotate-12 group-hover:drop-shadow-md"/>
						</div>
						<span className="text-xs md:text-sm lg:text-base text-ink font-serif italic">About</span>
					</a>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 150, y: 0 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay + 0.1, type: "spring", bounce: 0.3 }}
				>
					<a 
						href="/#work" 
						className="flex flex-col items-center gap-3 lg:gap-5 group lg:-translate-x-4"
					>
						<div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center">
							<img src="/hero/work-icon.png" alt="Work" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:-rotate-12 group-hover:drop-shadow-md"/>
						</div>
						<span className="text-xs md:text-sm lg:text-base text-ink font-serif italic">Work</span>
					</a>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 150, y: -100 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay + 0.2, type: "spring", bounce: 0.3 }}
				>
					<a
						href="/cv.pdf" 
						target='_blank'
						className="flex flex-col items-center gap-3 lg:gap-5 group lg:translate-x-12"
					>
						<div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center">
							<img src="/hero/cv-icon.png" alt="Download CV" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:-rotate-12 group-hover:drop-shadow-md"/>
						</div>
						<span className="text-xs md:text-sm lg:text-base text-ink font-serif italic">Download CV</span>
					</a>
				</motion.div>
			</nav>

			<main onMouseMove={handleMouseMove} className="text-center px-4 flex flex-col items-center max-w-xl mx-auto w-full relative z-10 py-8 lg:py-0">
				<motion.p 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: stage2Delay }}
					className="text-xs md:text-sm mb-6 md:mb-8 text-slate italic font-serif text-center"
				>
					Welcome to my digital home!
				</motion.p>

				<motion.h1 
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: stage1Delay, ease: "easeOut" }}
					className="text-2xl md:text-3xl lg:text-4xl leading-relaxed lg:leading-normal font-serif text-ink text-center"
				>
					Hi, I&#x2019;m <span 
						className="squiggly-underline cursor-none text-ink hover:text-slate transition-colors" 
						onMouseEnter={() => setShowNamePhoto(true)}
						onMouseLeave={() => setShowNamePhoto(false)}
					>
						Revati
					</span>, a student,
					<br />
					developer, and <span 
						className="squiggly-underline cursor-none text-ink hover:text-slate transition-colors" 
						onMouseEnter={() => setShowMakerPhoto(true)}
						onMouseLeave={() => setShowMakerPhoto(false)}
					>
						maker
					</span>
					<br />
					exploring <span 
						className="cursor-none text-ink hover:text-slate transition-colors" 
						onMouseEnter={() => setShowIdeasPhoto(true)}
						onMouseLeave={() => setShowIdeasPhoto(false)}
					>
						<span className="squiggly-underline">unconventional</span>
						<br />
						<span className="squiggly-underline">ideas</span>
					</span> through code.
				</motion.h1>

				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: stage2Delay }}
					onClick={handleVinylClick}
					className="mt-12 hidden lg:flex items-center gap-12 group cursor-pointer relative"
				>
					<span className="text-sm font-serif italic text-ink transition-all duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-1 group-hover:scale-105">
						let's go
					</span>
					
					<div className="relative w-16 h-16 shrink-0 rounded-full flex items-center justify-center">
						<motion.div
							animate={isSpinning ? { rotate: 1800 } : { rotate: 0 }}
							transition={{ duration: 1.2, ease: "easeInOut" }}
							className="w-full h-full group-hover:scale-110 transition-transform duration-300"
						>
							<svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
								<circle cx="50" cy="50" r="48" fill="#3D3B38" />
								<circle cx="50" cy="50" r="42" fill="transparent" stroke="#2A2826" strokeWidth="1" />
								<circle cx="50" cy="50" r="36" fill="transparent" stroke="#2A2826" strokeWidth="1" />
								<circle cx="50" cy="50" r="30" fill="transparent" stroke="#2A2826" strokeWidth="1" />
								<circle cx="50" cy="50" r="24" fill="transparent" stroke="#2A2826" strokeWidth="1" />
								<circle cx="50" cy="50" r="16" fill="#F4E3E1" />
								<text x="50" y="42" fontSize="4" fontFamily="serif" fontStyle="italic" fill="#4A5056" textAnchor="middle">my studio</text>
								<text x="50" y="61" fontSize="3" fontFamily="sans-serif" fill="#737C84" textAnchor="middle" letterSpacing="0.5">SIDE A</text>
								<circle cx="50" cy="50" r="4" fill="#FDFCF8" />
							</svg>
						</motion.div>

						<motion.div 
							className="absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none"
							animate={isSpinning ? { rotate: 1800 } : { rotate: 0 }}
							transition={{ duration: 1.2, ease: "easeInOut" }}
						>
							<motion.div
								animate={isSpinning ? { x: -36 } : { x: -56 }}
								transition={{ duration: 0.4 }}
								className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
							>
								<div className={`text-slate/60 transition-all duration-300 origin-center ${isSpinning ? 'rotate-[-85deg] scale-[0.85] opacity-80' : 'group-hover:scale-110 group-hover:-rotate-12 opacity-100'}`}>
									<svg width="40" height="24" viewBox="0 0 40 24" fill="none">
										<path d="M5 8 C 15 20, 25 0, 35 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="transparent"/>
										<path d="M28 12 L35 12 L32 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="transparent"/>
									</svg>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</motion.div>

				<div className="hidden lg:block">
					{showNamePhoto && (
						<img 
							src="/hero/polaroid.png" 
							alt="A polaroid photo of me" 
							className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded -rotate-6"
							style={photoStyle} 
						/>
					)}

					{showMakerPhoto && (
						<img 
							src="/hero/maker-preview.png" 
							alt="A preview of my maker projects" 
							className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded rotate-6"
							style={photoStyle} 
						/>
					)}

					{showIdeasPhoto && (
						<img 
							src="/hero/unconventional-ideas-preview.png" 
							alt="A preview of unconventional ideas" 
							className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded -rotate-6"
							style={photoStyle} 
						/>
					)}
				</div>
			</main>

			<nav className="flex flex-row lg:flex-col gap-4 md:gap-8 lg:gap-8 justify-center items-start lg:items-start w-full px-4 lg:px-0">
				<motion.div
					initial={{ opacity: 0, x: -150, y: 100 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay, type: "spring", bounce: 0.3 }}
				>
					<a 
						href="/fieldnotes" 
						className="flex flex-col items-center gap-3 lg:gap-5 group lg:-translate-x-12"
					>
						<div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center">
							<img src="/hero/fieldnotes-icon.png" alt="Field Notes" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:rotate-12 group-hover:drop-shadow-md"/>
						</div>
						<span className="text-xs md:text-sm lg:text-base text-ink font-serif italic">Field Notes</span>
					</a>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: -150, y: 0 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay + 0.1, type: "spring", bounce: 0.3 }}
				>
					<a 
						href="/guestbook" 
						className="flex flex-col items-center gap-3 lg:gap-5 group lg:translate-x-4"
					>
						<div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center">
							<img src="/hero/guestbook-icon.png" alt="Guest Book" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:rotate-12 group-hover:drop-shadow-md"/>
						</div>
						<span className="text-xs md:text-sm lg:text-base text-ink font-serif italic">Guest Book</span>
					</a>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: -150, y: -100 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay + 0.2, type: "spring", bounce: 0.3 }}
				>
					<a 
						href="/#contact"
						className="flex flex-col items-center gap-3 lg:gap-5 group lg:-translate-x-12"
					>
						<div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center">
							<img src="/hero/contact-icon.png" alt="Contact" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:rotate-12 group-hover:drop-shadow-md"/>
						</div>
						<span className="text-xs md:text-sm lg:text-base text-ink font-serif italic">Contact</span>
					</a>
				</motion.div>
			</nav>
		</div>
	);
}