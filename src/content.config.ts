import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function createBlogCollection(base: string) {
  return defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base }),
    schema: () =>
      z.object({
        pubDatetime: z.date(),
        series: z.string().optional(),
        image: z.string().optional(),
        title: z.string(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
        category: z.string(),
        description: z.string(),
      }),
  });
}

function createProjectCollection(base: string) {
  return defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base }),
    schema: () =>
      z.object({
        name: z.string(),
        technologies: z.array(z.string()),
        description: z.string(),
        image: z.string().optional(),
        sourceCode: z.string().optional(),
        preview: z.string().optional(),
        type: z.union([z.literal("core"), z.literal("side")]),
      }),
  });
}

export const collections = {
  blog: createBlogCollection("./docs/en_us/blog"),
  projects: createProjectCollection("./docs/en_us/projects"),
  zhCNBlog: createBlogCollection("./docs/zh_cn/blog"),
  zhCNProjects: createProjectCollection("./docs/zh_cn/projects"),
  zhTWBlog: createBlogCollection("./docs/zh_tw/blog"),
  zhTWProjects: createProjectCollection("./docs/zh_tw/projects"),
  jaJPBlog: createBlogCollection("./docs/ja_jp/blog"),
  jaJPProjects: createProjectCollection("./docs/ja_jp/projects"),
  ruBlog: createBlogCollection("./docs/ru/blog"),
  ruProjects: createProjectCollection("./docs/ru/projects"),
  esESBlog: createBlogCollection("./docs/es_es/blog"),
  esESProjects: createProjectCollection("./docs/es_es/projects"),
  ptPTBlog: createBlogCollection("./docs/pt_pt/blog"),
  ptPTProjects: createProjectCollection("./docs/pt_pt/projects"),
  frFRBlog: createBlogCollection("./docs/fr_fr/blog"),
  frFRProjects: createProjectCollection("./docs/fr_fr/projects"),
  arSABlog: createBlogCollection("./docs/ar_sa/blog"),
  arSAProjects: createProjectCollection("./docs/ar_sa/projects"),
};
export type BlogCollection = "blog" | "zhCNBlog" | "zhTWBlog" | "jaJPBlog" | "ruBlog" | "esESBlog" | "ptPTBlog" | "frFRBlog" | "arSABlog";
export type ProjectCollection = "projects" | "zhCNProjects" | "zhTWProjects" | "jaJPProjects" | "ruProjects" | "esESProjects" | "ptPTProjects" | "frFRProjects" | "arSAProjects";

