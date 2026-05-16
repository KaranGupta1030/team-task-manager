"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) return { error: "Project name is required" };

  try {
    // CRITICAL: Verify user exists in current database (especially after a reset)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return { error: "Session expired or user not found. Please Sign Out and Sign In again." };
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: "OWNER",
          },
        },
      },
    });

    revalidatePath("/projects");
    revalidatePath("/dashboard");
    revalidatePath("/", "layout");
    
    return { success: true, project };
  } catch (error: any) {
    console.error("Project creation error:", error);
    if (error.code === 'P2003') {
      return { error: "Database consistency error. Please re-login to fix your session." };
    }
    return { error: "Failed to create project. Please try again." };
  }
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const project = await prisma.project.findUnique({
    where: { id },
    include: { members: true },
  });

  if (!project) return { error: "Project not found" };

  const isOwner = project.ownerId === session.user.id;
  if (!isOwner) return { error: "Only the project owner can delete the project" };

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/projects");
    revalidatePath("/dashboard");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete project" };
  }
}
