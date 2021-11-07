import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  PaginationControlsDirective,
  PaginationInstance,
} from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';
import { fadeListAnimation } from 'src/app/animations';
import { User } from 'src/app/auth/user.model';
import { ScoreboardService } from 'src/app/scoreboard/scoreboard.service';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
  animations: [fadeListAnimation],
})
export class QuizFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() questions: Quiz[] = [];
  @Input() user: User | null = null;
  @Input() config: PaginationInstance;
  @Input() pApi: PaginationControlsDirective;
  @ViewChild('quizForm') quizForm: NgForm;

  isLoading = false;
  userResponses: { [key: string]: string } = {};

  private subscription: Subscription;

  constructor(
    private quizService: QuizService,
    private scoreboardService: ScoreboardService,
    private alertService: AlertService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

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
    this.handleUserResponses(form.value);
    this.pApi.next();
    if (this.pApi.isLastPage()) {
      const score = this.startingSubmitAndGetScore;
      this.subscription = this.quizService
        .storeScore(this.user!.localId, this.user!.email, score)
        .subscribe(
          () => this.handleEndOfQuiz(),
          () => this.handleQuizError()
        );
      this.pApi.setCurrent(1);
    }
  }

  private handleUserResponses(value: any) {
    this.userResponses = Object.assign(this.userResponses, value);
    this.quizService.storeToLS('userResponses', this.userResponses);
    this.quizService.storeToLS('currentPage', this.pApi.getCurrent() + 1);
  }

  private handleEndOfQuiz() {
    this.quizService.getScoreboard(this.user!.email).subscribe((res) => {
      this.scoreboardService.scoreboard.next(res);
      this.isLoading = false;
      this.scoreboardService.open.next(true);
    });
  }

  private handleQuizError() {
    this.isLoading = false;
    this.alertService.state.next(
      `Erreur de serveur ! Veuillez vérifier votre connexion.`
    );
  }

  private get startingSubmitAndGetScore() {
    this.isLoading = true;
    localStorage.removeItem('userResponses');
    localStorage.removeItem('currentPage');
    return this.quizService.calculateScore(this.userResponses, this.questions);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
