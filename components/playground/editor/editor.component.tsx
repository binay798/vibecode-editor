import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import Sidebar from "../sidebarFileManager/sidebar";
import { FileTree } from "../sidebarFileManager/fileTree.component";
import {
  Type,
  type Directory,
  type File,
} from "../sidebarFileManager/utils/fileManager";
import { useFilesFromSandbox } from "../sidebarFileManager/utils/useFileFromSandbox";
import { FileEditTab } from "../sidebarFileManager/components/fileEditTab/fileEditTab.component";
import { useDispatch, useSelector } from "../../../store/hooks.store";
import {
  addTabFile,
  setActiveFileReducer,
  setSelectedPlaygroundProject,
} from "../../../store/redux/editor/editor.slice";
import { getLanguageFromFileName } from "./utils/getLanguageFromFileName";
import { OpenedFilesTab } from "./components/openedFilesTab/openedFilesTab.component";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  setMonacoEditorCodeData,
  setWebContainerCodeData,
} from "../../../store/redux/codeData/codeData.slice";
import { convertRootToWebContainerFormat } from "../sidebarFileManager/utils/convertToWebContainerFormat";
import { addAbsolutePaths } from "../sidebarFileManager/utils/convertToSidebarFormat";
import type { WebContainer } from "@webcontainer/api";
import { PlaygroundProject } from "@/@types/playgroundProject.types";

const dummyDir: Directory = {
  id: "1",
  name: "loading...",
  type: Type.DUMMY,
  parentId: undefined,
  depth: 0,
  dirs: [],
  files: [],
  absolutePath: null,
};

interface Props {
  webContainer: WebContainer;
  playgroundId: string;
}
export function MEditor({ webContainer, playgroundId }: Props) {
  const [rootDir, setRootDir] = useState(dummyDir);
  const editor = useSelector((store) => store.editor);
  // const sidebarFormat = useSelector(
  //   (store) => store.codeData.monacoEditorCodeData
  // );
  const dispatch = useDispatch();
  // useFilesFromSandbox(playgroundId, (root) => {
  //   // if (!editor.activeFile) {
  //   //   const file = findFileByName(root, "index.tsx");
  //   //   if (file) {
  //   //     // dispatch(setActiveFileReducer(file));
  //   //   }
  //   // }

  //   dispatch(setMonacoEditorCodeData(JSON.parse(JSON.stringify(root))));
  //   const convertedWebContainerCodeData = convertRootToWebContainerFormat(
  //     JSON.parse(JSON.stringify(root))
  //   );
  //   dispatch(setWebContainerCodeData(convertedWebContainerCodeData));
  //   const x = addAbsolutePaths(root);
  //   setRootDir(x);
  // });
  useEffect(() => {
    (async () => {
      try {
        const playgroundProject = await fetch(
          `/api/playground-projects/${playgroundId}`,
          { method: "GET" }
        ).then((res) => res.json() as Promise<{ project: PlaygroundProject }>);
        dispatch(
          setSelectedPlaygroundProject(
            JSON.parse(JSON.stringify(playgroundProject.project))
          )
        );
        if (playgroundProject.project.fileStructure) {
          console.log(playgroundProject.project.fileStructure);
          const x = addAbsolutePaths(playgroundProject.project.fileStructure);
          setRootDir(x);
        }
        if (playgroundProject.project.webContainerStructure) {
          dispatch(
            setWebContainerCodeData(
              JSON.parse(
                JSON.stringify(playgroundProject.project.webContainerStructure)
              )
            )
          );
        }
      } catch {
        console.log("Error");
      }
    })();
  }, [playgroundId, dispatch]);

  const onSelect = (file: File) => {
    dispatch(addTabFile(file));
    dispatch(setActiveFileReducer(file));
  };
  const language = getLanguageFromFileName(
    editor.activeFile?.name ?? "index.html"
  );

  const handleCodeChange = async (content: string) => {
    // if (!webContainer) return;
    if (editor.activeFile?.absolutePath) {
      await webContainer?.fs.writeFile(
        editor.activeFile?.absolutePath,
        content
      );
    }
    // console.log(editor.activeFile, content);
  };

  return (
    <div className="h-full">
      <div className="flex gap-0 h-full">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20}>
            <div>
              <FileEditTab />
              <Sidebar>
                <FileTree
                  rootDir={rootDir}
                  // selectedFile={selectedFile as File}
                  selectedFile={editor.activeFile as File}
                  onSelect={onSelect}
                />
              </Sidebar>
            </div>
          </Panel>
          <PanelResizeHandle className="w-0.5 bg-stone-600" />
          <Panel>
            <div className="flex flex-col w-full h-full">
              <OpenedFilesTab />
              <Editor
                theme="vs-dark"
                height={"100%"}
                width={"100%"}
                value={editor.activeFile?.content ?? ""}
                language={language}
                options={{
                  minimap: { enabled: false },
                  renderValidationDecorations: "off",
                }}
                onChange={(value) => handleCodeChange(value || "")}
              />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
