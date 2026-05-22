import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { ProjectCollection } from "@/content.config";
import type { Locale } from "@/lib/i18n";
import { getListablePrivateProjectsByLocale } from "@/lib/private-manifest";
import type { PrivateManifestEntry } from "@/lib/private-manifest";

export type PublicListProject = {
  kind: "public";
  entry: CollectionEntry<ProjectCollection>;
};

export type PrivateListProject = {
  kind: "private";
  entry: Extract<PrivateManifestEntry, { kind: "projects" }>;
};

export type ListProject = PublicListProject | PrivateListProject;

export async function getMergedProjects(
  collection: ProjectCollection,
  locale: Locale,
): Promise<ListProject[]> {
  const publicProjects = await getCollection(collection);
  const privateProjects = getListablePrivateProjectsByLocale(locale);

  const merged: ListProject[] = [
    ...publicProjects.map(entry => ({ kind: "public" as const, entry })),
    ...privateProjects.map(entry => ({ kind: "private" as const, entry })),
  ];

  return merged.sort((a, b) =>
    getProjectName(a).localeCompare(getProjectName(b)),
  );
}

function getProjectName(project: ListProject): string {
  if (project.kind === "public") return project.entry.data.name;
  return project.entry.meta.name;
}

export function getProjectId(project: ListProject): string {
  return project.entry.id;
}

export function getProjectType(project: ListProject): "core" | "side" {
  if (project.kind === "public") return project.entry.data.type;
  return project.entry.meta.type;
}
