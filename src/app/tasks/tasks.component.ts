import { Component, OnInit, Input } from '@angular/core';

import { Tasks } from './shared/tasks.model';
import { TasksService } from './shared/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  tasks: Array<Tasks>;
  selectedTask: Tasks;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    // console.log(this.tasksService.getTasks());
    this.tasksService.getTasks()
      .subscribe(
        tasks => this.tasks = tasks,
        error => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
      );
   }

  onSelectedTask(task: Tasks) {
    this.selectedTask = task;
  }
}
