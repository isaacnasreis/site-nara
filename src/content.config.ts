import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      year: z.string(), // ex: "2024"
      category: z.enum(["Editorial", "Identidade", "Ilustração", "Cultura"]),
      cover: image(), // Capa do projeto
      gallery: z.array(image()).optional(), // Imagens adicionais para a página interna
      featured: z.boolean().default(false),
    }),
});

export const collections = {
  projects: projectsCollection,
};
