import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';

import { Tasks } from './tasks.model';


@Injectable()
export  class TasksService {

  private taskUrl = 'tasks';

  public constructor(private tokenHttp: Angular2TokenService) {}
  // tslint:disable:prefer-const

  public getAll(): Observable<Tasks[]> {
    let url = `${this.taskUrl}?q[s]=updated_at+DESC`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTasks(response));
  }

  public getImportant(): Observable<Tasks[]> {
    let url = `${this.taskUrl}?q[s]=deadline+ASC`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTasks(response));
  }

  public getById(id: number): Observable<Tasks> {
    let url = `${this.taskUrl}/${id}`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.dataToTask(response.json().data));
  }

  public createTask(task: Tasks): Observable<Tasks> {
    let body = JSON.stringify(task);

    return this.tokenHttp.post(this.taskUrl, body)
      .catch(this.handleErrors)
      .map((response: Response) => this.dataToTask(response.json().data));
  }

  public update(task: Tasks): Observable<Tasks> {
    let url = `${this.taskUrl}/${task.id}`;
    let body = JSON.stringify(task);

    return this.tokenHttp.put(url, body)
      .catch(this.handleErrors)
      .map(() => task);
  }

  public delete(id: number): Observable<null> {
    let url = `${this.taskUrl}/${id}`;

    return this.tokenHttp.delete(url)
      .catch(this.handleErrors)
      .map(() => null);
  }

  public searchByTitle(term: string): Observable<Tasks[]> {
    let url = `${this.taskUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTasks(response));
  }

  // Metodos privados

  private handleErrors(errors: Response) {
    console.log('Tratar o erro capturado, ex.: gravar em um log de erros', errors);
    return Observable.throw(errors);
  }

  private responseToTasks(response: Response): Array<Tasks> {
    let tasks: Tasks[] = [];
    let collection = response.json().data as Array<any>;

    collection.forEach( data => tasks.push(this.dataToTask(data)) );

    return tasks;
  }

  private dataToTask(data: any): Tasks {
    let task = new Tasks(
      data.id,
      data.attributes.title,
      data.attributes.description,
      data.attributes.done,
      data.attributes.deadline
    );

    return task;
  }
}
