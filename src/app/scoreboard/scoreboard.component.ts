import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
import { QuizService } from '../quiz/quiz.service';
import { ScoreBoard } from './scoreboard.model';
import { ScoreboardService } from './scoreboard.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  quizLength = 0;
  @Input() isAuthenticated = false;
  @Input() userEmail!: string;
  isOpen = false;
  scoreBoard!: ScoreBoard;

  private subscription: Subscription;
  private quizSubscription: Subscription;

  constructor(
    private quizservice: QuizService,
    private scoreboardService: ScoreboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizSubscription = this.quizservice.quizs.subscribe(
      (quizs) => (this.quizLength = quizs.length)
    );

    this.subscription = merge(
      this.scoreboardService.open,
      this.scoreboardService.scoreboard
    ).subscribe((res) => {
      if (typeof res === 'object') {
        this.scoreBoard = res;
      } else {
        this.isOpen = res;
      }
    });
  }

  onRetry() {
    this.scoreboardService.open.next(false);
  }

  onQuit() {
    this.scoreboardService.open.next(false);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.quizSubscription.unsubscribe();
  }
}
