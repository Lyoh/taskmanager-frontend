import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';

import { Tasks } from '../shared/tasks.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './tasks-detail.component.html'
})
export class TasksDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  public reactiveTaskForm: FormGroup;

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
  ) {
    this.reactiveTaskForm = new FormGroup({
      title: new FormControl(null),
      deadline: new FormControl(null),
      done: new FormControl(null),
      description: new FormControl(null)
    });
   }

  ngOnInit(): void {
    this.task = new Tasks(null, null);

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

  ngAfterViewInit() {
    $('#deadline').datetimepicker({
      'sideBySide': true,
      'locale': 'pt-br'
    }).on('db.change', () => this.task.deadline = $('#deadline').val());
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

  public showFieldErrors(field): boolean {
    return field.invalid && (field.touched || field.dirty)
  }

}
