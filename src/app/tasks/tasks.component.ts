import { Component, OnInit } from '@angular/core';

import { Tasks } from './shared/tasks.model';


const TASKS: Array<Tasks> = [
  { id: 1, title: 'Tarefa 1' },
  { id: 2, title: 'Tarefa 2' },
  { id: 3, title: 'Tarefa 3' },
  { id: 4, title: 'Tarefa 4' },
  { id: 5, title: 'Tarefa 5' }
];

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  tasks: any;
  
  constructor() {
    this.tasks = TASKS;
   }

  ngOnInit() { }

}