import { WebContainer } from "@webcontainer/api";

let webContainer: WebContainer | null = null;

export async function createWebcontainer() {
  if (!webContainer) {
    webContainer = await WebContainer.boot();
  }

  return webContainer;
}
