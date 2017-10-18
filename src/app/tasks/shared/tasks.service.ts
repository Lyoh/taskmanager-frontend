import { Injectable } from '@angular/core';

import { Tasks } from './tasks.model';

const TASKS: Array<Tasks> = [
  { id: 1, title: 'Fazer Tarefa 001' },
  { id: 2, title: 'Fazer Tarefa 002' },
  { id: 3, title: 'Fazer Tarefa 003' },
  { id: 4, title: 'Fazer Tarefa 004' },
  { id: 5, title: 'Fazer Tarefa 005' }
];

@Injectable()
export  class TasksService {

  /**
   * getTaks
 : Array<Tasks>  */
  public getTaks(): Array<Tasks> {
    return TASKS;
  }
}
