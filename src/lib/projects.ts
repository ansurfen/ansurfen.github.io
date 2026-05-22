import type { ProjectCollection } from "@/content.config";
import { getCollection } from "astro:content";

export async function getProjectPaths(collection: ProjectCollection) {
  const projects = await getCollection(collection);
  return projects.map(project => ({
    params: { projectId: project.id },
    props: { collection },
  }));
}