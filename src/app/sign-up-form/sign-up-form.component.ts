import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { FormUtils } from './../shared/form.utils';
import { User } from './../shared/user.form';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-form.component.html'
})
export class SignUpFormComponent {
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

  public signUpUser() {
    // tslint:disable:curly
    this.authService.signUp(this.form.value as User)
      .subscribe(
        () => {
          alert('Sua conta foi criada com sucesso!');
          this.router.navigate(['/dashboard']);
          this.formErrors = null;
        },
        (errors) => {
          this.submitted = false;

          if (errors.status === 422)
            this.formErrors = JSON.parse(errors._body).errors.full_messages;
          else
            this.formErrors = ['Não foi possível processar a sua solicitação. Por favor, tente mais tarde.'];
        }
      );
  }

  public passwordConfirmationValidator(form: FormGroup) {
    // tslint:disable:curly
    if (form.get('password').dirty && (form.get('password').value === form.get('passwordConfirmation').value))
      form.get('passwordConfirmation').setErrors(null);
    else
      form.get('passwordConfirmation').setErrors({'mismatch': true});
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: [null, [Validators.required]]
    }, {
      validator: this.passwordConfirmationValidator
    });
  }
}
