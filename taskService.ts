// taskService.ts
// A small Task Manager service in TypeScript
// This file could easily fit into a backend or frontend project.

type TaskStatus = "pending" | "in-progress" | "completed";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

class TaskService {
  private tasks: Task[] = [];

  constructor(initial?: Task[]) {
    if (initial) this.tasks = initial;
  }

  // Create a new task
  createTask(title: string, description?: string): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  // Get all tasks or filter by status
  getTasks(status?: TaskStatus): Task[] {
    return status ? this.tasks.filter((t) => t.status === status) : this.tasks;
  }

  // Update task status
  updateStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new Error("Task not found");
    task.status = newStatus;
    task.updatedAt = new Date();
    return task;
  }

  // Delete a task
  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  // Simulate async database sync
  async syncToDatabase(): Promise<void> {
    console.log("Syncing tasks to database...");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log(`${this.tasks.length} tasks synced successfully ✅`);
  }
}

// Example usage (for testing or demo)
(async () => {
  const service = new TaskService();

  const t1 = service.createTask("Finish portfolio website", "Update UI animations");
  const t2 = service.createTask("Review PR #42", "Check comments on the API changes");
  service.updateStatus(t1.id, "in-progress");

  console.log("\n📋 Current Tasks:");
  console.table(service.getTasks());

  await service.syncToDatabase();
})();
