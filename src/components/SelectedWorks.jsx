import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Creates a fade-only segment with HARD gaps before/after
 */
function createSegment(progress, start, length) {
	const fadeInEnd = start + length * 0.3;
	const visibleEnd = start + length * 0.7;
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

export default function SelectedWorks() {
	const containerRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"]
	});

	/**
	 * TIMELINE DESIGN
	 *
	 * 0 → 0.18   = intro (ONLY "Selected Works")
	 *
	 * Then:
	 * project → GAP → project → GAP → project
	 */

	const intro = 0.18;

	const segment = 0.16; // how long a project lives
	const gap = 0.10;     // EMPTY space between projects

	const p1Start = intro;
	const p2Start = p1Start + segment + gap;
	const p3Start = p2Start + segment + gap;

	const p1 = createSegment(scrollYProgress, p1Start, segment);
	const p2 = createSegment(scrollYProgress, p2Start, segment);
	const p3 = createSegment(scrollYProgress, p3Start, segment);

	return (
		<section id="work" ref={containerRef} className="bg-canvas relative h-[800vh]">

			<div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

				<div className="absolute top-24 w-full z-50 pointer-events-none text-center">
					<h2 className="text-2xl md:text-3xl font-serif text-ink">
						Selected Works
					</h2>
				</div>

				<div className="relative w-full max-w-6xl mx-auto px-8 h-[70vh] mt-16 md:mt-20">

					<motion.div style={p1} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
						<div className="w-full lg:w-1/2 flex justify-center">
							<a href="https://pocketpix.vercel.app/" target="_blank" className="w-full max-w-lg aspect-4/3 relative">
								<img src="/work/pocketpix.png" alt="PocketPix" className="w-full h-full object-contain" />
							</a>
						</div>
						<div className="w-full lg:w-1/2 flex flex-col gap-6 text-left">
							<h3 className="text-4xl md:text-5xl font-serif text-ink italic">PocketPix</h3>
							<div className="flex flex-wrap gap-3">
								{["React", "TypeScript", "Vite"].map(tech => (
									<span key={tech} className="text-[11px] uppercase tracking-widest border border-slate/30 px-4 py-1.5 rounded-full text-slate font-sans">
										{tech}
									</span>
								))}
							</div>
							<p className="font-sans text-slate leading-relaxed text-lg max-w-lg mt-2 mb-2">
								A nostalgic nod to early digital cameras. PocketPix turns your browser into a classic 2000s Sony Cyber-shot digital camera. You can cycle through different Y2K filters, snap photos, and save them to your gallery.
							</p>
							<a href="/work/pocketpix" className="squiggly-underline w-fit inline-flex items-center gap-4 text-md font-serif italic text-ink hover:text-slate transition-colors">
								Read More
							</a>
						</div>
					</motion.div>

					<motion.div style={p2} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
						<div className="w-full lg:w-1/2 flex justify-center">
							<a href="https://ditch-explorer.vercel.app/" target="_blank" className="w-full max-w-lg aspect-4/3 relative">
								<img src="/work/ditch-explorer.png" alt="Ditch Explorer" className="w-full h-full object-contain" />
							</a>
						</div>
						<div className="w-full lg:w-1/2 flex flex-col gap-6 items-start">
							<h3 className="text-4xl md:text-5xl font-serif text-ink italic">Ditch Explorer</h3>
							<div className="flex flex-wrap gap-3 justify-start w-full">
								{["React", "Typescript", "98.css"].map(tech => (
									<span key={tech} className="text-[11px] uppercase tracking-widest border border-slate/30 px-4 py-1.5 rounded-full text-slate font-sans">
										{tech}
									</span>
								))}
							</div>
							<p className="font-sans text-slate leading-relaxed text-lg max-w-lg mt-2 mb-2">
								An interactive, Windows 98 themed game to teach users terminal commands! It follows a storyline where players need to fix a crashed computer system.
							</p>
							<a href="/work/ditch-explorer" className="squiggly-underline w-fit inline-flex items-center gap-4 text-md font-serif italic text-ink hover:text-slate transition-colors">
								Read More
							</a>
						</div>
					</motion.div>

					<motion.div style={p3} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
						<div className="w-full lg:w-1/2 flex justify-center">
							<a href="https://new-leaf-seven.vercel.app/" target="_blank" className="w-full max-w-lg aspect-4/3 relative">
								<img src="/work/new-leaf.png" alt="New Leaf" className="w-full h-full object-contain" />
							</a>
						</div>
						<div className="w-full lg:w-1/2 flex flex-col gap-6 text-left">
							<h3 className="text-4xl md:text-5xl font-serif text-ink italic">New Leaf</h3>
							<div className="flex flex-wrap gap-3">
								{["React", "Firebase", "Vite"].map(tech => (
									<span key={tech} className="text-[11px] uppercase tracking-widest border border-slate/30 px-4 py-1.5 rounded-full text-slate font-sans">
										{tech}
									</span>
								))}
							</div>
							<p className="font-sans text-slate leading-relaxed text-lg max-w-lg mt-2 mb-2">
								A community-focused tracker and support space for teens navigating the process of quitting tobacco usage and vaping. Originally created for my high school's TUPE committee's Take Down Tobacco Multimedia Competition as well as Hack Club's Sleepover event.
							</p>
							<a href="/work/new-leaf" className="squiggly-underline w-fit inline-flex items-center gap-4 text-md font-serif italic text-ink hover:text-slate transition-colors">
								Read More
							</a>
						</div>
					</motion.div>

				</div>
			</div>
		</section>
	);
}