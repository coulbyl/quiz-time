import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  type: 'red' | 'green' = 'red';
  msg: string | undefined;

  private subscription!: Subscription;

  constructor(private alertSercice: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertSercice.state.subscribe((state) => {
      this.type = state.type;
      this.msg = state.msg;
    });
  }

  onClose() {
    this.msg = undefined;
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
