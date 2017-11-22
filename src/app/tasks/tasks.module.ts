import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app.routing.module';
import { TasksComponent } from './tasks.component';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import { TasksService } from './shared/tasks.service';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TasksComponent,
    TasksDetailComponent
  ],
  providers: [
    TasksService
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule { }
