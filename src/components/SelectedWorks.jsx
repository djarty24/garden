import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

function createSegment(progress, start, length) {
	const fadeInEnd = start + length * 0.15;
	const visibleEnd = start + length * 0.85;
	const fadeOutEnd = start + length;

	const opacityRaw = useTransform(
		progress,
		[start, fadeInEnd, visibleEnd, fadeOutEnd],
		[0, 1, 1, 0]
	);

	const opacity = useSpring(opacityRaw, {
		stiffness: 90,
		damping: 22
	});

	const pointerEvents = useTransform(
		progress,
		v => (v >= start && v <= fadeOutEnd ? "auto" : "none")
	);

	return { opacity, pointerEvents };
}

function ScatterItem({ scrollYProgress, scatterProgress, children, xVals, yVals, rVals, size }) {
	const x = useTransform(scatterProgress, [0, 1], xVals);
	const y = useTransform(scatterProgress, [0, 1], yVals);
	const rotate = useTransform(scatterProgress, [0, 1], rVals);
	const opacity = useTransform(scrollYProgress, [0.79, 0.81, 0.97, 0.99], [0, 1, 1, 0]);
	const pointerEvents = useTransform(scrollYProgress, v => (v > 0.80 && v < 0.98) ? "auto" : "none");

	return (
		<motion.div 
			style={{ x, y, rotate, opacity, pointerEvents }} 
			className={`absolute top-0 left-0 z-20 ${size} will-change-transform`}
		>
			<motion.div
				drag
				whileDrag={{ scale: 1.1, zIndex: 50 }}
				className="w-full h-full cursor-grab active:cursor-grabbing"
			>
				{children}
			</motion.div>
		</motion.div>
	);
}

const CoffeeMug = () => (
	<div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F2F2F2] shadow-xl flex items-center justify-center">
		<div className="absolute top-1/2 -right-3 md:-right-4 -translate-y-1/2 w-10 h-14 md:w-14 md:h-20 border-4 md:border-[6px] border-[#F2F2F2] rounded-full shadow-lg z-[-1]"></div>
		<div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#4A3525] shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] flex items-center justify-center">
			<div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#3A2515] blur-[1px]"></div>
		</div>
	</div>
);

