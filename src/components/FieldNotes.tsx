import { useState, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Post = {
	url: string;
	title: string;
	date: string;
	tag: string;
};

export default function FieldNotes({ posts }: { posts: Post[] }) {
	const displayPosts = posts || [];
	const [activeFilter, setActiveFilter] = useState("All");
	const uniqueTags = ["All", ...Array.from(new Set(displayPosts.map(post => post.tag)))];

	const filteredPosts = activeFilter === "All" 
		? displayPosts 
		: displayPosts.filter(post => post.tag === activeFilter);

	const uniqueId = useId().replace(/:/g, "");
	const sketchFilterId = `sketch-filter-notes-${uniqueId}`;
	
	const [filterUrl, setFilterUrl] = useState(`url(#${sketchFilterId})`);
	
	useEffect(() => {
		const updateFilterUrl = () => setFilterUrl(`url(${window.location.href.split('#')[0]}#${sketchFilterId})`);
		updateFilterUrl();
		document.addEventListener('astro:page-load', updateFilterUrl);
		return () => document.removeEventListener('astro:page-load', updateFilterUrl);
	}, [sketchFilterId]);

	const titleLetters = "Field Notes".split("");

	return (
		<section className="w-full min-h-screen bg-canvas relative pt-32 pb-40 px-4 md:px-8 z-10">
			
			<svg width="0" height="0" className="absolute pointer-events-none">
				<defs>
					<filter id={sketchFilterId} x="-10%" y="-10%" width="120%" height="120%">
						<feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
						<feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
					</filter>
				</defs>
			</svg>

			<div className="max-w-4xl mx-auto z-10 relative">
				
				<motion.header 
					initial="hidden"
					animate="visible"
					variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
					className="mb-8 flex flex-col items-center text-center"
				>
					<h1 className="text-3xl md:text-5xl font-serif text-ink italic mb-4 flex">
						{titleLetters.map((char, index) => (
							<motion.span
								key={index}
								variants={{
									hidden: { opacity: 0, y: 20, rotate: Math.random() * 20 - 10 },
									visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", damping: 10, stiffness: 200 } }
								}}
							>
								{char === " " ? "\u00A0" : char}
							</motion.span>
						))}
					</h1>
					
					<motion.p 
						variants={{
							hidden: { opacity: 0, y: 10 },
							visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4, ease: "easeOut" } }
						}}
						className="text-base text-slate font-sans max-w-md"
					>
						A collection of observations, experiments, and random musings from the middle of the night :&#41;
					</motion.p>
				</motion.header>

				<motion.div 
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", bounce: 0.5, delay: 0.7 }}
					className="flex flex-wrap justify-center gap-4 mb-8"
				>
					{uniqueTags.map((tag) => (
						<button
							key={tag}
							onClick={() => setActiveFilter(tag)}
							className="relative group inline-flex items-center justify-center px-6 py-2 outline-none"
						>
							<div 
								className={`absolute inset-0 w-full h-full rounded-full border-[1.5px] transition-colors duration-300 pointer-events-none
									${activeFilter === tag 
										? 'border-[#c88d9a] bg-[#FDF1F3]' 
										: 'border-slate/40 group-hover:border-[#c88d9a] group-hover:bg-[#FDF1F3]/50'
									}
								`} 
								style={{ filter: filterUrl }} 
							/>
							
							<span 
								className={`relative z-10 font-mono text-[10px] uppercase tracking-widest transition-colors duration-300
									${activeFilter === tag ? 'text-[#c88d9a] font-bold' : 'text-slate group-hover:text-[#c88d9a]'}
								`}
							>
								{tag}
							</span>
						</button>
					))}
				</motion.div>

				<div className="flex flex-col border-t border-slate/10">
					<AnimatePresence mode="popLayout">
						{filteredPosts.map((post, index) => (
							<motion.a 
								href={post.url}
								key={post.url}
								layout
								initial={{ opacity: 0, y: 20, rotate: -2, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
								transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.8 + (index * 0.05) }}
								className="group flex flex-col md:flex-row md:items-baseline py-6 border-b border-slate/10 cursor-pointer hover:bg-[#FDF1F3]/50 transition-colors px-2 md:px-4 -mx-2 md:-mx-4 rounded-lg block outline-none focus:bg-[#FDF1F3]/50"
							>
								<time className="text-xs font-mono text-slate mb-2 md:mb-0 w-32 shrink-0">
									{post.date}
								</time>
								
								<h3 className="text-lg font-serif text-ink group-hover:text-[#c88d9a] transition-colors grow pr-4">
									{post.title}
								</h3>
								
								<div className="mt-3 md:mt-0 shrink-0">
									<span className="text-[9px] font-mono uppercase tracking-widest text-slate border-2 border-slate/20 px-3 py-1.5 [border-radius:255px_15px_225px_15px/15px_225px_15px_255px] group-hover:border-[#c88d9a]/50 group-hover:text-[#c88d9a] transition-colors">
										{post.tag}
									</span>
								</div>
							</motion.a>
						))}
					</AnimatePresence>
					
					{filteredPosts.length === 0 && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-slate font-sans text-sm">
							No notes found for this category.
						</motion.div>
					)}
				</div>

			</div>
		</section>
	);
}