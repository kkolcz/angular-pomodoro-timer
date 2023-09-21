import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  timer = 25;
  minutes = 25;
  seconds = 0;

  timerStarted = false;

  interval: any;

  increaseTimer() {
    this.timer++;
  }

  decreaseTimer() {
    this.timer--;
  }

  resetTimer() {
    this.timerStarted = false;
    this.timer = 25;
  }

  startTimer() {
    this.timerStarted = true;

    this.interval = setInterval(() => counter(), 10);

    const counter = () => {
      // console.log(this.timer);
      if (this.seconds === 0) {
        this.minutes--;
        this.seconds = 60;
      }
      this.seconds--;
    };

    if (this.minutes === 0 && this.seconds === 0) {
      return;
    }
  }
}
