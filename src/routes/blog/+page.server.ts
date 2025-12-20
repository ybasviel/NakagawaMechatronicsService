import type { PageServerLoad } from './$types';
import { getBlogs } from '$lib/microcms';

export const load: PageServerLoad = async () => {
	const blogs = await getBlogs({ limit: 100 });

	// Group blogs by year-month for archive
	const archive: Record<string, typeof blogs.contents> = {};
	for (const blog of blogs.contents) {
		const date = new Date(blog.publishedAt);
		const yearMonth = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
		if (!archive[yearMonth]) {
			archive[yearMonth] = [];
		}
		archive[yearMonth].push(blog);
	}

	return {
		blogs: blogs.contents,
		latestBlogs: blogs.contents.slice(0, 3),
		archive
	};
};

