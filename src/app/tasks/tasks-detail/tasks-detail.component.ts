import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';

import { Tasks } from '../shared/tasks.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './tasks-detail.component.html',
  styles: [".form-control-feedback{margin-right:20px}"]
})
export class TasksDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  public reactiveTaskForm: FormGroup;

  task: Tasks;
  doneOptions: Array<any>;

  subs: Subscription;
  id: number;

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

  public ngAfterViewInit(){
    $("#deadline").datetimepicker({
      'sideBySide': true,
      'locale': 'pt-br'
    }).on('dp.change', ()=> this.reactiveTaskForm.get('deadline').setValue( $("#deadline").val() ));
  }

  public goBack() {
    this.location.back();
  }

  public updateTask() {
    this.task.title = this.reactiveTaskForm.get('title').value;
    this.task.deadline = this.reactiveTaskForm.get('deadline').value;
    this.task.done = this.reactiveTaskForm.get('done').value;
    this.task.description = this.reactiveTaskForm.get('description').value;

    this.tasksService.update(this.task)
      .subscribe(
        () => alert('Tarefa atualizada com sucesso!!'),
        () => alert('Erro no servidor, tente novamente mais tarde!')
      );
  }

  public showFieldErrors(fieldName: string): boolean {
    let field = this.getField(fieldName);
    return field.invalid && (field.touched || field.dirty);
  }

  public getFieldClass(fieldName: string) {
    return {
      'has-error': this.showFieldErrors(fieldName),
      'has-success': this.getField(fieldName).valid
    };
  }

  public getIconClass(fieldName: string) {
    return {
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-remove': this.showFieldErrors(fieldName),
      'glyphicon-ok': this.getField(fieldName).valid
    };
  }

  public getField(fieldName: string) {
    return this.reactiveTaskForm.get(fieldName);
  }

  private setTask(task: Tasks) {
    this.task = task;
    this.reactiveTaskForm.patchValue(task);
  }
}
