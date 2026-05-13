export default function Footer() {
	return (
		<footer className="relative w-full pt-8 pb-12 bg-[#FDF1F3] flex flex-col items-center justify-center z-50 px-4">
			
			<svg 
				className="w-full h-12 md:h-16 absolute top-0 left-0 translate-y-[-99%] z-50 pointer-events-none" 
				preserveAspectRatio="none" 
				viewBox="0 0 1200 100"
			>
				<path 
					d="M0,100 L0,60 C 40,10 80,10 120,60 C 160,20 200,20 240,60 C 280,0 340,0 380,60 C 420,10 480,10 520,60 C 560,30 600,30 640,60 C 680,10 740,10 780,60 C 820,0 880,0 920,60 C 960,20 1000,20 1040,60 C 1080,10 1160,10 1200,60 L1200,100 Z" 
					fill="#FDF1F3" 
				/>
			</svg>

			<div className="font-serif italic text-ink text-xs sm:text-sm md:text-base flex flex-col md:flex-row items-center gap-1.5 md:gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-default mt-2 text-center">
				<span>© 2026</span>
				<span className="opacity-50 hidden md:inline">~</span>
				<span>made with &lt;3 and lots of coffee</span>
				<span className="opacity-50 hidden md:inline">~</span>
				<span>built by revati</span>
			</div>
			
		</footer>
	);
}