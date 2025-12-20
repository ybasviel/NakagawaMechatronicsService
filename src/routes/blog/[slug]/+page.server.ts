import type { PageServerLoad } from './$types';
import { getBlog } from '$lib/microcms';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const blog = await getBlog(params.slug);
		return {
			blog
		};
	} catch {
		throw error(404, 'Blog post not found');
	}
};

