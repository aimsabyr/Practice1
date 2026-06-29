import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Task } from '../../../models/task.model';
import { AuthService } from '../../../core/services/auth.service';
import { TasksStoreService } from '../../../core/services/tasks-store.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  searchText = '';
  selectedStatus = 'all';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: TasksStoreService
  ) {}

  async ngOnInit(): Promise<void> {

    const user = await this.authService.getCurrentUserAsync();

    if (!user) {
      return;
    }

    this.store.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks();
    });

    await this.store.loadTasks(user.uid);

  }

  addTask(): void {
    this.router.navigate(['/tasks/add']);
  }

  editTask(id: string): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  async deleteTask(id: string): Promise<void> {

    if (!confirm('Вы действительно хотите удалить эту задачу?')) {
      return;
    }

    const user = await this.authService.getCurrentUserAsync();

    if (!user) {
      return;
    }

    try {

      await this.store.deleteTask(id, user.uid);

    } catch (error) {

      console.error(error);

      alert('Не удалось удалить задачу.');

    }

  }

  filterTasks(): void {

    this.filteredTasks = this.tasks.filter(task => {

      const matchTitle =
        task.title.toLowerCase().includes(this.searchText.toLowerCase());

      const matchStatus =
        this.selectedStatus === 'all' ||
        task.status === this.selectedStatus;

      return matchTitle && matchStatus;

    });

  }

  getStatus(status: string): string {

    switch (status) {

      case 'new':
        return 'Новая';

      case 'in-progress':
        return 'В процессе';

      case 'done':
        return 'Выполнена';

      default:
        return status;

    }

  }

}