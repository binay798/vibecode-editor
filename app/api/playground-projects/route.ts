import { getPlaygroundProjectsOfUser } from "@/components/playground/handlers/playground.handlers";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { fileStructure, webContainerStructure, userId } =
      await request.json();

    const project = await db.playgroundProjects.create({
      data: {
        fileStructure,
        webContainerStructure,
        userId,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("user_id");
    const projects = await getPlaygroundProjectsOfUser(userId as string);

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
