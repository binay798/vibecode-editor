"use client";

import Image from "next/image";
import { format } from "date-fns";
import type { Project, User } from "../types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MoreHorizontal,
  Edit3,
  Trash2,
  ExternalLink,
  Copy,
  Download,
  Eye,
} from "lucide-react";
import { MarkedToggleButton } from "./toggle-star";
import { projectServices } from "@/store/redux/projects/projects.service";
import { currentUser } from "@/features/auth/actions";
import { useDispatch, useSelector } from "@/store/hooks.store";
import { setProjectList } from "@/store/redux/projects/projects.slice";
import { PlaygroundProject } from "@/@types/playgroundProject.types";

interface ProjectTableProps {
  projects: Project[];
  onUpdateProject?: (
    id: string,
    data: { title: string; description: string }
  ) => Promise<void>;
  onDeleteProject?: (id: string) => Promise<void>;
  onDuplicateProject?: (id: string) => Promise<void>;
  onMarkasFavorite?: (id: string) => Promise<void>;
}

interface EditProjectData {
  title: string;
  description: string;
}

export default function ProjectTable() {
  const dispatch = useDispatch();
  const [curUser, setCurUser] = useState<User | null>(null);
  const { projectList } = useSelector((store) => store.projects);
  useEffect(() => {
    (async () => {
      try {
        if (curUser?.id) {
          const projectList = await projectServices.getProjectList(curUser.id);
          dispatch(setProjectList(projectList.projects));
        }
      } catch (err) {}
    })();
  }, [dispatch, curUser]);

  useEffect(() => {
    (async () => {
      try {
        const user = await currentUser();
        if (user) {
          // @ts-ignore
          setCurUser(user);
        }
      } catch {}
    })();
  }, []);

  const deleteProject = async (projectId: string) => {
    await projectServices.deleteProject(projectId);
    if (curUser) {
      const projectList = await projectServices.getProjectList(curUser.id);
      dispatch(setProjectList(projectList.projects));
    }
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList?.map((proj: PlaygroundProject, id) => {
              return (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <Link
                        href={`/playground/${proj.id}`}
                        className="hover:underline"
                      >
                        <span className="font-semibold">
                          {proj?.name ?? proj.id}
                        </span>
                      </Link>
                      <span className="text-sm text-gray-500 line-clamp-1">
                        {proj?.description ?? proj.userId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-[#E93F3F15] text-[#E93F3F] border-[#E93F3F]"
                    >
                      Template
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(proj.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={curUser?.image ?? "/placeholder.jpg"}
                          // alt={project.user.name}
                          alt="test"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">{curUser?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <MarkedToggleButton
                            markedForRevision={true}
                            // id={project.id}
                            id=""
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/playground`}
                            className="flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Open Project
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/playground`}
                            target="_blank"
                            className="flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {}}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        // onClick={() => copyProjectUrl(project.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteProject(proj?.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project details here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={""}
                onChange={
                  (e) => {}
                  // setEditData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={""}
                onChange={
                  (e) => {}
                  // setEditData((prev) => ({
                  //   ...prev,
                  //   description: e.target.value,
                  // }))
                }
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {}}
              disabled={false}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {}}
              // disabled={isLoading || !editData.title.trim()}
            >
              {false ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={false} onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete. This action cannot be undone. All
              files and data associated with this project will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={false}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {}}
              disabled={false}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {false ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
