import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { Tasks } from './tasks.model';


@Injectable()
export  class TasksService {

  private taskUrl = 'api/tasks';

  public constructor(private http: Http) {}

  public getTasks(): Observable<Tasks[]> {
    return this.http.get(this.taskUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Tasks[]);
  }

  public getImportantTasks(): Observable<Tasks[]> {
    return this.getTasks()
      .catch(this.handleErrors)
      .map(tasks => tasks.slice(0, 3));
  }

  public getTask(id: number): Observable<Tasks> {
    let url = `${this.taskUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Tasks );
  }

  public createTask(task: Tasks): Observable<Tasks> {
    let body = JSON.stringify(task);
    let headers = new Headers({'Content-type': 'application/json'});

    return this.http.post(this.taskUrl, body, { headers: headers })
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Tasks);
  }

  public updateTask(task: Tasks): Observable<Tasks> {
    let url = `${this.taskUrl}/${task.id}`;
    let body = JSON.stringify(task);
    let headers = new Headers({'Content-type': 'application/json'});

    return this.http.put(url, body, { headers: headers})
      .catch(this.handleErrors)
      .map(() => task);
  }

  public deleteTask(id: number): Observable<null> {
    let url = `${this.taskUrl}/${id}`;
    let headers = new Headers({'Content-type': 'application/json'});

    return this.http.delete(url, { headers: headers})
      .catch(this.handleErrors)
      .map(() => null);
  }

  private handleErrors(errors: Response) {
    console.log('Tratar o erro capturado, ex.: gravar em um log de erros', errors);
    return Observable.throw(errors);
  }
}
