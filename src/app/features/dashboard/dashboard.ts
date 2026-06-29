import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Services
import { AuthService } from '../../core/services/auth.service';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  async loadStatistics(): Promise<void> {

    const user = await this.authService.getCurrentUserAsync();

    if (!user) {
      return;
    }

    try {

      const stats = await this.taskService.getStatistics(user.uid);

      this.totalTasks = stats.total;
      this.completedTasks = stats.completed;
      this.pendingTasks = stats.pending;

      this.cdr.detectChanges();

    } catch (error) {

      console.error('Dashboard error:', error);

    }

  }

  async logout(): Promise<void> {

    try {

      await this.authService.logout();

      this.router.navigate(['/login']);

    } catch (error) {

      console.error(error);

      alert('Ошибка при выходе из системы.');

    }

  }

  goToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  goToAnalytics(): void {
    this.router.navigate(['/analytics']);
  }

}