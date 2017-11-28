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
    // call angular2-token signin method here!
    // Returns an Observable<Response>
    return null;
  }


  public signOut(): Observable<Response> {
    // call angular2-token signOut method here!
    // Returns an Observable<Response>
    return null;
  }

  public userSignedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  private handleErrors(errors: Response): Observable<Response> {
    console.log('Tratar o erro capturado, ex.: gravar em um log de erros', errors);
    return Observable.throw(errors);
  }
}
