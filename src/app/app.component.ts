import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'quiz-time';
  isAuthenticated = false;
  userEmail: string | undefined;

  private subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.userEmail = user?.email;
    });
    this.authService.autoLogin();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
