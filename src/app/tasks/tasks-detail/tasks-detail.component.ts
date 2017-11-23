import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';

import { FormUtils } from '../../shared/form.utils';
import { Tasks } from '../shared/tasks.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './tasks-detail.component.html',
  styles: ['.form-control-feedback{margin-right:20px}']
})
export class TasksDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  public form: FormGroup;
  public formUtils: FormUtils;

  task: Tasks;
  doneOptions: Array<any>;
  subs: Subscription;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.doneOptions = [
      { value: false, text: 'Pendente' },
      { value: true, text: 'Concluída' }
    ];

    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null, Validators.required],
      description: [null]
    });

    this.formUtils = new FormUtils(this.form);
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

  public ngAfterViewInit(){
    $('#deadline').datetimepicker({
      'sideBySide': true,
      'locale': 'pt-br'
    }).on('dp.change', () => this.form.get('deadline').setValue( $('#deadline').val() ));
  }

  public goBack() {
    this.location.back();
  }

  public updateTask() {
    this.task.title = this.form.get('title').value;
    this.task.deadline = this.form.get('deadline').value;
    this.task.done = this.form.get('done').value;
    this.task.description = this.form.get('description').value;

    this.tasksService.update(this.task)
      .subscribe(
        () => alert('Tarefa atualizada com sucesso!!'),
        () => alert('Erro no servidor, tente novamente mais tarde!')
      );
  }

  private setTask(task: Tasks) {
    this.task = task;
    this.form.patchValue(task);
  }
}
