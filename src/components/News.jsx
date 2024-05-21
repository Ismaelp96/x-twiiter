'use client';

import { useEffect, useState } from 'react';

export default function News() {
	const [news, setNews] = useState([]);
	const [articlesNum, setArticlesNum] = useState(3);

	useEffect(() => {
		fetch(
			'https://newsapi.org/v2/everything?q=bitcoin?&apiKey=5863a0767e214a748ce0e50b8d7f6973',
		)
			.then((res) => res.json())
			.then((data) => {
				setNews(data.articles);
			});
	}, []);

	return (
		<div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2'>
			<h4 className='font-bold text-xl px-4'>What&apos;s happening</h4>
			{news.slice(0, articlesNum).map((article) => (
				<h2 key={article.url}>
					<a href={article.url} target='_blank'>
						<div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition-all duration-200'>
							<div className='space-y-0.5'>
								<h6 className='font-bold hover:text-blue-500 text-sm transition-all duration-200'>
									{article.title}
								</h6>
								<p className='text-xs font-medium text-gray-500'>
									{article.source.name}
								</p>
							</div>
						</div>
					</a>
				</h2>
			))}
			<button
				onClick={() => setArticlesNum(articlesNum + 3)}
				className='text-blue-400 pl-4 pb-3 hover:text-blue-500 text-sm transition-all duration-200'>
				Load more
			</button>
		</div>
	);
}
