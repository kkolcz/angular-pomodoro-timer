import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  timer: number = 25;
  minutes: number = 25;
  seconds: any = '00';

  timerStarted: boolean = false;

  interval: any;

  increaseTimer() {
    this.minutes++;
  }

  decreaseTimer() {
    if (this.minutes > 0) {
      this.minutes--;
    }
  }

  resetTimer() {
    this.stopTimer();
    this.minutes = 1;
    this.seconds = '00';
  }

  startTimer() {
    this.timerStarted = true;

    this.interval = setInterval(() => counter(), 100);

    const counter = () => {
      if (this.seconds == 0) {
        this.minutes--;
        this.seconds = 60;
      }
      this.seconds--;
      if (this.seconds <= 9 && this.seconds > 0) {
        this.seconds = '0' + this.seconds;
        console.log(this.seconds);
      }

      if (this.minutes === 0 && this.seconds === 0) {
        this.stopTimer();
      }
    };
  }

  stopTimer() {
    clearInterval(this.interval);
    this.timerStarted = false;
  }
}
