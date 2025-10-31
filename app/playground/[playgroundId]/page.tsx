"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { WebContainer } from "@webcontainer/api";
import React, { useEffect, useState } from "react";
import { MEditor } from "@/components/playground/editor/editor.component";
import { CustomWebContainer } from "@/components/playground/webcontainer/webcontainer.component";
import { WebPreview } from "@/components/playground/webPreview/webPreview.component";

interface Props {
  params: Promise<{ playgroundId: string }>;
}
export default function PlaygroundPage(props: Props) {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
  const params = React.use(props.params);

  useEffect(() => {
    const createWebContainer = async () => {
      const webContainerInstance = await WebContainer.boot();
      setWebContainer(webContainerInstance);
    };

    createWebContainer();

    // Ideally, we should clean up the WebContainer instance when the component is unmounted.
    // But there is an issue with the current implementation of WebContainer that prevents it from being torn down.
    // https://github.com/stackblitz/webcontainer-core/issues/1125
    // return () => {
    //   webContainer?.teardown();
    //   setWebContainer(null);
    // };
  }, []);
  return (
    <div className="text-white h-[100vh]">
      <PanelGroup direction="horizontal">
        <Panel>
          <PanelGroup direction="vertical">
            <Panel defaultSize={80}>
              <MEditor
                playgroundId={params.playgroundId}
                webContainer={webContainer as WebContainer}
              />
            </Panel>
            <PanelResizeHandle className="h-0.5 bg-stone-700" />
            <Panel defaultSize={20}>
              <CustomWebContainer webContainer={webContainer as WebContainer} />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-0.5 bg-stone-700" />
        <Panel defaultSize={30}>
          <WebPreview webContainer={webContainer as WebContainer} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
