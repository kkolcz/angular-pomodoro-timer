import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// interface BlocksType {
//   number: number;
//   skip: boolean;
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //DEFAULT
  DEFAULT_TIMER: number = 20 * 60;
  DEFAULT_BREAK: number = 5 * 60;
  DEFAULT_LONG_BREAK: number = 20 * 60;
  // -----

  counter: number = 1;
  // blocks: BlocksType[] = [];
  // minutes: any = 25;
  // seconds: any = '00';

  timerStarted: boolean = false;
  timeToBreak: boolean = false;

  interval: any;

  //NEW
  timer: number = this.DEFAULT_TIMER;

  show_min: string = '';
  show_sec: string = '';

  constructor(private titleService: Title) {
    // titleService.setTitle('Pomidoro');
    this.updateTimer();
  }

  increaseTimer(): void {
    // this.minutes++;
    this.timer += 60;
    this.updateTimer();
  }

  decreaseTimer(): void {
    // if (this.minutes > 0) {
    //   this.minutes--;
    // }
    if (this.timer > 0) {
      this.timer -= 60;
      this.updateTimer();
    }
  }

  stopTimer(): void {
    clearInterval(this.interval);
    this.timerStarted = false;
  }

  resetTimer(): void {
    this.stopTimer();
    // this.minutes = this.DEFAULT_TIMER;
    // this.seconds = '00';
    this.timer = this.DEFAULT_TIMER;
    this.counter = 1;
    this.timeToBreak = false;
    this.updateTimer();
    // this.blocks = [];
  }

  updateTimer(): void {
    // MINUTES
    let minutes = this.timer / 60;
    if (minutes >= 1) {
      this.show_min = Math.floor(minutes).toString();
    } else {
      this.show_min = '0' + Math.floor(minutes).toString();
    }

    // SECONDS
    let seconds = this.timer % 60;
    if (seconds >= 10) {
      this.show_sec = seconds.toString();
    } else {
      this.show_sec = '0' + seconds.toString();
    }

    // UPDATE TITLE
    this.updateTitle(this.show_min, this.show_sec);
  }

  startTimer(): void {
    this.timerStarted = true;

    // this.interval = setInterval(() => counter(), 1000);
    this.interval = setInterval(() => counter2(), 1000);

    const counter2 = (): void => {
      this.timer--;
      this.updateTimer();

      console.log(this.show_min);
      console.log(this.show_sec);

      if (this.timer <= 0) {
        this.stopTimer();
        this.playRinging();
        this.nextTimer();
      }
    };

    // const counter = (): void => {
    //   if (this.seconds == 0) {
    //     this.minutes--;
    //     if (this.minutes <= 9) {
    //       this.minutes = '0' + this.minutes;
    //     }
    //     this.seconds = 60;
    //   }
    //   this.seconds--;
    //   if (this.seconds <= 9 && this.seconds > 0) {
    //     this.seconds = '0' + this.seconds;
    //     console.log(this.seconds);
    //   }

    //   if (this.minutes == 0 && this.seconds == 0) {
    //     this.stopTimer();
    //     // this.resetTimer();
    //     this.playRinging();
    //     this.nextTimer();
    //     // this.manageBlocks(false);
    //   }

    //   this.updateTitle();
    // };
  }

  // startBreak(): void {
  //   this.timerStarted = true;
  // }

  // manageBlocks(skip: boolean): void {
  //   // this.block++;
  //   if (skip) {
  //     this.blocks.push({ number: this.block, skip: true });
  //   } else {
  //     this.blocks.push({ number: this.block, skip: false });
  //   }
  // }

  skipTimer(): void {
    // console.log(this.block % 4);
    // if (this.timeToBreak === false) {
    //   this.manageBlocks(true);
    // }
    this.stopTimer();
    this.nextTimer();
  }

  nextTimer(): void {
    this.timeToBreak = !this.timeToBreak;

    if (this.timeToBreak === true) {
      this.timer = this.DEFAULT_BREAK;
    }

    if (this.timeToBreak === true && this.counter % 4 === 0) {
      // console.log('long przerwa');
      // this.block++;
      this.timer = this.DEFAULT_LONG_BREAK;
    }

    if (this.timeToBreak === false) {
      this.counter++;
      this.timer = this.DEFAULT_TIMER;
    }

    this.updateTimer();
    // this.seconds = '00';
    // this.updateTitle();
  }

  updateTitle(minutes: string, seconds: string): void {
    this.titleService.setTitle(`${minutes}:${seconds} - Pomodoro Timer 🍅`);
  }

  playRinging(): void {
    let audio = new Audio();
    audio.src = '../../assets/ringing2.mp3';
    audio.load();
    audio.play();
  }
}
