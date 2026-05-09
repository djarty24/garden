import { useState, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, getDocs, query, orderBy, limit, startAfter, endBefore, limitToLast, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase'; 

const FLOWER_IMAGES = [
	'/guestbook/flower1.png',
	'/guestbook/flower2.png',
	'/guestbook/flower3.png',
	'/guestbook/flower4.png',
	'/guestbook/flower5.png',
	'/guestbook/flower6.png',
	'/guestbook/flower7.png',
	'/guestbook/flower8.png',
	'/guestbook/flower9.png',
];

const FLOWERS_PER_PAGE = 32;

export default function GardenCanvas() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const uniqueId = useId().replace(/:/g, "");
	const sketchFilterId = `sketch-filter-${uniqueId}`;
	
	const [filterUrl, setFilterUrl] = useState(`url(#${sketchFilterId})`);
	
	useEffect(() => {
		const updateFilterUrl = () => setFilterUrl(`url(${window.location.href.split('#')[0]}#${sketchFilterId})`);
		updateFilterUrl();
		document.addEventListener('astro:page-load', updateFilterUrl);
		return () => document.removeEventListener('astro:page-load', updateFilterUrl);
	}, [sketchFilterId]);

	const [flowerIndex, setFlowerIndex] = useState(0);
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [website, setWebsite] = useState('');

	const [plantedFlowers, setPlantedFlowers] = useState([]);
	const [activeMessage, setActiveMessage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	
	const [totalFlowers, setTotalFlowers] = useState(0);
	const [firstVisible, setFirstVisible] = useState(null);
	const [lastVisible, setLastVisible] = useState(null);

	const totalPages = Math.ceil(totalFlowers / FLOWERS_PER_PAGE) || 1;

	const fetchPage = async (direction = "initial") => {
		try {
			const guestbookRef = collection(db, "guestbook");
			let q;

			if (direction === "initial") {
				q = query(guestbookRef, orderBy("createdAt", "desc"), limit(FLOWERS_PER_PAGE));
				const snapshot = await getCountFromServer(guestbookRef);
				setTotalFlowers(snapshot.data().count);
			} else if (direction === "next" && lastVisible) {
				q = query(guestbookRef, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(FLOWERS_PER_PAGE));
			} else if (direction === "prev" && firstVisible) {
				q = query(guestbookRef, orderBy("createdAt", "desc"), endBefore(firstVisible), limitToLast(FLOWERS_PER_PAGE));
			} else {
				return;
			}

			const documentSnapshots = await getDocs(q);

			if (!documentSnapshots.empty) {
				setFirstVisible(documentSnapshots.docs[0]);
				setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

				const flowersData = [];
				documentSnapshots.forEach((doc) => flowersData.push({ id: doc.id, ...doc.data() }));
				setPlantedFlowers(flowersData);

				if (direction === "initial") setCurrentPage(1);
				else if (direction === "next") setCurrentPage(prev => prev + 1);
				else if (direction === "prev") setCurrentPage(prev => prev - 1);
			}
		} catch (error) {
			console.error("Error fetching flowers:", error);
		}
	};

	useEffect(() => {
		fetchPage("initial");
	}, []);

	const nextFlower = () => setFlowerIndex((prev) => (prev + 1) % FLOWER_IMAGES.length);
	const prevFlower = () => setFlowerIndex((prev) => prev === 0 ? FLOWER_IMAGES.length - 1 : prev - 1);

	const handlePlantClick = async () => {
		if (!name || !message) return alert("Please leave a name and a message!");
		
		try {
			await addDoc(collection(db, "guestbook"), {
				name,
				message,
				website,
				flowerIdx: flowerIndex,
				createdAt: Date.now()
			});
			setIsDrawerOpen(false);
			setName(''); setMessage(''); setWebsite('');
			
			fetchPage("initial");
			
		} catch (error) {
			console.error("Error planting flower: ", error);
			alert("Oops! Something went wrong planting your seed.");
		}
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
				<h2 className="text-3xl md:text-5xl font-serif text-ink italic mt-6 my-4">Guestbook</h2>
				<p className="text-sm md:text-base leading-normal text-slate font-sans max-w-md mx-auto mb-5">
					Plant a flower and leave me a message! <br/>
					This guestbook was inspired by <a href="https://annasgarden.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline decoration-slate/30 hover:text-ink transition-colors underline-offset-2">Anna's Secret Garden</a>.
				</p>
				<button onClick={() => setIsDrawerOpen(true)} className="relative group inline-flex items-center justify-center px-6 py-2 outline-none mb-4">
					<div className="absolute inset-0 w-full h-full rounded-full border-[1.5px] border-ink group-hover:border-[#c88d9a] group-hover:bg-[#FDF1F3] transition-colors duration-300 pointer-events-none" style={{ filter: filterUrl }} />
					<span className="relative z-10 font-sans text-[10px] md:text-xs tracking-widest uppercase text-ink group-hover:text-[#c88d9a] transition-colors duration-300">Write a Message</span>
				</button>
				<p className="text-[10px] md:text-xs font-serif italic text-slate/80">{totalFlowers} flowers have been planted in my garden!</p>
			</div>

			<div className="w-full max-w-6xl mx-auto grow flex flex-col items-center justify-start z-10">
				<div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-6 w-full">
					{plantedFlowers.map((flower) => {
						const pathId = `curve-${uniqueId}-${flower.id}`;
						return (
							<div key={flower.id} className="relative flex flex-col items-center justify-center aspect-square border border-slate/10 bg-slate/5 rounded-xl group hover:bg-[#FDF1F3]/50 hover:border-[#c88d9a]/30 transition-all duration-300">
								<motion.div layout={false} className="relative w-full h-full flex items-center justify-center cursor-pointer" animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4 + ((flower.createdAt || 0) % 3), ease: "easeInOut" }} onClick={() => setActiveMessage(activeMessage === flower.id ? null : flower.id)}>
									<svg width="100" height="40" viewBox="0 0 100 40" className="absolute bottom-[65%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-visible">
										<path id={pathId} d="M 5 35 Q 50 10 95 35" fill="transparent" />
										<text width="100" className="font-serif italic text-ink text-[9px] drop-shadow-sm"><textPath href={`${filterUrl.replace(`url(`, '').replace(`)`, '').split('#')[0]}#${pathId}`} startOffset="50%" textAnchor="middle">Planted by {flower.name}</textPath></text>
									</svg>
									<div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<img src={FLOWER_IMAGES[flower.flowerIdx]} alt="Planted flower" className="w-full h-full object-contain pointer-events-none drop-shadow-md" draggable="false" />
									</div>
								</motion.div>

								<AnimatePresence>
									{activeMessage === flower.id && (
										<motion.div layout={false} initial={{ opacity: 0, y: 5, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: 0.95 }} className="absolute top-[105%] left-1/2 -translate-x-1/2 mt-2 w-48 sm:w-56 bg-white p-4 rounded-xl shadow-xl border border-slate/10 z-50 text-left" onClick={(e) => e.stopPropagation()}>
											
											<pre className="font-mono whitespace-pre-wrap text-ink text-[10px] leading-tight mb-3 overflow-x-auto max-h-40 overflow-y-auto custom-scrollbar">
												{flower.message}
											</pre>

											<div className="flex items-center justify-between mt-4 pt-3 border-t border-slate/10">
												<p className="text-[10px] font-sans font-bold text-[#c88d9a] uppercase tracking-wider truncate mr-2">— {flower.name}</p>
												{flower.website && (
													<a href={flower.website} target="_blank" rel="noopener noreferrer" className="text-[9px] font-sans text-slate hover:text-ink underline decoration-slate/30 underline-offset-2 transition-colors shrink-0">
														visit website ↗
													</a>
												)}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>

				{totalPages > 1 && (
					<div className="mt-16 flex items-center gap-8 font-sans text-xs tracking-widest text-slate">
						<button onClick={() => fetchPage("prev")} disabled={currentPage === 1} className={`hover:text-ink transition-colors ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}>PREV</button>
						<span>{currentPage} / {totalPages}</span>
						<button onClick={() => fetchPage("next")} disabled={currentPage === totalPages} className={`hover:text-ink transition-colors ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : ''}`}>NEXT</button>
					</div>
				)}
			</div>

			<AnimatePresence>
				{isDrawerOpen && (
					<motion.div layout={false} initial={{ x: '120%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '120%', opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-24 right-4 md:right-8 h-[calc(100vh-8rem)] w-full max-w-85 shadow-[-10px_10px_40px_rgba(0,0,0,0.2)] z-100 overflow-y-auto rounded-2xl" style={{ backgroundColor: '#5c4033', backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)', backgroundSize: '4px 4px', border: '4px solid #3e2723' }}>
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
										<img src={FLOWER_IMAGES[flowerIndex]} alt="Selected flower" className="w-full h-full object-contain drop-shadow-md" draggable="false" />
									</div>
									<button onClick={nextFlower} className="text-[#FDF1F3] hover:scale-125 transition-transform text-2xl">&rarr;</button>
								</div>
							</div>

							<div className="flex flex-col gap-4 grow">
								<div>
									<label className="block text-[#d7ccc8] text-[10px] uppercase tracking-widest font-sans mb-1">Your Name</label>
									<input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#FDF1F3] text-ink px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c88d9a] font-sans text-xs" placeholder="Jane Doe" />
								</div>
								<div>
									<label className="block text-[#d7ccc8] text-[10px] uppercase tracking-widest font-sans mb-1">Message</label>
									<textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#FDF1F3] text-ink px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c88d9a] font-mono resize-none h-32 text-[10px]" placeholder="Write something nice or paste ASCII art..." />
								</div>
								<div>
									<label className="block text-[#d7ccc8] text-[10px] uppercase tracking-widest font-sans mb-1">Website (Optional)</label>
									<input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full bg-[#FDF1F3] text-ink px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c88d9a] font-sans text-xs" placeholder="https://yourwebsite.com" />
								</div>
							</div>

							<button onClick={handlePlantClick} className="mt-6 w-full py-3 bg-[#c88d9a] text-white font-serif italic text-xl rounded-xl hover:bg-[#b07886] transition-colors shadow-lg">Plant!</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}