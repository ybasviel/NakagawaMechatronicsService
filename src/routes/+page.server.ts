import type { PageServerLoad } from './$types';
import { getWorks } from '$lib/microcms';

export const load: PageServerLoad = async () => {
	const works = await getWorks();
	return {
		works
	};
};

