import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksDetailComponent } from './tasks/tasks-detail/tasks-detail.component';

const APP_ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sign-in', component: SignInFormComponent },
  { path: 'sign-up', component: SignUpFormComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TasksDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
