import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Operator } from 'rxjs/Rx';

import { Tasks } from '../shared/tasks.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './tasks-detail.component.html'
})
export class TasksDetailComponent implements OnInit, OnDestroy {

  @Input()task: Tasks;

  subs: Subscription;
  id: number;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subs = this.route.params
                  .switchMap((params: Params) => this.tasksService.getTask(+params['id']) )
                  .subscribe(task => this.task = task);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
