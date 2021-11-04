import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AUTH_ERROR_MESSAGES } from './errors';
import { User } from './user.model';

interface RequestBodyPayload {
  email: string;
  password: string;
}

export interface ResponsePayload {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`;
  private timeoutId: any = null;
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(body: RequestBodyPayload) {
    return this.makeAuthReq(this.signUpUrl, body);
  }

  login(body: RequestBodyPayload) {
    return this.makeAuthReq(this.signInUrl, body);
  }

  autoLogin() {
    const user = localStorage.getItem('user');
    if (!user) return;
    const userObj = JSON.parse(user) as User;
    const { email, localId, idToken } = userObj;
    const tokenExpirationDate = new Date(userObj.tokenExpirationDate);
    const loadedUser = new User(email, localId, idToken, tokenExpirationDate);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(tokenExpirationDate.getTime() - new Date().getTime());
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }

  private autoLogout(timeout: number) {
    this.timeoutId = setTimeout(() => {
      this.logout();
    }, timeout);
  }

  private getExpirationDate(expiresIn: number): Date {
    return new Date(new Date().getTime() + expiresIn * 1000);
  }

  private makeAuthReq(url: string, body: RequestBodyPayload) {
    return this.http
      .post<ResponsePayload>(url, { ...body, returnSecureToken: true })
      .pipe(
        catchError(this.handleError),
        tap(({ email, localId, idToken, expiresIn }) => {
          const tokenExpirationDate = this.getExpirationDate(+expiresIn);
          const user = new User(email, localId, idToken, tokenExpirationDate);
          this.user.next(user);
          this.autoLogout(+expiresIn * 1000);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  private handleError(err: HttpErrorResponse) {
    let message = "Une erreur inconnue s'est produite !";
    for (const [key, value] of Object.entries(AUTH_ERROR_MESSAGES)) {
      switch (err.error?.error?.message) {
        case key:
          message = value;
          break;
      }
    }
    return throwError(message);
  }
}
