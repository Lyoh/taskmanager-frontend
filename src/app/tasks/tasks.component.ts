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
    this.tasksService.getTaks()
      .then(function(tasks){
        this.tasks = tasks;
      })
      .catch(function(error_msg){
        console.log(error_msg);
      }
    );
   }

  onSelectedTask(task: Tasks) {
    this.selectedTask = task;
  }
}
