import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

import { User } from './user.form';

@Injectable()
export class AuthService {
  public user: User;
  constructor(
    private tokenService: Angular2TokenService
  ) { }

  public signUp(user: User): Observable<Response> {
    return this.tokenService.registerAccount(user as any)
      .catch(this.handleErrors);
  }

  public signIn(uid: string, password: string): Observable<Response> {
    // tslint:disable-next-line:prefer-const
    let signInData = {
      email: uid,
      password: password
    };

    return this.tokenService.signIn(signInData)
      .catch(this.handleErrors);
  }


  public signOut(): Observable<Response> {
    return this.tokenService.signOut()
      .catch(this.handleErrors);
  }

  public userSignedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  private handleErrors(errors: Response): Observable<Response> {
    console.log('Tratar o erro capturado, ex.: gravar em um log de erros', errors);
    return Observable.throw(errors);
  }
}
