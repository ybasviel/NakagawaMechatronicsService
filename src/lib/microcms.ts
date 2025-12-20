import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import type { Work, Blog } from './types';
import { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } from '$env/static/private';

export const client = createClient({
	serviceDomain: MICROCMS_SERVICE_DOMAIN,
	apiKey: MICROCMS_API_KEY
});

// Works
export async function getWorks(queries?: MicroCMSQueries) {
	return await client.getList<Work>({
		endpoint: 'works',
		queries: { ...queries, orders: '-publishedAt' }
	});
}

export async function getWork(contentId: string, queries?: MicroCMSQueries) {
	return await client.getListDetail<Work>({
		endpoint: 'works',
		contentId,
		queries
	});
}

// Blogs
export async function getBlogs(queries?: MicroCMSQueries) {
	return await client.getList<Blog>({
		endpoint: 'blog',
		queries: { ...queries, orders: '-publishedAt' }
	});
}

export async function getBlog(contentId: string, queries?: MicroCMSQueries) {
	return await client.getListDetail<Blog>({
		endpoint: 'blog',
		contentId,
		queries
	});
}

