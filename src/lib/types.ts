import type { MicroCMSImage, MicroCMSDate, MicroCMSContentId } from 'microcms-js-sdk';

export type Work = {
	id: string;
	title: string;
	description: string;
	content: string;
	thumbnail?: MicroCMSImage;
	publishedAt: string;
} & MicroCMSContentId &
	MicroCMSDate;

export type Blog = {
	id: string;
	title: string;
	content: string;
	thumbnail?: MicroCMSImage;
	publishedAt: string;
} & MicroCMSContentId &
	MicroCMSDate;

