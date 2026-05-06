import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const RecordCard = ({ record, index, total, onSwipe }) => {
	const isFront = index === 0;
	const x = useMotionValue(0);
	
	const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
	const dragY = useTransform(x, [-200, 0, 200], [-80, 0, -80]);

	const handleDragEnd = (e, info) => {
		if (Math.abs(info.offset.x) > 80) {
			onSwipe();
		}
	};

	return (
		<motion.div
			layout
			initial={false}
			animate={{
				y: index * -20,
				scale: 1 - index * 0.05,
				opacity: 1 - index * 0.15,
				zIndex: total - index,
			}}
			transition={{ type: "spring", stiffness: 260, damping: 25 }}
			className="absolute bottom-5 flex justify-center w-full"
		>
			<motion.div
				drag={isFront ? "x" : false}
				dragConstraints={{ left: 0, right: 0 }}
				dragElastic={0.8}
				onDragEnd={isFront ? handleDragEnd : undefined}
				style={{
					x: isFront ? x : 0,
					y: isFront ? dragY : 0,
					rotate: isFront ? rotate : 0,
				}}
				className={`relative w-52 h-52 md:w-64 md:h-64 group ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
			>
				<div className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:-translate-y-16 group-hover:rotate-6 z-0 drop-shadow-md">
					<svg viewBox="0 0 100 100" className="w-full h-full">
						<circle cx="50" cy="50" r="48" fill="#3D3B38" />
						<circle cx="50" cy="50" r="42" fill="transparent" stroke="#2A2826" strokeWidth="1" />
						<circle cx="50" cy="50" r="36" fill="transparent" stroke="#2A2826" strokeWidth="1" />
						<circle cx="50" cy="50" r="30" fill="transparent" stroke="#2A2826" strokeWidth="1" />
						<circle cx="50" cy="50" r="24" fill="transparent" stroke="#2A2826" strokeWidth="1" />
						<circle cx="50" cy="50" r="16" fill={record.color} />
						<circle cx="50" cy="50" r="4" fill="#FDFCF8" />
					</svg>
				</div>

				<div 
					className="absolute inset-0 w-full h-full rounded shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 flex flex-col items-center justify-center z-10"
					style={{ backgroundColor: record.color }}
				>
					<img
						src={record.src}
						alt={record.title}
						className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
						onError={(e) => e.target.style.display = 'none'}
					/>
					<div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 pointer-events-none">
						<h3 className="font-serif italic text-2xl text-ink/70">{record.title}</h3>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default function DraggableCrate() {
	const [records, setRecords] = useState([
		{ id: 1, title: "Album One", color: "#E3DEE8", src: "/albums/1.png" },
		{ id: 2, title: "Album Two", color: "#DDEADD", src: "/albums/2.png" },
		{ id: 3, title: "Album Three", color: "#F4E3E1", src: "/albums/3.png" },
		{ id: 4, title: "Album Four", color: "#737C84", src: "/albums/4.png" },
		{ id: 5, title: "Album Five", color: "#4A5056", src: "/albums/5.png" },
		{ id: 6, title: "Album Six", color: "#FDFCF8", src: "/albums/6.png" },
		{ id: 7, title: "Album Seven", color: "#FDFCF8", src: "/albums/7.png" }
	]);

	const handleSwipe = () => {
		setRecords((prev) => {
			const newRecords = [...prev];
			const first = newRecords.shift();
			newRecords.push(first);
			return newRecords;
		});
	};

	return (
		<div className="relative w-full h-full flex flex-col items-center justify-center p-8 min-h-125">
			
			<div className="text-center mb-16 z-40">
				<h3 className="font-serif italic text-2xl text-ink mb-4">What's Playing</h3>
				<div className="w-16 h-px bg-slate/20 mx-auto"></div>
			</div>

			<div className="relative w-70 h-65 md:w-85 md:h-75 mx-auto mt-4">
				
				<div className="absolute -right-8 md:-right-24 -top-16 md:-top-12 w-32 md:w-40 flex flex-col items-center pointer-events-none z-30">
					<span className="text-xs md:text-sm font-serif italic text-slate/80 text-center leading-tight mb-2">
						swipe to explore my favorite music!
					</span>
					<svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-slate/60 -scale-x-100 rotate-15 -ml-8">
						<path d="M5 8 C 15 20, 25 0, 35 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="transparent"/>
						<path d="M28 12 L35 12 L32 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="transparent"/>
					</svg>
				</div>

				<div className="absolute inset-x-0 bottom-0 h-[80%] bg-[#4A3424] rounded-t-md shadow-[inset_0_20px_30px_rgba(0,0,0,0.6)] border-x-8 border-b-8 border-t-4 border-[#332318] z-0"></div>

				<div className="absolute inset-x-0 bottom-3 h-full flex justify-center z-10 pointer-events-none">
					<div className="relative w-full h-full pointer-events-auto">
						{records.map((record, index) => (
							<RecordCard 
								key={record.id} 
								record={record} 
								index={index} 
								total={records.length} 
								onSwipe={handleSwipe} 
							/>
						))}
					</div>
				</div>

				<div className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-b from-[#7A563C] to-[#5C402D] rounded-b-md z-20 border-x-8 border-b-8 border-t-8 border-[#4A3424] shadow-[0_-5px_30px_rgba(0,0,0,0.4)] overflow-hidden pointer-events-none">
					<div className="absolute inset-0 flex justify-evenly opacity-20 pointer-events-none">
						<div className="w-1 h-full bg-[#2A1D14]"></div>
						<div className="w-1 h-full bg-[#2A1D14]"></div>
						<div className="w-1 h-full bg-[#2A1D14]"></div>
						<div className="w-1 h-full bg-[#2A1D14]"></div>
						<div className="w-1 h-full bg-[#2A1D14]"></div>
					</div>
					
					<div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#D4C3B3]/10 rounded border border-[#D4C3B3]/20 shadow-inner flex items-center justify-between px-2">
						<div className="w-1 h-1 rounded-full bg-[#2A1D14]/80"></div>
						<div className="w-1 h-1 rounded-full bg-[#2A1D14]/80"></div>
					</div>
				</div>

			</div>
		</div>
	);
}