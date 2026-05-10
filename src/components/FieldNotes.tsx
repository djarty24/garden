import { motion } from 'framer-motion';

type Post = {
	url: string;
	title: string;
	date: string;
	tag: string;
};

export default function FieldNotes({ posts }: { posts: Post[] }) {
	const displayPosts = posts || [];

	return (
		<section className="w-full min-h-screen bg-canvas pt-32 pb-40 px-4 md:px-8">
			<div className="max-w-4xl mx-auto">
				
				<header className="mb-16 flex flex-col items-center text-center">
					<h1 className="text-3xl md:text-5xl font-serif text-ink italic mb-4">
						Field Notes
					</h1>
					<p className="text-lg text-slate font-sans max-w-md">
						A collection of observations, experiments, and random musings from the middle of the night :&#41;
					</p>
				</header>

				<div className="flex flex-col border-t border-slate/10">
					{displayPosts.map((post, index) => (
						<motion.a 
							href={post.url}
							key={post.url}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.05 }}
							className="group flex flex-col md:flex-row md:items-baseline py-6 border-b border-slate/10 cursor-pointer hover:bg-[#FDF1F3]/50 transition-colors px-2 md:px-4 -mx-2 md:-mx-4 rounded-lg outline-none focus:bg-[#FDF1F3]/50"
						>
							<time className="text-xs font-mono text-slate mb-2 md:mb-0 w-32 shrink-0">
								{post.date}
							</time>
							
							<h3 className="text-lg font-serif text-ink group-hover:text-[#c88d9a] transition-colors grow pr-4">
								{post.title}
							</h3>
							
							<div className="mt-3 md:mt-0 shrink-0">
								<span className="text-[9px] uppercase tracking-widest text-slate border border-slate/20 px-3 py-1.5 rounded-sm group-hover:border-[#c88d9a]/50 group-hover:text-[#c88d9a] transition-colors">
									{post.tag}
								</span>
							</div>
						</motion.a>
					))}
				</div>

			</div>
		</section>
	);
}