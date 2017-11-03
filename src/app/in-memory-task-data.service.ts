import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryTaskDataService implements InMemoryDbService {

  public createDb() {
    let task = [
      { id: 1, title: 'Fazer Tarefa 001' },
      { id: 2, title: 'Fazer Tarefa 002' },
      { id: 3, title: 'Fazer Tarefa 003' },
      { id: 4, title: 'Fazer Tarefa 004' },
      { id: 5, title: 'Fazer Tarefa 005' },
      { id: 6, title: 'Fazer Tarefa 006' },
      { id: 7, title: 'Fazer Tarefa 007' }
    ];

    return { task };
  }
}
