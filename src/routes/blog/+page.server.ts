import type { PageServerLoad } from './$types';
import { getBlogs } from '$lib/microcms';

const EXCERPT_LENGTH = 120;

function htmlToText(html: string): string {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/\s+/g, ' ')
		.trim();
}

export const load: PageServerLoad = async () => {
	const blogs = await getBlogs();

	// 本文HTMLはクライアントに送らず、抜粋だけ渡す
	const summaries = blogs.map((blog) => {
		const text = htmlToText(blog.content);
		return {
			id: blog.id,
			title: blog.title,
			publishedAt: blog.publishedAt,
			thumbnail: blog.thumbnail,
			excerpt: text.length > EXCERPT_LENGTH ? `${text.slice(0, EXCERPT_LENGTH)}…` : text
		};
	});

	// Group blogs by year (newest first)
	const years: { year: number; blogs: typeof summaries }[] = [];
	for (const blog of summaries) {
		const year = new Date(blog.publishedAt).getFullYear();
		const last = years.at(-1);
		if (last?.year === year) {
			last.blogs.push(blog);
		} else {
			years.push({ year, blogs: [blog] });
		}
	}

	return { years };
};
