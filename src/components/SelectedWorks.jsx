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

export default function SelectedWorks() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const intro = 0.18;
    const segment = 0.16; 
    const gap = 0.10;     

    const p1Start = intro;
    const p2Start = p1Start + segment + gap;
    const p3Start = p2Start + segment + gap;

    const p1 = createSegment(scrollYProgress, p1Start, segment);
    const p2 = createSegment(scrollYProgress, p2Start, segment);
    const p3 = createSegment(scrollYProgress, p3Start, segment);

    const btnOpacity = useTransform(scrollYProgress, [0.86, 0.89, 1], [0, 1, 1]);
    const btnPointerEvents = useTransform(scrollYProgress, v => v > 0.86 ? "auto" : "none");

    const tapeStyles = [
        { bg: "#F4E3E1", rot: "-rotate-2" },
        { bg: "#DDEADD", rot: "rotate-3" },
        { bg: "#E3DEE8", rot: "-rotate-1" },
        { bg: "#F4E3E1", rot: "rotate-2" }
    ];

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
                        <div className="w-full lg:w-1/2 flex justify-center z-10">
                            <a href="https://pocketpix.vercel.app/" target="_blank" className="w-full max-w-lg aspect-4/3 relative group block mt-12 mx-auto">
                                <div className="absolute bottom-full left-0 w-full h-20 md:h-28 pointer-events-none -mb-0.5 z-0">
                                    <svg className="w-full h-full overflow-visible">
                                        <line x1="50%" y1="12" x2="15%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
                                        <line x1="50%" y1="12" x2="85%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
                                        <circle cx="50%" cy="12" r="4" fill="currentColor" className="text-slate/40 drop-shadow-sm" />
                                    </svg>
                                </div>
                                <div className="relative w-full h-full z-20 transition-transform duration-500 ease-out origin-top group-hover:-rotate-2">
                                    <img src="/work/pocketpix.png" alt="PocketPix" className="w-full h-full object-contain drop-shadow-2xl" />
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
                            <a href="https://ditch-explorer.vercel.app/" target="_blank" className="w-full max-w-lg aspect-4/3 relative group block mt-12 mx-auto">
                                <div className="absolute bottom-full left-0 w-full h-20 md:h-28 pointer-events-none -mb-0.5 z-0">
                                    <svg className="w-full h-full overflow-visible">
                                        <line x1="50%" y1="12" x2="15%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
                                        <line x1="50%" y1="12" x2="85%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
                                        <circle cx="50%" cy="12" r="4" fill="currentColor" className="text-slate/40 drop-shadow-sm" />
                                    </svg>
                                </div>
                                <div className="relative w-full h-full z-20 transition-transform duration-500 ease-out origin-top group-hover:rotate-2">
                                    <img src="/work/ditch-explorer.png" alt="Ditch Explorer" className="w-full h-full object-contain drop-shadow-2xl" />
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
                            <a href="https://new-leaf-seven.vercel.app/" target="_blank" className="w-full max-w-lg aspect-4/3 relative group block mt-12 mx-auto">
                                <div className="absolute bottom-full left-0 w-full h-20 md:h-28 pointer-events-none -mb-0.5 z-0">
                                    <svg className="w-full h-full overflow-visible">
                                        <line x1="50%" y1="12" x2="15%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
                                        <line x1="50%" y1="12" x2="85%" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-slate/30" />
                                        <circle cx="50%" cy="12" r="4" fill="currentColor" className="text-slate/40 drop-shadow-sm" />
                                    </svg>
                                </div>
                                <div className="relative w-full h-full z-20 transition-transform duration-500 ease-out origin-top group-hover:-rotate-2">
                                    <img src="/work/new-leaf.png" alt="New Leaf" className="w-full h-full object-contain drop-shadow-2xl" />
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

                    <motion.div 
                        style={{ opacity: btnOpacity, pointerEvents: btnPointerEvents }}
                        className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col items-center justify-center gap-6 z-30"
                    >
                        <a href="/work" className="group flex flex-col items-center text-ink hover:text-slate transition-colors">
                            <span className="font-serif italic text-4xl md:text-5xl mb-4">Explore the Archive</span>
                            <div className="w-16 h-px bg-slate/30 group-hover:w-32 group-hover:bg-slate transition-all duration-500 ease-out mb-4"></div>
                            <span className="text-xs uppercase tracking-widest font-sans flex items-center gap-2">
                                View all projects 
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </span>
                        </a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}