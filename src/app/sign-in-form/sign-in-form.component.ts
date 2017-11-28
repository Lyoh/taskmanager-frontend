import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormUtils } from './../shared/form.utils';

import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-form.component.html'
})
export class SignInFormComponent {
  public form: FormGroup;
  public formUtils: FormUtils;
  public submitted: boolean;
  public formErrors: Array<string>;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.setupForm();

    this.formUtils = new FormUtils(this.form);
    this.submitted = false;
    this.formErrors = null;
  }

  public signInUser() {
    // tslint:disable:curly
    this.authService.signIn(this.form.get('email').value, this.form.get('password').value)
      .subscribe(
        () => {
          alert('Sua conta foi criada com sucesso!');
          this.router.navigate(['/dashboard']);
          this.formErrors = null;
        },
        (errors) => {
          this.submitted = false;

          if (errors.status === 401)
            this.formErrors = JSON.parse(errors._body).errors;
          else
            this.formErrors = ['Não foi possível processar a sua solicitação. Por favor, tente novamente mais tarde.'];
        }
      );
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
}