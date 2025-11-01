import { db } from "@/lib/db";
import { Directory } from "../sidebarFileManager/utils/fileManager";
import { FileSystemTree } from "../webcontainer/webcontainer.types";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { TEMPLATE_LIST } from "@/constants/templates.constants";

export function createPlaygroundProjectHandler(
  monacoEditorFileStructurePayload: Directory,
  webContainerFileStructurePayload: FileSystemTree,
  userId: string
) {
  // TODO: Get up to date monaco editor sidebar object format
  // TODO: Get up to date webcontainer files and folder structure
  // TODO: Get current user id
  return db.playgroundProjects.create({
    data: {
      fileStructure:
        monacoEditorFileStructurePayload as unknown as InputJsonValue,
      webContainerStructure: webContainerFileStructurePayload,
      userId,
    },
  });
}

export function getPlaygroundProjectsOfUser(userId: string) {
  return db.playgroundProjects.findMany({ where: { userId } });
}

export function deletePlaygroundProjectsOfUser(id: string) {
  return db.playgroundProjects.delete({ where: { id } });
}

export function getPlaygroundProjectById(id: string) {
  return db.playgroundProjects.findUnique({ where: { id } });
}

export function updatePlaygroundProject(
  id: string,
  monacoEditorFileStructure: object,
  webContainerObject: object
) {
  return db.playgroundProjects.update({
    where: { id },
    data: {
      fileStructure: monacoEditorFileStructure,
      webContainerStructure: webContainerObject,
    },
  });
}

export async function getRequiredCodeTemplate(id: string) {
  const templateName = TEMPLATE_LIST.filter((el) => el.id === id);
  return fetch(templateName[0].name)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
