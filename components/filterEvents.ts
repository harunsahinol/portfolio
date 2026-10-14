import type { LayerId } from "@/data";

// The hero callouts and the projects list live in separate client trees,
// so a callout click reaches the list through a window event.
export const FILTER_EVENT = "projects:filter";

export function filterProjects(layer: LayerId | "all") {
  window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: layer }));
}
