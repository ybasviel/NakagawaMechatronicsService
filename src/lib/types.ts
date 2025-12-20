import type { MicroCMSImage, MicroCMSDate, MicroCMSContentId } from 'microcms-js-sdk';

export type Work = {
	title: string;
	description: string;
	content: string;
	thumbnail?: MicroCMSImage;
} & MicroCMSContentId &
	MicroCMSDate;

export type Blog = {
	title: string;
	content: string;
	thumbnail?: MicroCMSImage;
} & MicroCMSContentId &
	MicroCMSDate;