function ExploreTinkering({ scrollYProgress }) {
	const deskOpacity = useTransform(scrollYProgress, [0.76, 0.78, 0.98, 1], [0, 1, 1, 0]);
	// THIS IS THE FIX: Keep the desk invisible to the mouse until it fades in
	const deskPointerEvents = useTransform(scrollYProgress, v => (v > 0.76 && v < 1) ? "auto" : "none");
	
	const matOpacity = useTransform(scrollYProgress, [0.78, 0.80, 0.98, 1], [0, 1, 1, 0]);

	const scatterProgressRaw = useTransform(scrollYProgress, [0.80, 0.86, 0.94, 0.99], [0, 1, 1, 2]);
	const scatterProgress = useSpring(scatterProgressRaw, { stiffness: 60, damping: 14 });

	const textOpacity = useTransform(scrollYProgress, [0.86, 0.88, 0.96, 0.98], [0, 1, 1, 0]);
	const textPointerEvents = useTransform(scrollYProgress, v => (v > 0.86 && v < 0.96) ? "auto" : "none");

	return (
		<motion.div style={{ opacity: deskOpacity, pointerEvents: deskPointerEvents }} className="absolute inset-0 w-full h-full bg-[#D4C5B0] flex items-center justify-center z-40 overflow-hidden">

			<motion.div style={{ opacity: matOpacity }} className="absolute w-[92vw] max-w-6xl h-[78vh] bg-[#4A6356] rounded-2xl shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] border-4 border-[#384A40] flex items-center justify-center overflow-hidden">
				<div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
			</motion.div>

			<ScatterItem scrollYProgress={scrollYProgress} scatterProgress={scatterProgress}
				xVals={["-120vw", "18vw"]}
				yVals={["-120vh", "18vh"]}
				rVals={[-120, -18]}
				size="w-24 md:w-32"
			>
				<CoffeeMug />
			</ScatterItem>

			<ScatterItem scrollYProgress={scrollYProgress} scatterProgress={scatterProgress}
				xVals={["120vw", "60vw"]}
				yVals={["-120vh", "8vh"]}
				rVals={[20, 5]}
				size="w-[340px] md:w-[520px]"
			>
				<img
					src="/work/desk-objects/laptop.png"
					alt="Laptop"
					draggable="false"
					className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
				/>
			</ScatterItem>

			<ScatterItem scrollYProgress={scrollYProgress} scatterProgress={scatterProgress}
				xVals={["-40vw", "20vw"]}
				yVals={["-100vh", "50vh"]}
				rVals={[-120, -18]}
				size="w-[120px] md:w-[180px]"
			>
				<img
					src="/work/desk-objects/feynman.png"
					alt="My Favorite Book"
					draggable="false"
					className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
				/>
			</ScatterItem>

			<ScatterItem scrollYProgress={scrollYProgress} scatterProgress={scatterProgress}
				xVals={["-30vw", "38vw"]}
				yVals={["120vh", "20vh"]}
				rVals={[120, -18]}
				size="w-[90px] md:w-[130px]"
			>
				<img
					src="/work/desk-objects/altoids.png"
					alt="Altoids"
					draggable="false"
					className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
				/>
			</ScatterItem>

			<ScatterItem scrollYProgress={scrollYProgress} scatterProgress={scatterProgress}
				xVals={["120vw", "78vw"]}
				yVals={["-30vh", "63vh"]}
				rVals={[180, 115]}
				size="w-[80px] md:w-[120px]"
			>
				<img
					src="/work/desk-objects/digicam.png"
					alt="Camera"
					draggable="false"
					className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
				/>
			</ScatterItem>

			<ScatterItem scrollYProgress={scrollYProgress} scatterProgress={scatterProgress}
				xVals={["140vw", "64vw"]}
				yVals={["120vh", "66vh"]}
				rVals={[-180, -20]}
				size="w-[100px] md:w-[130px]"
			>
				<img
					src="/work/desk-objects/pcb.png"
					alt="PCB"
					draggable="false"
					className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
				/>
			</ScatterItem>

			<ScatterItem scrollYProgress={scrollYProgress} scatterProgress={scatterProgress}
				xVals={["64vw", "42vw"]}
				yVals={["120vh", "60vh"]}
				rVals={[-180, 0]}
				size="w-[150px] md:w-[200px]"
			>
				<img
					src="/work/desk-objects/notebook.png"
					alt="Notebook"
					draggable="false"
					className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
				/>
			</ScatterItem>

			<motion.a href="/work" style={{ opacity: textOpacity, pointerEvents: textPointerEvents }} className="absolute z-50 flex flex-col items-center justify-center group cursor-pointer text-white">
				<h2 className="text-3xl md:text-5xl font-serif italic mb-2 group-hover:text-white/80 transition-colors duration-300">See What I'm Tinkering</h2>
				<p className="text-xs md:text-sm uppercase tracking-widest font-sans flex items-center gap-2 mt-2">
					<span className="squiggly-underline decoration-white/70 group-hover:decoration-white transition-colors">View In-Progress Projects</span>
					<span className="transition-transform duration-300 group-hover:translate-x-3">→</span>
				</p>
			</motion.a>

		</motion.div>
	);
}

