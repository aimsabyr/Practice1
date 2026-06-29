import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { Analytics } from './features/analytics/analytics';

import { TaskForm } from './features/tasks/task-form/task-form';
import { TaskList } from './features/tasks/task-list/task-list';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
  path: 'analytics',
  component: Analytics,
  canActivate: [authGuard]
},

  {
    path: 'tasks',
    component: TaskList,
    canActivate: [authGuard]
  },

  {
    path: 'tasks/add',
    component: TaskForm,
    canActivate: [authGuard]
  },

  {
    path: 'tasks/edit/:id',
    component: TaskForm,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];