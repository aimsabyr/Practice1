import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

// Services
import { TaskService } from '../../../core/services/task.service';
import { TasksStoreService } from '../../../core/services/tasks-store.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {

  taskForm: FormGroup;

  taskId: string | null = null;

  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private store: TasksStoreService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['new', Validators.required]
    });

  }

  ngOnInit(): void {

    this.taskId = this.route.snapshot.paramMap.get('id');

    if (this.taskId) {

      this.isEdit = true;

      this.loadTask();

    }

  }

  async loadTask(): Promise<void> {

    if (!this.taskId) {
      return;
    }

    const taskDoc = await this.taskService.getTask(this.taskId);

    if (taskDoc.exists()) {

      const data: any = taskDoc.data();

      this.taskForm.patchValue({
        title: data.title,
        description: data.description,
        status: data.status
      });

    }

  }

  async saveTask(): Promise<void> {

    if (this.taskForm.invalid) {
      return;
    }

    const user = await this.authService.getCurrentUserAsync();

    if (!user) {
      return;
    }

    const task: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status,
      createdAt: new Date(),
      userId: user.uid
    };

    try {

      if (this.isEdit && this.taskId) {

        await this.store.updateTask(
          this.taskId,
          task,
          user.uid
        );

        alert('Задача успешно обновлена.');

      } else {

        await this.store.createTask(task);

        alert('Задача успешно создана.');

      }

      this.router.navigate(['/tasks']);

    } catch (error) {

      console.error(error);

      alert('Ошибка при сохранении задачи.');

    }

  }

}