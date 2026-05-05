import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveHeroText() {
	const [showNamePhoto, setShowNamePhoto] = useState(false);
	const [showMakerPhoto, setShowMakerPhoto] = useState(false);
	const [showIdeasPhoto, setShowIdeasPhoto] = useState(false);
	
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [delayedPos, setDelayedPos] = useState({ x: 0, y: 0 });
	
	const animationFrameId = useRef(null);

	const handleMouseMove = (e) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	useEffect(() => {
		const updateDelayedPos = () => {
			setDelayedPos((prev) => {
				const dx = mousePos.x - prev.x;
				const dy = mousePos.y - prev.y;
				
				const speed = 0.15; // Adjusted for a balanced, natural trailing feel

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
		left: `${delayedPos.x + 20}px`, // Slight offset from the cursor
		top: `${delayedPos.y + 20}px`,
		opacity: 0.9, // Balanced opacity
	};

	return (
		<main onMouseMove={handleMouseMove} className="text-center px-4 flex flex-col items-center max-w-xl mx-auto w-full relative z-10">
			<motion.p 
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.8 }}
				className="text-sm mb-8 text-slate italic font-serif"
			>
				Welcome to my digital home!
			</motion.p>

			<motion.h1 
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="text-4xl leading-normal font-serif text-ink"
			>
				Hi, I&#x2019;m&nbsp;
				<span 
					className="squiggly-underline cursor-none text-ink hover:text-slate transition-colors" 
					onMouseEnter={() => setShowNamePhoto(true)}
					onMouseLeave={() => setShowNamePhoto(false)}
				>
					Revati
				</span>, a student, developer, and&nbsp;
				<span 
					className="squiggly-underline cursor-none text-ink hover:text-slate transition-colors" 
					onMouseEnter={() => setShowMakerPhoto(true)}
					onMouseLeave={() => setShowMakerPhoto(false)}
				>
					maker
				</span>&nbsp;exploring&nbsp;
				<span 
					className="squiggly-underline cursor-none text-ink hover:text-slate transition-colors" 
					onMouseEnter={() => setShowIdeasPhoto(true)}
					onMouseLeave={() => setShowIdeasPhoto(false)}
				>
					unconventional ideas
				</span>&nbsp;through code.
			</motion.h1>

			<motion.a 
				href="/about" 
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.8 }}
				className="my-8 px-8 py-2.5 border border-slate/50 rounded-full text-xs uppercase tracking-widest text-ink hover:bg-slate/10 transition-colors font-sans"
			>
				Let's go!
			</motion.a>

			{showNamePhoto && (
				<img 
					src="/polaroid.jpg" 
					alt="A polaroid photo of me" 
					className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded"
					style={photoStyle} 
				/>
			)}

			{showMakerPhoto && (
				<img 
					src="/maker-preview.jpg" 
					alt="A preview of my maker projects" 
					className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded"
					style={photoStyle} 
				/>
			)}

			{showIdeasPhoto && (
				<img 
					src="/unconventional-ideas-preview.jpg" 
					alt="A preview of unconventional ideas" 
					className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded"
					style={photoStyle} 
				/>
			)}
		</main>
	);
}