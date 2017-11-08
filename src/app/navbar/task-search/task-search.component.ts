import { Component } from '@angular/core';

import { TasksService } from '../../tasks/shared/tasks.service';
import { Tasks } from '../../tasks/shared/tasks.model';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent {
  constructor(private taskService: TasksService) { }

  public search(term: string) {
    console.log(term);
  }
}
