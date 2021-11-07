import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { ScoreboardService } from '../scoreboard/scoreboard.service';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';
import { PaginationControlsDirective } from 'ngx-pagination';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [fadeAnimation],
})
export class QuizComponent implements OnInit, OnDestroy, AfterViewInit {
  quizs: Quiz[] = [];
  user: User | null = null;
  isLoading = false;
  userResponses: { [key: string]: string } = {};
  @ViewChild('p') pApi: PaginationControlsDirective;
  @ViewChild('quizForm') quizForm: NgForm;

  config = {
    id: 'quiz',
    itemsPerPage: 1,
    currentPage: 1,
  };

  private authSubscription!: Subscription;
  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private scoreboardService: ScoreboardService,
    private alertService: AlertService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.quizs = this.quizService.quizs;
    this.authSubscription = this.authService.user.subscribe(
      (user) => (this.user = user)
    );
  }

  ngAfterViewInit() {
    const userResponses = this.quizService.getFromLS('userResponses');
    const currentPage = this.quizService.getFromLS('currentPage', false)!;
    if (userResponses && currentPage) {
      this.userResponses = userResponses;
      this.pApi.setCurrent(Number(currentPage));
    }
    this.cd.detectChanges();
  }

  onSubmit(form: NgForm) {
    if (!form.form.valid) return;
    this.userResponses = Object.assign(this.userResponses, form.value);
    this.quizService.storeToLS('userResponses', this.userResponses);
    this.quizService.storeToLS('currentPage', this.pApi.getCurrent() + 1);

    this.pApi.next();

    if (this.pApi.isLastPage()) {
      this.isLoading = true;
      localStorage.removeItem('userResponses');
      localStorage.removeItem('currentPage');
      const score = this.quizService.calculateScore(this.userResponses);
      this.subscription = this.quizService
        .storeScore(this.user!.localId, this.user!.email, score)
        .subscribe(
          () => {
            this.quizService
              .getScoreboard(this.user!.email)
              .subscribe((res) => {
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
      this.pApi.setCurrent(1);
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }
}
