import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

interface BlocksType {
  number: number;
  skip: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //DEFAULT
  DEFAULT_TIMER: number = 25;
  DEFAULT_BREAK: number = 5;
  // -----

  block: number = 0;
  blocks: BlocksType[] = [];
  minutes: any = 25;
  seconds: any = '00';

  timerStarted: boolean = false;
  timeToBreak: boolean = false;

  interval: any;

  constructor(private titleService: Title) {
    // titleService.setTitle('Pomidoro');
  }

  increaseTimer(): void {
    this.minutes++;
  }

  decreaseTimer(): void {
    if (this.minutes > 0) {
      this.minutes--;
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.minutes = this.DEFAULT_TIMER;
    this.seconds = '00';
    this.block = 0;
    this.blocks = [];
  }

  startTimer(): void {
    this.timerStarted = true;

    this.interval = setInterval(() => counter(), 100);

    const counter = (): void => {
      if (this.seconds == 0) {
        this.minutes--;
        if (this.minutes <= 9) {
          this.minutes = '0' + this.minutes;
        }
        this.seconds = 60;
      }
      this.seconds--;
      if (this.seconds <= 9 && this.seconds > 0) {
        this.seconds = '0' + this.seconds;
        console.log(this.seconds);
      }

      if (this.minutes == 0 && this.seconds == 0) {
        this.stopTimer();
        this.playRinging();
        this.manageBlocks(false);
      }

      this.updateTitle();
    };
  }

  startBreak(): void {
    this.timerStarted = true;
  }

  stopTimer(): void {
    clearInterval(this.interval);
    this.timerStarted = false;
  }

  manageBlocks(skip: boolean): void {
    this.block++;
    if (skip) {
      this.blocks.push({ number: this.block, skip: true });
    } else {
      this.blocks.push({ number: this.block, skip: false });
    }
  }

  skipTimer(): void {
    if (this.timeToBreak === false) {
      this.manageBlocks(true);
    }
    this.stopTimer();
    this.timeToBreak = !this.timeToBreak;

    if (this.timeToBreak === true) {
      this.minutes = this.DEFAULT_BREAK;
    } else {
      this.minutes = this.DEFAULT_TIMER;
    }
    this.seconds = '00';
    this.updateTitle();
  }

  updateTitle(): void {
    this.titleService.setTitle(`${this.minutes}:${this.seconds}`);
  }

  playRinging(): void {
    let audio = new Audio();
    audio.src = '../../assets/ringing2.mp3';
    audio.load();
    audio.play();
  }
}
