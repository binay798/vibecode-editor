import {
  deletePlaygroundProjectsOfUser,
  getPlaygroundProjectById,
  updatePlaygroundProject,
} from "@/components/playground/handlers/playground.handlers";
import { Params } from "next/dist/server/request/params";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const { playgroundProjectId } = params;
    const { webContainerObject, monacoEditorFileStructure } =
      await request.json();
    const project = await updatePlaygroundProject(
      playgroundProjectId as string,
      monacoEditorFileStructure,
      webContainerObject
    );

    return NextResponse.json({ success: true, project });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { playgroundProjectId } = params;
    const project = await getPlaygroundProjectById(
      playgroundProjectId as string
    );

    return NextResponse.json({ success: true, project });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to get project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { playgroundProjectId } = params;
    await deletePlaygroundProjectsOfUser(playgroundProjectId as string);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
