import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private taskService: TaskService) {}

  async loadTasks(userId: string): Promise<void> {

    this.loadingSubject.next(true);

    try {

      const snapshot = await this.taskService.getUserTasks(userId);

      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Task)
      }));

      this.tasksSubject.next(tasks);

    } finally {

      this.loadingSubject.next(false);

    }

  }

  async createTask(task: Task): Promise<void> {

    await this.taskService.addTask(task);

    await this.loadTasks(task.userId);

  }

  async updateTask(id: string, task: Partial<Task>, userId: string): Promise<void> {

    await this.taskService.updateTask(id, task);

    await this.loadTasks(userId);

  }

  async deleteTask(id: string, userId: string): Promise<void> {

    await this.taskService.deleteTask(id);

    await this.loadTasks(userId);

  }

}