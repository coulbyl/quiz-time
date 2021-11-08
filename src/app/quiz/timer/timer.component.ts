import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject();
  hour$: Observable<number | string>;
  min$: Observable<number>;
  sec$: Observable<number>;

  constructor() {}

  ngOnInit(): void {
    const date$ = interval(250).pipe(
      takeUntil(this.destroy$),
      map(() => new Date()),
      shareReplay()
    );

    this.hour$ = date$.pipe(
      map((date) =>
        date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      ),
      distinctUntilChanged()
    );
    this.min$ = date$.pipe(
      map((date) => date.getMinutes()),
      distinctUntilChanged()
    );
    this.sec$ = date$.pipe(
      map((date) => date.getUTCSeconds()),
      distinctUntilChanged()
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
