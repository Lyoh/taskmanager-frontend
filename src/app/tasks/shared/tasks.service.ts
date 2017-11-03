import { Http, Response } from '@angular/http';
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

  private handleErrors(errors: Response) {
    console.log('Tratar o erro capturado, ex.: gravar em um log de erros', errors);
    return Observable.throw(errors);
  }
}
