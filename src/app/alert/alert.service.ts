import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Alert {
  type: 'red' | 'green';
  msg: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  state = new Subject<Alert>();
  constructor() {}
}
