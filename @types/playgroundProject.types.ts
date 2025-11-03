import { Directory } from "@/components/playground/sidebarFileManager/utils/fileManager";
import { FileSystemTree } from "@/components/playground/webcontainer/webcontainer.types";

export interface PlaygroundProject {
  id: string;
  name: string;
  description?: string;
  userId: string;
  fileStructure: Directory | null;
  webContainerStructure: FileSystemTree | null;
  createdAt: string;
  updatedAt: string;
}
//   id        String   @id @default(cuid()) @map("_id")
//   userId    String
//   fileStructure Json
//   webContainerStructure Json
//   createdAt DateTime @default(now())
//   updatedAt DateTime @default(now())