export default function SelectedWorks() {
	const containerRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"]
	});

	const intro = 0.12;
	const segment = 0.18;
	const gap = 0.06;

	const p1Start = intro;
	const p2Start = p1Start + segment + gap;
	const p3Start = p2Start + segment + gap;

	const p1 = createSegment(scrollYProgress, p1Start, segment);
	const p2 = createSegment(scrollYProgress, p2Start, segment);
	const p3 = createSegment(scrollYProgress, p3Start, segment);

	const titleOpacity = useTransform(
		scrollYProgress,
		[0, 0.60, 0.66, 1],
		[1, 1, 0, 0]
	);

	const tapeStyles = [
		{ bg: "#F4E3E1", rot: "-rotate-2" },
		{ bg: "#DDEADD", rot: "rotate-3" },
		{ bg: "#E3DEE8", rot: "-rotate-1" },
		{ bg: "#F4E3E1", rot: "rotate-2" }
	];

	return (
		<section id="work" ref={containerRef} className="bg-canvas relative h-[800vh]">
			<div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

				<motion.div style={{ opacity: titleOpacity }} className="absolute top-24 w-full z-10 pointer-events-none text-center">
					<h2 className="text-2xl md:text-3xl font-serif text-ink">Selected Works</h2>
				</motion.div>

				<div className="relative w-full max-w-6xl mx-auto px-8 h-[70vh] mt-16 md:mt-20">

					<motion.div style={p1} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
						<div className="w-full lg:w-1/2 flex justify-center z-10">
							<a href="https://pocketpix.vercel.app/" target="_blank" className="w-full max-w-lg aspect-[4/3] relative group block mt-12 mx-auto">
								<div className="absolute bottom-full left-0 w-full h-20 md:h-28 pointer-events-none -mb-0.5 z-0">
									<svg className="w-full h-full overflow-visible">
										<line x1="50%" y1="12" x2="15%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
										<line x1="50%" y1="12" x2="85%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
										<circle cx="50%" cy="12" r="4" fill="currentColor" className="text-slate/40 drop-shadow-sm" />
									</svg>
								</div>
								<div className="relative w-full h-full z-20 transition-transform duration-500 ease-out origin-top group-hover:-rotate-2 border-[12px] md:border-[20px] border-white bg-white shadow-2xl">
									<img src="/work/pocketpix.png" alt="PocketPix" className="w-full h-full object-cover" />
								</div>
							</a>
						</div>
						<div className="w-full lg:w-1/2 flex flex-col gap-6 text-left z-20">
							<h3 className="text-4xl md:text-5xl font-serif text-ink italic">PocketPix</h3>
							<div className="flex flex-wrap gap-4 pt-2 pb-2">
								{["React", "TypeScript", "Vite"].map((tech, index) => {
									const styleObj = tapeStyles[index % tapeStyles.length];
									return (
										<span key={tech} style={{ backgroundColor: styleObj.bg }} className={`inline-block px-4 py-1.5 text-slate font-mono text-[10px] tracking-widest shadow-sm border-l-2 border-r-2 border-white/40 ${styleObj.rot}`}>
											{tech}
										</span>
									);
								})}
							</div>
							<p className="font-sans text-slate leading-relaxed text-lg max-w-lg">
								A nostalgic nod to early digital cameras. PocketPix turns your browser into a classic 2000s Sony Cyber-shot digital camera. You can cycle through different Y2K filters, snap photos, and save them to your gallery.
							</p>
							<a href="/work/pocketpix" className="squiggly-underline w-fit inline-flex items-center gap-4 text-md font-serif italic text-ink hover:text-slate transition-colors mt-2">
								Read More
							</a>
						</div>
					</motion.div>

					<motion.div style={p2} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
						<div className="w-full lg:w-1/2 flex justify-center z-10">
							<a href="https://ditch-explorer.vercel.app/" target="_blank" className="w-full max-w-lg aspect-[4/3] relative group block mt-12 mx-auto">
								<div className="absolute bottom-full left-0 w-full h-20 md:h-28 pointer-events-none -mb-0.5 z-0">
									<svg className="w-full h-full overflow-visible">
										<line x1="50%" y1="12" x2="15%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
										<line x1="50%" y1="12" x2="85%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
										<circle cx="50%" cy="12" r="4" fill="currentColor" className="text-slate/40 drop-shadow-sm" />
									</svg>
								</div>
								<div className="relative w-full h-full z-20 transition-transform duration-500 ease-out origin-top group-hover:rotate-2 border-[12px] md:border-[20px] border-white bg-white shadow-2xl">
									<img src="/work/ditch-explorer.png" alt="Ditch Explorer" className="w-full h-full object-cover" />
								</div>
							</a>
						</div>
						<div className="w-full lg:w-1/2 flex flex-col gap-6 items-start z-20">
							<h3 className="text-4xl md:text-5xl font-serif text-ink italic">Ditch Explorer</h3>
							<div className="flex flex-wrap gap-4 pt-2 pb-2 justify-start w-full">
								{["React", "Typescript", "98.css"].map((tech, index) => {
									const styleObj = tapeStyles[index % tapeStyles.length];
									return (
										<span key={tech} style={{ backgroundColor: styleObj.bg }} className={`inline-block px-4 py-1.5 text-slate font-sans text-[10px] tracking-widest shadow-sm border-l-2 border-r-2 border-white/40 ${styleObj.rot}`}>
											{tech}
										</span>
									);
								})}
							</div>
							<p className="font-sans text-slate leading-relaxed text-lg max-w-lg">
								An interactive, Windows 98 themed game to teach users terminal commands! It follows a storyline where players need to fix a crashed computer system.
							</p>
							<a href="/work/ditch-explorer" className="squiggly-underline w-fit inline-flex items-center gap-4 text-md font-serif italic text-ink hover:text-slate transition-colors mt-2">
								Read More
							</a>
						</div>
					</motion.div>

					<motion.div style={p3} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
						<div className="w-full lg:w-1/2 flex justify-center z-10">
							<a href="https://new-leaf-seven.vercel.app/" target="_blank" className="w-full max-w-lg aspect-[4/3] relative group block mt-12 mx-auto">
								<div className="absolute bottom-full left-0 w-full h-20 md:h-28 pointer-events-none -mb-0.5 z-0">
									<svg className="w-full h-full overflow-visible">
										<line x1="50%" y1="12" x2="15%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
										<line x1="50%" y1="12" x2="85%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
										<circle cx="50%" cy="12" r="4" fill="currentColor" className="text-slate/40 drop-shadow-sm" />
									</svg>
								</div>
								<div className="relative w-full h-full z-20 transition-transform duration-500 ease-out origin-top group-hover:-rotate-2 border-[12px] md:border-[20px] border-white bg-white shadow-2xl">
									<img src="/work/new-leaf.png" alt="New Leaf" className="w-full h-full object-cover" />
								</div>
							</a>
						</div>
						<div className="w-full lg:w-1/2 flex flex-col gap-6 text-left z-20">
							<h3 className="text-4xl md:text-5xl font-serif text-ink italic">New Leaf</h3>
							<div className="flex flex-wrap gap-4 pt-2 pb-2">
								{["React", "Firebase", "Vite"].map((tech, index) => {
									const styleObj = tapeStyles[index % tapeStyles.length];
									return (
										<span key={tech} style={{ backgroundColor: styleObj.bg }} className={`inline-block px-4 py-1.5 text-slate font-mono text-[10px] tracking-widest shadow-sm border-l-2 border-r-2 border-white/40 ${styleObj.rot}`}>
											{tech}
										</span>
									);
								})}
							</div>
							<p className="font-sans text-slate leading-relaxed text-lg max-w-lg">
								A community-focused tracker and support space for teens navigating the process of quitting tobacco usage and vaping. Originally created for my high school's TUPE committee's Take Down Tobacco Multimedia Competition as well as Hack Club's Sleepover event.
							</p>
							<a href="/work/new-leaf" className="squiggly-underline w-fit inline-flex items-center gap-4 text-md font-serif italic text-ink hover:text-slate transition-colors mt-2">
								Read More
							</a>
						</div>
					</motion.div>
				</div>

				<ExploreTinkering scrollYProgress={scrollYProgress} />
			</div>
		</section>
	);
}