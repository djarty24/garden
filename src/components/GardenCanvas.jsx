import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GardenCanvas() {
	const gardenRef = useRef(null);
	const [plantingSpot, setPlantingSpot] = useState(null);
	
	const [plantedFlowers, setPlantedFlowers] = useState([
		{ id: 1, x: 20, y: 50, name: "Revati", flower: "Tulip" }
	]);

	const handleGardenClick = (e) => {
		if (e.target.closest('.flower-element') || e.target.closest('.planting-modal')) {
			return;
		}

		const rect = gardenRef.current.getBoundingClientRect();
		
		const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
		const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

		setPlantingSpot({ x: xPercent, y: yPercent });
	};

	const cancelPlanting = () => {
		setPlantingSpot(null);
	};

	return (
		<section className="w-full min-h-screen bg-canvas relative overflow-hidden flex flex-col pt-32 pb-20">
			
			<div className="text-center z-10 mb-8 pointer-events-none">
				<h2 className="text-3xl md:text-5xl font-serif text-ink italic mb-4">Guestbook</h2>
				<p className="text-slate font-sans max-w-md mx-auto">
					Plant a flower and leave me a message!
				</p>
			</div>

			<div 
				ref={gardenRef}
				onClick={handleGardenClick}
				className="flex-grow w-full max-w-7xl mx-auto relative cursor-crosshair border-b-8 border-[#c88d9a]/20"
				style={{ minHeight: '60vh' }}
			>
				
				{plantedFlowers.map((flower) => (
					<motion.div
						key={flower.id}
						className="absolute flower-element cursor-pointer group"
						style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
						animate={{ rotate: [-2, 2, -2] }}
						transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
					>
						<div className="w-12 h-12 bg-[#c88d9a] rounded-full flex items-center justify-center text-white text-xs shadow-md">
							{flower.flower}
						</div>
						
						<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-white px-3 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-ink text-xs font-sans">
							Planted by {flower.name}
						</div>
					</motion.div>
				))}

				<AnimatePresence>
					{plantingSpot && (
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							className="absolute -translate-x-1/2 -translate-y-1/2 z-50 planting-modal"
							style={{ left: `${plantingSpot.x}%`, top: `${plantingSpot.y}%` }}
						>
							<div className="w-4 h-4 bg-ink rounded-full animate-pulse shadow-[0_0_15px_rgba(0,0,0,0.2)]" />
							
							<div className="absolute top-6 left-1/2 -translate-x-1/2 w-64 bg-white p-4 rounded-xl shadow-2xl border border-slate/10 flex flex-col gap-3">
								<p className="text-sm font-serif italic text-ink text-center border-b border-slate/10 pb-2">Planting a new flower...</p>
								<button 
									onClick={cancelPlanting}
									className="text-xs font-sans text-slate hover:text-ink squiggly-underline w-fit mx-auto"
								>
									Cancel
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

			</div>
		</section>
	);
}