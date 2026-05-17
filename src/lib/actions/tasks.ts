"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const projectId = formData.get("projectId") as string;
  const assigneeId = formData.get("assigneeId") as string;
  const priority = (formData.get("priority") as string) || "MEDIUM";
  const dueDate = formData.get("dueDate") ? new Date(formData.get("dueDate") as string) : null;

  if (!title || !projectId) return { error: "Title and Project are required" };

  try {
<<<<<<< HEAD
    // Verify user exists in current DB
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return { error: "Session expired or user not found. Please Sign Out and Sign In again." };
    }

=======
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a
    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assigneeId: assigneeId || null,
        createdById: session.user.id,
        priority,
        dueDate,
      },
    });

    revalidatePath(`/projects/${projectId}`);
    return { success: true, task };
  } catch (error) {
    return { error: "Failed to create task" };
  }
}

export async function updateTaskStatus(taskId: string, status: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    revalidatePath(`/projects/${task.projectId}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to update status" };
  }
}
