export default function Contact() {
	return (
		<section className="w-full pt-24 pb-20 bg-canvas flex flex-col items-center justify-center relative overflow-hidden border-t border-slate/10">
			
			<svg width="0" height="0" className="absolute pointer-events-none">
				<defs>
					<filter id="sketch-filter" x="-10%" y="-10%" width="120%" height="120%">
						<feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
						<feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
					</filter>
				</defs>
			</svg>

			<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ink italic mb-6">Let's Chat!</h2>
			
			<p className="text-base sm:text-lg md:text-xl font-sans text-slate text-center mb-12 max-w-lg leading-relaxed px-6">
				I'm always building and always down to listen to new ideas. Whether you have a question or just want to say hi, shoot me an email at <br className="hidden md:block" />
				
				<span className="relative inline-block group mt-1">
					<a href="mailto:24revati@gmail.com" className="relative z-10 font-bold text-ink squiggly-underline hover:text-slate transition-colors">
						24revati@gmail.com
					</a>
					
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-2 -left-8 text-[#c88d9a] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none -rotate-12" filter="url(#sketch-filter)">
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
					</svg>

					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-4 -right-6 text-[#6b92b6] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 delay-75 ease-out pointer-events-none rotate-12" filter="url(#sketch-filter)">
						<circle cx="12" cy="12" r="10" />
						<path d="M8 14s1.5 2 4 2 4-2 4-2" />
						<line x1="9" y1="9" x2="9.01" y2="9" />
						<line x1="15" y1="9" x2="15.01" y2="9" />
					</svg>

					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -bottom-8 right-16 text-[#88ad82] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-150 ease-out pointer-events-none rotate-45" filter="url(#sketch-filter)">
						<path d="M12 2v20M17 7l-10 10M22 12H2M20 12v0M17 17L7 7" />
					</svg>
				</span>
			</p>

			<div className="flex items-center gap-8 md:gap-12">
				
				<a href="mailto:24revati@gmail.com" target="_blank" rel="noopener noreferrer" className="group p-2 transition-transform hover:scale-110 hover:-rotate-3">
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink group-hover:text-[#9B82C3] transition-colors" filter="url(#sketch-filter)">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
						<polyline points="22,6 12,13 2,6" />
					</svg>
				</a>
				
				<a href="https://github.com/djarty24" target="_blank" rel="noopener noreferrer" className="group p-2 transition-transform hover:scale-110 hover:rotate-3">
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink group-hover:text-[#6b92b6] transition-colors" filter="url(#sketch-filter)">
						<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
					</svg>
				</a>
				
				<a href="https://linkedin.com/in/revati-tambe/" target="_blank" rel="noopener noreferrer" className="group p-2 transition-transform hover:scale-110 hover:-rotate-2">
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink group-hover:text-[#c88d9a] transition-colors" filter="url(#sketch-filter)">
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
						<rect x="2" y="9" width="4" height="12" />
						<circle cx="4" cy="4" r="2" />
					</svg>
				</a>

				<a href="https://devpost.com/revatitechx" target="_blank" rel="noopener noreferrer" className="group p-2 transition-transform hover:scale-110 hover:rotate-2">
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink group-hover:text-[#88ad82] transition-colors" filter="url(#sketch-filter)">
						<path d="M12 2l8 4v12l-8 4-8-4v-12z"/>
						<text x="12" y="15" fontFamily="Verdana, Geneva, sans-serif" fontSize="10" textAnchor="middle" fill="currentColor">D</text>
					</svg>
				</a>
			</div>
		</section>
	);
}