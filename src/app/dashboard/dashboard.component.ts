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
    this.tasksService.getImportant()
      .subscribe(
        tasks =>  this.tasks = tasks,
        error => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
      );
  }

}
