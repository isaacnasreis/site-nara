import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      year: z.string(),
      category: z.enum([
        "Editorial",
        "Design",
        "Identidade",
        "Ilustração",
        "Cultura",
      ]),
      cover: image(),
      gallery: z.array(image()).optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = {
  projects: projectsCollection,
};
