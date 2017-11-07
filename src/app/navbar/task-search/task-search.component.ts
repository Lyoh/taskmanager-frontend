import { Component } from '@angular/core';

import { TasksService } from '../../tasks/shared/tasks.service';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html'
})
export class TaskSearchComponent {
  constructor(private taskService: TasksService) { }
}
