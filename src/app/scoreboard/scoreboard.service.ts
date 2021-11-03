import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ScoreBoard } from './scoreboard.model';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  open = new BehaviorSubject<boolean>(false);
  scoreboard = new Subject<ScoreBoard>();

  constructor() {}
}
