import { Component, OnInit, Input } from '@angular/core';

import { Tasks } from './shared/tasks.model';
import { TasksService } from './shared/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  tasks: Array<Tasks>;
  newTask: Tasks;

  constructor(private tasksService: TasksService) {
    this.newTask = new Tasks(null, '');
  }

  ngOnInit() {
    this.tasksService.getAll()
      .subscribe(
        tasks => this.tasks = tasks.sort((a, b) => b.id - a.id ),
        error => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
      );
   }

   createTask() {
    this.newTask.title = this.newTask.title.trim();

    if (!this.newTask.title) {
      alert('A tafera deve ter um título');
    } else {
      this.tasksService.createTask(this.newTask)
        .subscribe(
          (task: Tasks) => {
            this.tasks.unshift(task);
            this.newTask = new Tasks(null, '');
          },
          () => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
        );
    }
   }

   deleteTask(task: Tasks) {
     if (confirm(`Deseja realmente excluir a tarefa "${task.title}"`)) {
       this.tasksService.delete(task.id)
        .subscribe(
          () => this.tasks = this.tasks.filter(t => t !== task),
          () => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
        );
     }
   }
}
