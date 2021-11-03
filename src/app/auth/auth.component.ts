import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../alert/alert.service';

import {
  ResponsePayload as AuthResponsePayload,
  AuthService,
} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;

  private auth$!: Observable<AuthResponsePayload>;
  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.form.valid) return;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.auth$ = this.authService.login(form.form.value);
    } else {
      this.auth$ = this.authService.signUp(form.form.value);
    }

    this.subscription = this.auth$.subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/quiz']);
      },
      (errorMsg) => {
        this.alertService.state.next({ type: 'red', msg: errorMsg });
        this.isLoading = false;
      }
    );

    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
