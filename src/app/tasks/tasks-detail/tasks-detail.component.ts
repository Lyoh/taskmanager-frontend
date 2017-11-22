import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.reactiveTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null, Validators.required],
      description: [null]
    });
   }

  ngOnInit(): void {
    this.task = new Tasks(null, null);

    this.subs = this.route.params
      .switchMap((params: Params) => this.tasksService.getById(+params['id']) )
      .subscribe(
        task => this.setTask(task),
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
    }).on('db.change', () => this.reactiveTaskForm.patchValue( { deadline: $('#deadline').val() } ));
  // }).on('db.change', () => this.reactiveTaskForm.get('deadline').setValue($('#deadline').val()));
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

  private setTask(task: Tasks) {
    this.reactiveTaskForm.patchValue(task);
  }

}
