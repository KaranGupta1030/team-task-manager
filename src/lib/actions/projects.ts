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
    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: "ADMIN",
          },
        },
      },
    });

    revalidatePath("/projects");
    return { success: true, project };
  } catch (error) {
    return { error: "Failed to create project" };
  }
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  // Check if owner or admin
  const project = await prisma.project.findUnique({
    where: { id },
    include: { members: true },
  });

  if (!project) return { error: "Project not found" };

  const isOwner = project.ownerId === session.user.id;
  const isAdmin = project.members.some(
    (m) => m.userId === session.user.id && m.role === "ADMIN"
  );

  if (!isOwner && !isAdmin) return { error: "Forbidden" };

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete project" };
  }
}
