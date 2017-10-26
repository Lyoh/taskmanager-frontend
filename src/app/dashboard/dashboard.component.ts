import { Component, OnInit } from '@angular/core';

import { Tasks } from '../tasks/shared/tasks.model';
import { TasksService } from '../tasks/shared/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public tasks: Array<Tasks>;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.getImportantTasks().then((tasks) => { this.tasks = tasks; });
  }

}
