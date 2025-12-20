import type { PageServerLoad } from './$types';
import { getWorks } from '$lib/microcms';

export const load: PageServerLoad = async () => {
	const works = await getWorks({ limit: 100 });
	return {
		works: works.contents
	};
};

