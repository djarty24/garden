import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LockedProject = ({ work, index }) => {
	const containerRef = useRef(null);
	const isEven = index % 2 === 0;

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"]
	});

	const imageOpacity = useTransform(scrollYProgress, [0, 0.1], [0.3, 1]);
	const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
	const stackOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
	const descOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
	const linkOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

	const textY = useTransform(scrollYProgress, [0.1, 0.6], [40, 0]);

	return (
		<div ref={containerRef} className="h-[200vh] w-full relative">
			<div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-12">
				<div className={`w-full max-w-7xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 px-8`}>
					
					<motion.div style={{ opacity: imageOpacity }} className="w-full lg:w-1/2">
						<div className="relative p-4 md:p-6 bg-[#E8DCC4] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-8 md:border-12 border-[#C5A059] outline outline-[#8B7344] outline-offset-[-12px] md:outline-offset-[-16px]">
							<div className="absolute inset-0 border border-[#A6894D] pointer-events-none z-10"></div>
							<div className="aspect-4/3 bg-ink/10 overflow-hidden relative group">
								<img 
									src={work.image} 
									alt={work.title} 
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] pointer-events-none"></div>
							</div>
						</div>
					</motion.div>

					<div className="w-full lg:w-1/2 flex flex-col gap-6 text-left relative z-10">
						<motion.h3 style={{ opacity: titleOpacity, y: textY }} className="text-5xl md:text-6xl font-serif text-ink italic">
							{work.title}
						</motion.h3>

						<motion.div style={{ opacity: stackOpacity, y: textY }} className="flex flex-wrap gap-3">
							{work.stack.map(tech => (
								<span key={tech} className="text-[11px] uppercase tracking-widest border border-slate/30 px-4 py-1.5 rounded-full text-slate font-sans">
									{tech}
								</span>
							))}
						</motion.div>

						<motion.p style={{ opacity: descOpacity, y: textY }} className="font-sans text-slate/90 leading-relaxed text-lg max-w-lg mt-4 mb-4">
							{work.description}
						</motion.p>

						<motion.div style={{ opacity: linkOpacity, y: textY }}>
							<a href={work.link} className="inline-flex items-center gap-4 text-sm font-serif italic text-ink hover:text-slate transition-colors group">
								Read More
								<svg width="24" height="1" viewBox="0 0 24 1" fill="none" className="transition-transform group-hover:translate-x-2">
									<rect width="24" height="1" fill="currentColor"/>
								</svg>
							</a>
						</motion.div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default function SelectedWorks() {
	const projects = [
		{
			title: "PocketPix",
			stack: ["React Native", "Expo", "TypeScript"],
			description: "A nostalgic nod to early digital cameras. PocketPix brings the tactile joy and unpredictable aesthetic of 2000s digicams to your phone, complete with artificial processing delays to encourage living in the moment rather than staring at a screen.",
			image: "/work/pocketpix.png",
			link: "/work/pocketpix"
		},
		{
			title: "Ditch Explorer",
			stack: ["React", "Three.js", "WebGL"],
			description: "An interactive mapping tool for urban exploration. Discovering and documenting local concrete rivers and hidden pathways, turning forgotten municipal infrastructure into a captivating digital expedition.",
			image: "/work/ditch-explorer.png",
			link: "/work/ditch-explorer"
		},
		{
			title: "New Leaf",
			stack: ["React", "Firebase", "Vite"],
			description: "A digital sanctuary for personal growth. New Leaf combines an anonymous community forum with private journaling and habit tracking, designed to foster mental well-being in a cozy, non-judgmental environment.",
			image: "/work/new-leaf.png",
			link: "/work/new-leaf"
		}
	];

	return (
		<section id="work" className="bg-canvas relative pt-12">
			
			<div className="sticky top-12 md:top-16 w-full z-50 pointer-events-none text-center">
				<h1 className="text-3xl md:text-4xl font-serif text-ink italic">Selected Works</h1>
			</div>

			<div className="relative z-10">
				{projects.map((work, i) => (
					<LockedProject key={work.title} work={work} index={i} />
				))}
			</div>

		</section>
	);
}