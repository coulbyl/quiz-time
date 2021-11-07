import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScoreBoard } from '../scoreboard/scoreboard.model';
import { computingQuiz } from './computing-quiz';
import { Quiz } from './quiz.model';
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  score = new Subject<number>();
  dbUrl = 'https://quiz-time-b0305-default-rtdb.firebaseio.com/';
  quizs = new BehaviorSubject<Quiz[]>(computingQuiz);

  constructor(private http: HttpClient) {}

  calculateScore(value: any, quizs: Quiz[]) {
    let score = 0;
    for (const quiz of quizs) {
      if (value[quiz.name] === quiz.response) {
        score++;
      }
    }
    this.score.next(score);
    return score;
  }

  private get fetchUsers() {
    return this.http.get<ScoreBoard[]>(this.dbUrl + 'users.json').pipe(
      map((data) => {
        const users = [];
        for (const key in data) {
          users.push(data[key]);
        }
        return users;
      })
    );
  }

  private ranking(users: ScoreBoard[]) {
    users.sort((a, b) => b.lastScore - a.lastScore);
    let rank = 1;
    for (var i = 0; i < users.length; i++) {
      if (i > 0 && users[i].lastScore < users[i - 1].lastScore) {
        rank++;
      }
      users[i].rank = rank;
    }
    return users;
  }

  getScoreboard(email: string) {
    return this.fetchUsers.pipe(
      map((users) => {
        return this.ranking(users).find((user) => user.email === email)!;
      })
    );
  }

  storeScore(userId: string, email: string, lastScore: number) {
    return this.http.put(this.dbUrl + 'users/' + userId + '.json', {
      email,
      lastScore,
    });
  }

  storeToLS(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getFromLS(key: string, isObject = true) {
    if (isObject) return JSON.parse(localStorage.getItem(key)!);
    return localStorage.getItem(key);
  }
}
