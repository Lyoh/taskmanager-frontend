import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';

import { Tasks } from '../shared/tasks.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './tasks-detail.component.html'
})
export class TasksDetailComponent implements OnInit, OnDestroy {

  task: Tasks;
  doneOptions: Array<any> = [
    { value: false, text: 'Pendente' },
    { value: true, text: 'Concluída' }
  ];

  subs: Subscription;
  id: number;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.subs = this.route.params
                  .switchMap((params: Params) => this.tasksService.getById(+params['id']) )
                  .subscribe(
                    task => this.task = task,
                    error => alert('Tarefa não encontrada')
                  );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * goBack
   */
  public goBack() {
    this.location.back();
  }

  public updateTask() {
    this.tasksService.update(this.task)
      .subscribe(
        () => alert('Tarefa atualizada com sucesso!!'),
        () => alert('Erro no servidor, tente novamente mais tarde!')
      );
  }

}
