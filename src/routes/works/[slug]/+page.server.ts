import type { PageServerLoad } from './$types';
import { getWork } from '$lib/microcms';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const work = await getWork(params.slug);
		return {
			work
		};
	} catch {
		throw error(404, 'Work not found');
	}
};

