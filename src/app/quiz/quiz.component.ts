import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { ScoreboardService } from '../scoreboard/scoreboard.service';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  quizs: Quiz[] = [];
  user: User | null = null;
  isLoading = false;

  private authSubscription!: Subscription;
  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private scoreboardService: ScoreboardService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.quizs = this.quizService.quizs;
    this.authSubscription = this.authService.user.subscribe(
      (user) => (this.user = user)
    );
  }

  onSubmit(form: NgForm) {
    if (!form.form.valid) return;
    this.isLoading = true;
    const score = this.quizService.calculateScore(form.form.value);
    this.subscription = this.quizService
      .storeScore(this.user!.localId, this.user!.email, score)
      .subscribe(
        () => {
          this.quizService.getScoreboard(this.user!.email).subscribe((res) => {
            this.scoreboardService.scoreboard.next(res);
            this.isLoading = false;
            this.scoreboardService.open.next(true);
          });
        },
        () => {
          this.isLoading = false;
          this.alertService.state.next({
            type: 'red',
            msg: 'Erreur de serveur ! Veuillez vérifier votre connexion.',
          });
        }
      );
    this.onClearForm(form);
  }

  onClearForm(form: NgForm) {
    form.reset();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }
}
