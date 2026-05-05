import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
	const stage1Delay = 0;
	const stage2Delay = 0.8;
	const stage3Delay = 1.6;

	const [isSpinning, setIsSpinning] = useState(false);

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

	return (
		<div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-16 lg:gap-24 items-center max-w-[90rem] mx-auto">
			<nav className="flex flex-col gap-8 items-center lg:items-end w-full">
				<motion.a 
					href="/about" 
					initial={{ opacity: 0, x: 150, y: 100 }}
					animate={{ opacity: 1, x: 48, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay, type: "spring", bounce: 0.3 }}
					className="flex flex-col items-center gap-5 group"
				>
					<div className="w-20 h-24 flex items-center justify-center">
						<img src="/hero/about-icon.png" alt="About" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:-rotate-12 group-hover:drop-shadow-md"/>
					</div>
					<span className="text-base text-ink font-serif italic">About</span>
				</motion.a>

				<motion.a 
					href="/work" 
					initial={{ opacity: 0, x: 150, y: 0 }}
					animate={{ opacity: 1, x: -16, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay + 0.1, type: "spring", bounce: 0.3 }}
					className="flex flex-col items-center gap-5 group"
				>
					<div className="w-20 h-24 flex items-center justify-center">
						<img src="/hero/work-icon.png" alt="Work" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:-rotate-12 group-hover:drop-shadow-md"/>
					</div>
					<span className="text-base text-ink font-serif italic">Work</span>
				</motion.a>

				<motion.a 
					href="/cv" 
					initial={{ opacity: 0, x: 150, y: -100 }}
					animate={{ opacity: 1, x: 48, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay + 0.2, type: "spring", bounce: 0.3 }}
					className="flex flex-col items-center gap-5 group"
				>
					<div className="w-20 h-24 flex items-center justify-center">
						<img src="/hero/cv-icon.png" alt="Download CV" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:-rotate-12 group-hover:drop-shadow-md"/>
					</div>
					<span className="text-base text-ink font-serif italic">Download CV</span>
				</motion.a>
			</nav>

			<main className="text-center px-4 flex flex-col items-center max-w-xl mx-auto w-full">
				<motion.p 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: stage2Delay }}
					className="text-sm mb-8 text-slate italic font-serif"
				>
					Welcome to my digital home!
				</motion.p>

				<motion.h1 
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: stage1Delay, ease: "easeOut" }}
					className="text-4xl leading-normal font-serif text-ink"
				>
					Hi, I&#x2019;m Revati, a student, developer, and <span className="underline decoration-1 underline-offset-8 decoration-slate/50">maker</span> exploring <span className="underline decoration-1 underline-offset-8 decoration-slate/50">unconventional ideas</span> through code.
				</motion.h1>

				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: stage2Delay }}
					onClick={handleVinylClick}
					className="mt-12 flex items-center gap-12 group cursor-pointer relative"
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
								<div className={`text-slate/60 transition-all duration-300 origin-center ${isSpinning ? '-rotate-[85deg] scale-[0.85] opacity-80' : 'group-hover:scale-110 group-hover:-rotate-12 opacity-100'}`}>
									<svg width="40" height="24" viewBox="0 0 40 24" fill="none">
										<path d="M5 8 C 15 20, 25 0, 35 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="transparent"/>
										<path d="M28 12 L35 12 L32 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="transparent"/>
									</svg>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</main>

			<nav className="flex flex-col gap-8 items-center lg:items-start w-full">
				<motion.a 
					href="/garden" 
					initial={{ opacity: 0, x: -150, y: 100 }}
					animate={{ opacity: 1, x: -48, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay, type: "spring", bounce: 0.3 }}
					className="flex flex-col items-center gap-5 group"
				>
					<div className="w-20 h-24 flex items-center justify-center">
						<img src="/hero/garden-icon.png" alt="Garden" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:rotate-12 group-hover:drop-shadow-md"/>
					</div>
					<span className="text-base text-ink font-serif italic">Garden</span>
				</motion.a>

				<motion.a 
					href="/guestbook" 
					initial={{ opacity: 0, x: -150, y: 0 }}
					animate={{ opacity: 1, x: 16, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay + 0.1, type: "spring", bounce: 0.3 }}
					className="flex flex-col items-center gap-5 group"
				>
					<div className="w-20 h-24 flex items-center justify-center">
						<img src="/hero/guestbook-icon.png" alt="Guest Book" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:rotate-12 group-hover:drop-shadow-md"/>
					</div>
					<span className="text-base text-ink font-serif italic">Guest Book</span>
				</motion.a>

				<motion.a 
					href="/contact" 
					initial={{ opacity: 0, x: -150, y: -100 }}
					animate={{ opacity: 1, x: -48, y: 0 }}
					transition={{ duration: 1, delay: stage3Delay + 0.2, type: "spring", bounce: 0.3 }}
					className="flex flex-col items-center gap-5 group"
				>
					<div className="w-20 h-24 flex items-center justify-center">
						<img src="/hero/contact-icon.png" alt="Contact" className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:rotate-12 group-hover:drop-shadow-md"/>
					</div>
					<span className="text-base text-ink font-serif italic">Contact</span>
				</motion.a>
			</nav>
		</div>
	);
}