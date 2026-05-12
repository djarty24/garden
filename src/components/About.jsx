import { useState, useEffect, useRef } from 'react';

export default function About() {
	const [showBCIPhoto, setShowBCIPhoto] = useState(false);
	const [showArtPhoto, setShowArtPhoto] = useState(false);
	const [showFunPhoto, setShowFunPhoto] = useState(false);
	
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

	return (
		<div onMouseMove={handleMouseMove} className="flex flex-col gap-6 font-sans leading-relaxed text-ink text-lg max-w-xl">
			<p>
				I'm a high school senior based in the Bay Area, CA. As of now I spend most of my time&nbsp;
				<span 
					className="font-extrabold text-[#6b92b6] cursor-none transition-colors"
					onMouseEnter={() => setShowBCIPhoto(true)}
					onMouseLeave={() => setShowBCIPhoto(false)}
				>
					researching BCIs
				</span>
				, working on KiCad schematics (currently participating in <a href="https://stasis.hackclub.com/" target='_blank' className="font-bold text-[#88ad82] squiggly-underline hover:text-[#B8E2B0] transition-colors">Hack Club's Stasis</a> event!), and over-engineering everything I own when I should be doing homework. Any space where tech can be used for good, I'm there.
			</p>
			<p>
				My work is often inspired by&nbsp;
				<span 
					className="font-extrabold text-[#c88d9a] cursor-none transition-colors"
					onMouseEnter={() => setShowArtPhoto(true)}
					onMouseLeave={() => setShowArtPhoto(false)}
				>
					impressionist art
				</span>
				&nbsp;and the tactile nature of analog objects. I believe in creating things that are&nbsp;
				<span 
					className="font-extrabold text-[#9B82C3] cursor-none transition-colors"
					onMouseEnter={() => setShowFunPhoto(true)}
					onMouseLeave={() => setShowFunPhoto(false)}
				>
					fun
				</span>
				&nbsp;and stretching my imagination! I hope to bring this philosophy to <span className="font-extrabold text-[#4635c9]">UCSD</span> as a CS major this fall.
			</p>
			<p>
				When I'm not at my desk, you'll find me out for a run, taking photos with my digicam, or playing tabla to unwind.
			</p>

			{showBCIPhoto && (
				<img 
					src="/about/bci-preview.png" 
					alt="BCI Research Preview" 
					className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded -rotate-6"
					style={photoStyle} 
				/>
			)}

			{showArtPhoto && (
				<img 
					src="/about/art-preview.png" 
					alt="Impressionist Art Preview" 
					className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded rotate-6"
					style={photoStyle} 
				/>
			)}

			{showFunPhoto && (
				<img 
					src="/about/fun-preview.png" 
					alt="Fun Preview" 
					className="fixed w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-50 rounded rotate-16"
					style={photoStyle} 
				/>
			)}
		</div>
	);
}