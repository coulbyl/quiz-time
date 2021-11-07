import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { computingQuiz } from './computing-quiz';
import { englishQuiz } from './english-quiz';
import { mythologyQuiz } from './mythology-quiz';
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
  config = { id: 'quiz', itemsPerPage: 1, currentPage: 1 };
  quizRubrics = ['Informatique', 'Anglais', 'Mythologie'];
  activeRubric: string = 'Informatique';
  time = 0;

  private subscription: Subscription;
  private quizSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quizSubscription = this.quizService.quizs.subscribe(
      (quizs) => (this.quizs = quizs)
    );
    this.subscription = this.authService.user.subscribe(
      (user) => (this.user = user)
    );
  }

  onRubricChange(rubric: string, p: PaginationControlsDirective) {
    switch (rubric) {
      case 'Anglais':
        this.quizService.quizs.next(englishQuiz);
        this.activeRubric = rubric;
        break;
      case 'Mythologie':
        this.quizService.quizs.next(mythologyQuiz);
        this.activeRubric = rubric;
        break;
      default:
        this.quizService.quizs.next(computingQuiz);
        this.activeRubric = 'Informatique';
        break;
    }
    p.setCurrent(1);
    localStorage.removeItem('userResponses');
    localStorage.removeItem('currentPage');
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    this.quizSubscription.unsubscribe();
  }
}
