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
  private headers = new Headers({'Content-type': 'application/json'});

  public constructor(private http: Http) {}

  public getAll(): Observable<Tasks[]> {
    return this.http.get(this.taskUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Tasks[]);
  }

  public getImportant(): Observable<Tasks[]> {
    return this.getAll()
      .catch(this.handleErrors)
      .map(tasks => tasks.slice(0, 3));
  }

  public getById(id: number): Observable<Tasks> {
    let url = `${this.taskUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Tasks );
  }

  public createTask(task: Tasks): Observable<Tasks> {
    let body = JSON.stringify(task);

    return this.http.post(this.taskUrl, body, { headers: this.headers })
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Tasks);
  }

  public update(task: Tasks): Observable<Tasks> {
    let url = `${this.taskUrl}/${task.id}`;
    let body = JSON.stringify(task);

    return this.http.put(url, body, { headers: this.headers})
      .catch(this.handleErrors)
      .map(() => task);
  }

  public delete(id: number): Observable<null> {
    let url = `${this.taskUrl}/${id}`;

    return this.http.delete(url, { headers: this.headers})
      .catch(this.handleErrors)
      .map(() => null);
  }

  public searchByTitle(term: string): Observable<Tasks[]> {
    let url = `${this.taskUrl}?title=${term}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Tasks[] );
  }

  private handleErrors(errors: Response) {
    console.log('Tratar o erro capturado, ex.: gravar em um log de erros', errors);
    return Observable.throw(errors);
  }
}
