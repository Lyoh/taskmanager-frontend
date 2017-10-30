import { Injectable } from '@angular/core';

import { Tasks } from './tasks.model';

const TASKS: Array<Tasks> = [
  { id: 1, title: 'Fazer Tarefa 001' },
  { id: 2, title: 'Fazer Tarefa 002' },
  { id: 3, title: 'Fazer Tarefa 003' },
  { id: 4, title: 'Fazer Tarefa 004' },
  { id: 5, title: 'Fazer Tarefa 005' },
  { id: 6, title: 'Fazer Tarefa 006' },
  { id: 7, title: 'Fazer Tarefa 007' }
];

@Injectable()
export  class TasksService {

  private tasks: Array<Tasks> = TASKS;

  /**
   * getTaks
 : Array<Tasks>  */
  public getTasks(): Promise<Tasks[]> {
    let promise = new Promise<Tasks[]>(
      (resolve, reject) => {
        if (this.tasks.length > 0) {
          resolve(this.tasks);
        } else {
          reject('Nenhuma tarefa encontrada!');
        }
      }
    );

    return promise;
  }

  /**
   * getImportantTasks
 : Promise<Tasks[]>  */
  public getImportantTasks(): Promise<Tasks[]> {
    return Promise.resolve(this.tasks.slice(0, 3));
  }

  /**
   * getTask
  id: number : Promise<Tasks>  */
  public getTask(id: number): Promise<Tasks> {
    return this.getTasks()
      .then(tasks => tasks.find(task => task.id === id));
  }
}
