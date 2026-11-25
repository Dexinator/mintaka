import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.date(),
			// Tie-breaker for projects published in the same month (lower goes first)
			order: z.number().default(0),
			type: z.string(),
			description: z.string(),
			link: z.string().url(),
			// Shown as tags on the card
			duration: z.number().optional(), // minutes
			audios: z.number().optional(),
			features: z.array(z.enum(["lse", "audiodescription", "easyreading", "subtitles", "english"])).default([]),
			image: z.object({
				source: image(),
				alt: z.string(),
			}),
		}),
});

export const collections = {
	projects: projectsCollection,
};
