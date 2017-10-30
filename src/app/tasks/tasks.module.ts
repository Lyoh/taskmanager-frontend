import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksComponent } from './tasks.component';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import { TasksService } from './shared/tasks.service';

@NgModule({
  imports: [
    CommonModule
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
