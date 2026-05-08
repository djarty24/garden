import { useState, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLOWER_IMAGES = [
	'/guestbook/flower1.png',
	'/guestbook/flower2.png',
	'/guestbook/flower3.png',
];

const FLOWERS_PER_PAGE = 32;

export default function GardenCanvas() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const uniqueId = useId().replace(/:/g, "");
	const sketchFilterId = `sketch-filter-${uniqueId}`;
	
	const [currentPath, setCurrentPath] = useState('');
	
	useEffect(() => {
		setCurrentPath(window.location.pathname);
	}, []);
	
	const [flowerIndex, setFlowerIndex] = useState(0);
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [song, setSong] = useState('');

	const [plantedFlowers, setPlantedFlowers] = useState([
		{ id: 1, name: "Iterator", message: "Welcome to my garden! So glad you're here.", song: "Bags by Clairo", flowerIdx: 0 },
		{ id: 2, name: "Alice", message: "Love the site design!", song: "Pink + White", flowerIdx: 0 },
		{ id: 3, name: "Bob", message: "Great work on Ditch Explorer.", song: "Vane by C418", flowerIdx: 0 },
		{ id: 4, name: "Charlie", message: "This guestbook is so cozy.", song: "Space Song", flowerIdx: 0 },
		{ id: 5, name: "Diana", message: "Hello from the east coast!", song: "Genesis", flowerIdx: 0 },
		{ id: 6, name: "Eve", message: "Keep up the endless building.", song: "Ribs by Lorde", flowerIdx: 0 },
		{ id: 7, name: "Frank", message: "Such a cool aesthetic.", song: "Dreams", flowerIdx: 0 },
		{ id: 8, name: "Grace", message: "Tinkering is the best.", song: "Everywhere", flowerIdx: 0 }
	]);
	
	const [activeMessage, setActiveMessage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(plantedFlowers.length / FLOWERS_PER_PAGE) || 1;
	const startIndex = (currentPage - 1) * FLOWERS_PER_PAGE;
	const currentFlowers = plantedFlowers.slice(startIndex, startIndex + FLOWERS_PER_PAGE);

	const nextFlower = () => setFlowerIndex((prev) => (prev + 1) % FLOWER_IMAGES.length);
	const prevFlower = () => setFlowerIndex((prev) => (prev === 0 ? FLOWER_IMAGES.length - 1 : prev - 1));

	const handlePlantClick = () => {
		if (!name || !message) return alert("Please leave a name and a message!");
		
		const newFlower = {
			id: Date.now(),
			name,
			message,
			song,
			flowerIdx: flowerIndex
		};

		setPlantedFlowers([newFlower, ...plantedFlowers]);
		setIsDrawerOpen(false);
		setCurrentPage(1);
		
		setName('');
		setMessage('');
		setSong('');
	};

	return (
		<section className="w-full min-h-screen bg-canvas relative flex flex-col pt-24 pb-40 px-4 md:px-8 z-10">
			
			<svg width="0" height="0" className="absolute pointer-events-none">
				<defs>
					<filter id={sketchFilterId} x="-10%" y="-10%" width="120%" height="120%">
						<feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
						<feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
					</filter>
				</defs>
			</svg>

			<div className="text-center z-10 mb-8 relative flex flex-col items-center">
				<h2 className="text-xl md:text-3xl font-serif text-ink italic mb-2">Guestbook</h2>
				<p className="text-xs md:text-sm text-slate font-sans max-w-md mx-auto mb-5">
					Plant a flower and leave me a message!
				</p>
				
				<button 
					onClick={() => setIsDrawerOpen(true)}
					className="relative group inline-flex items-center justify-center px-6 py-2 outline-none"
				>
					<div 
						className="absolute inset-0 w-full h-full rounded-full border border-ink group-hover:border-[#c88d9a] group-hover:bg-[#FDF1F3] transition-colors duration-300 pointer-events-none"
						style={{ filter: `url(${currentPath}#${sketchFilterId})` }}
					></div>
					<span className="relative z-10 font-sans text-[10px] md:text-xs tracking-widest uppercase text-ink group-hover:text-[#c88d9a] transition-colors duration-300">
						Write a Message
					</span>
				</button>
			</div>

			<div className="w-full max-w-6xl mx-auto flex-grow flex flex-col items-center justify-start z-10">
				<motion.div 
					key={currentPage}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-6 w-full"
				>
					{currentFlowers.map((flower) => {
						const pathId = `curve-${uniqueId}-${flower.id}`;
						return (
							<div key={flower.id} className="relative flex flex-col items-center justify-center aspect-square border border-slate/10 bg-slate/5 rounded-xl group hover:bg-[#FDF1F3]/50 hover:border-[#c88d9a]/30 transition-all duration-300">
								
								<motion.div
									className="relative cursor-pointer flex flex-col items-center justify-center w-full h-full"
									animate={{ rotate: [-2, 2, -2] }}
									transition={{ repeat: Infinity, duration: 4 + (Math.random() * 2), ease: "easeInOut" }}
									onClick={() => setActiveMessage(activeMessage === flower.id ? null : flower.id)}
								>
									<svg width="100" height="40" viewBox="0 0 100 40" className="absolute bottom-[65%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
										<path id={pathId} d="M 5 35 Q 50 10 95 35" fill="transparent" />
										<text width="100" className="font-serif italic text-ink text-[9px] drop-shadow-sm">
											<textPath href={`${currentPath}#${pathId}`} startOffset="50%" textAnchor="middle">Planted by {flower.name}</textPath>
										</text>
									</svg>

									<div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center group-hover:scale-110 transition-transform origin-bottom mt-2">
										<img 
											src={FLOWER_IMAGES[flower.flowerIdx]} 
											alt="Planted flower" 
											className="w-full h-full object-contain pointer-events-none drop-shadow-md" 
											draggable="false" 
										/>
									</div>
								</motion.div>

								<AnimatePresence>
									{activeMessage === flower.id && (
										<motion.div 
											initial={{ opacity: 0, y: 5, scale: 0.95 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: 5, scale: 0.95 }}
											className="absolute top-[90%] left-1/2 -translate-x-1/2 mt-2 w-48 sm:w-56 bg-white p-4 rounded-xl shadow-xl border border-slate/10 z-50 text-left cursor-default"
											onClick={(e) => e.stopPropagation()}
										>
											<p className="font-serif italic text-ink text-sm mb-2">"{flower.message}"</p>
											{flower.song && (
												<p className="text-[10px] font-sans text-slate mb-3 flex items-center gap-2">
													<span>🎵</span> {flower.song}
												</p>
											)}
											<p className="text-[10px] font-sans font-bold text-[#c88d9a] uppercase tracking-wider">— {flower.name}</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</motion.div>

				{totalPages > 1 && (
					<div className="mt-16 flex items-center gap-8 font-sans text-xs tracking-widest text-slate">
						<button 
							onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
							disabled={currentPage === 1}
							className={`hover:text-ink transition-colors ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
						>
							&larr; PREV
						</button>
						<span>{currentPage} / {totalPages}</span>
						<button 
							onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
							disabled={currentPage === totalPages}
							className={`hover:text-ink transition-colors ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : ''}`}
						>
							NEXT &rarr;
						</button>
					</div>
				)}
			</div>

			<AnimatePresence>
				{isDrawerOpen && (
					<motion.div
						initial={{ x: '120%', opacity: 0 }} 
						animate={{ x: 0, opacity: 1 }} 
						exit={{ x: '120%', opacity: 0 }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className="fixed top-24 right-4 md:right-8 h-[calc(100vh-8rem)] w-full max-w-[340px] shadow-[-10px_10px_40px_rgba(0,0,0,0.2)] z-[100] overflow-y-auto rounded-2xl"
						style={{ 
							backgroundColor: '#5c4033',
							backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)',
							backgroundSize: '4px 4px',
							border: '4px solid #3e2723'
						}}
					>
						<div className="p-6 h-full flex flex-col">
							<div className="flex justify-between items-center mb-6 border-b border-[#8d6e63]/30 pb-4">
								<h3 className="text-2xl font-serif italic text-[#FDF1F3]">Your Seed</h3>
								<button onClick={() => setIsDrawerOpen(false)} className="text-[#FDF1F3] hover:text-white text-3xl leading-none">&times;</button>
							</div>

							<div className="flex flex-col items-center mb-6 bg-[#3e2723]/40 p-4 rounded-2xl shadow-inner border border-[#3e2723]">
								<p className="text-[#d7ccc8] text-[10px] uppercase tracking-widest font-sans mb-3">Choose a flower</p>
								<div className="flex items-center gap-6">
									<button onClick={prevFlower} className="text-[#FDF1F3] hover:scale-125 transition-transform text-2xl">&larr;</button>
									<div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center shadow-lg border border-white/20 p-2">
										<img 
											src={FLOWER_IMAGES[flowerIndex]} 
											alt="Selected flower" 
											className="w-full h-full object-contain drop-shadow-md" 
											draggable="false" 
										/>
									</div>
									<button onClick={nextFlower} className="text-[#FDF1F3] hover:scale-125 transition-transform text-2xl">&rarr;</button>
								</div>
							</div>

							<div className="flex flex-col gap-4 flex-grow">
								<div>
									<label className="block text-[#d7ccc8] text-[10px] uppercase tracking-widest font-sans mb-1">Your Name</label>
									<input 
										type="text" 
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="w-full bg-[#FDF1F3] text-ink px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c88d9a] font-sans text-xs"
										placeholder="Jane Doe"
									/>
								</div>
								<div>
									<label className="block text-[#d7ccc8] text-[10px] uppercase tracking-widest font-sans mb-1">Message</label>
									<textarea 
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										className="w-full bg-[#FDF1F3] text-ink px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c88d9a] font-sans resize-none h-20 text-xs"
										placeholder="Write something nice..."
									/>
								</div>
								<div>
									<label className="block text-[#d7ccc8] text-[10px] uppercase tracking-widest font-sans mb-1">Song Recommendation</label>
									<input 
										type="text" 
										value={song}
										onChange={(e) => setSong(e.target.value)}
										className="w-full bg-[#FDF1F3] text-ink px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c88d9a] font-sans text-xs"
										placeholder="Song title or Spotify link"
									/>
								</div>
							</div>

							<button 
								onClick={handlePlantClick}
								className="mt-6 w-full py-3 bg-[#c88d9a] text-white font-serif italic text-xl rounded-xl hover:bg-[#b07886] transition-colors shadow-lg"
							>
								Plant!
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}