import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../../core/services/auth.service';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit {

  total = 0;
  newTasks = 0;
  inProgress = 0;
  completed = 0;
  completedPercent = 0;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {

    try {

      const user = await this.authService.getCurrentUserAsync();

      if (!user) {
        console.log('Пользователь не найден.');
        return;
      }

      const snapshot = await this.taskService.getUserTasks(user.uid);

      const tasks: Task[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Task)
      }));

      this.total = tasks.length;

      this.newTasks = tasks.filter(
        task => task.status === 'new'
      ).length;

      this.inProgress = tasks.filter(
        task => task.status === 'in-progress'
      ).length;

      this.completed = tasks.filter(
        task => task.status === 'done'
      ).length;

      this.completedPercent =
        this.total === 0
          ? 0
          : Math.round((this.completed / this.total) * 100);

      this.cdr.detectChanges();

    } catch (error) {

      console.error('Ошибка при загрузке аналитики:', error);

    }

  }

}