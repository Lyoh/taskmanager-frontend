import { Component, OnInit, Input } from '@angular/core';

import { Tasks } from '../shared/tasks.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './tasks-detail.component.html'
})
export class TasksDetailComponent implements OnInit {

  @Input()task: Tasks;

  constructor() { }

  ngOnInit(): void { }
}
