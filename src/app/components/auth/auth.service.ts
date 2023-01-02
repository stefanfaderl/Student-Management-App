import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponseData } from 'src/app/shared/models/authResponseData';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) { }

  public getUserId() {
    const user: User = this.user.getValue();
    return user.id;
  }

  public signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        },
        )
      );
  }

  public login(email: string, password: string) {
    // set authentication firebase storage
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => this.angularFireAuth.authState
        .subscribe())
      .catch((error) => {
        console.log('StorageAuthError' + error.message);
      });

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  public autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || "{}");

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); // future date in ms - current date in ms = difference in expirationDuration
      this.autoLogout(expirationDuration);
    }
  }

  public logout() {
    this.angularFireAuth.signOut(); // logout authentication firebase storage
    this.user.next(null!);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number) { // in ms
    this.tokenExpirationTimer = setTimeout(() => {
      this.angularFireAuth.signOut();
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
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
