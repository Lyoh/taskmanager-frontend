import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TasksService } from '../../tasks/shared/tasks.service';
import { Tasks } from '../../tasks/shared/tasks.model';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {
  public searchTerms: Subject<string> = new Subject();
  public tasks: Array<Tasks> = [];

  constructor(private taskService: TasksService, private router: Router) { }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public ngOnInit() {
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.taskService.searchByTitle(term) : Observable.of<Tasks[]>([]) )
      .subscribe(tasks => this.tasks = tasks);
  }

  public gotoTask(task: Tasks) {
    this.tasks = [];
    this.router.navigate(['/tasks', task.id]);
  }
}

