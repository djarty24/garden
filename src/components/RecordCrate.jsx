import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RecordCrate() {
	const [records, setRecords] = useState([
		{ id: 1, title: "Album One", color: "#E3DEE8", src: "/albums/1.png" },
		{ id: 2, title: "Album Two", color: "#DDEADD", src: "/albums/2.png" },
		{ id: 3, title: "Album Three", color: "#F4E3E1", src: "/albums/3.png" },
		{ id: 4, title: "Album Four", color: "#FDFCF8", src: "/albums/4.png" }
	]);

	const handleFlip = () => {
		setRecords((prev) => {
			const newRecords = [...prev];
			const first = newRecords.shift();
			newRecords.push(first);
			return newRecords;
		});
	};

	return (
		<div 
			className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group py-12" 
			onClick={handleFlip}
		>
			<div className="relative w-56 h-56 md:w-72 md:h-72 mt-8">
				{records.map((record, index) => {
					return (
						<motion.div
							key={record.id}
							layout
							initial={false}
							animate={{
								top: index * -20,
								scale: 1 - index * 0.05,
								zIndex: records.length - index,
								opacity: 1 - index * 0.1,
							}}
							transition={{ type: "spring", stiffness: 260, damping: 25 }}
							className="absolute left-0 w-full h-full rounded shadow-2xl overflow-hidden border border-slate/10 flex items-center justify-center"
							style={{ backgroundColor: record.color }}
						>
							<img
								src={record.src}
								alt={record.title}
								className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
								onError={(e) => e.target.style.display = 'none'}
							/>
							<div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
								<h3 className="font-serif italic text-2xl text-ink/70">{record.title}</h3>
							</div>
						</motion.div>
					);
				})}
			</div>
			
			<p className="mt-20 font-serif italic text-slate/60 text-sm transition-opacity group-hover:opacity-100 opacity-0">
				click to flip through
			</p>
		</div>
	);
}