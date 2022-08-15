import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponseData } from 'src/app/shared/models/authResponseData';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8DVWmYUc1eXKqj2QwGm5dIgZ4m_aUXJ0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError));
  }

  public login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8DVWmYUc1eXKqj2QwGm5dIgZ4m_aUXJ0 ',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {

    let errorMessage = 'Es ist ein Fehler aufgetreten!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Diese E-Mailadresse existiert bereits!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Die eingegebene E-Mailadresse ist falsch!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Das eingegebene Passwort ist falsch!';
        break;
    }
    return throwError(errorMessage);
  }
}
