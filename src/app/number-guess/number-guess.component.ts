import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-number-guess',
  templateUrl: './number-guess.component.html',
  styleUrls: ['./number-guess.component.scss']
})
export class NumberGuessComponent implements OnInit {

  constructor() { }

  guessedNumbers = [];
  generatedNumber: any;
  displayFailMessage = false;
  isPlay = false;
  @ViewChildren('first') firstField: QueryList<ElementRef>;
  @ViewChildren('second') secondField: QueryList<ElementRef>;
  @ViewChildren('third') thirdField: QueryList<ElementRef>;

  ngOnInit(): void {
    this.generatedNumber = Math.floor(100 + Math.random() * 900);
    const guessNumber = {} as ThreeDigitNumber;
    guessNumber.first = '';
    guessNumber.second = '';
    guessNumber.third = '';
    this.guessedNumbers.push(guessNumber);
  }

  numberOnly(event, index, position): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (position === 2) {
      this.thirdField.forEach((element, index) =>
        element.nativeElement.focus()
      )
    }
    return true;

  }

  startPlaying() {
    this.isPlay = !this.isPlay;
    this.cursorFirst(this.firstField, 0);
  }
  firstNumberOnly(event, index): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 49 || charCode > 57)) {
      return false;
    }
    this.secondField.forEach((element, index) =>
      element.nativeElement.focus()
    );
    return true;

  }

  testNumber(number, index) {
     if (number.first === '' || number.second === '' || number.third === '') {
      alert('Fill all entries')
      return;
    }
    number.disable = true;
    const firstNum = parseInt((this.generatedNumber + '')[0]);
    const secondNum = parseInt((this.generatedNumber + '')[1]);
    const thirdNum = parseInt((this.generatedNumber + '')[2]);
    let fixed = 0;
    let variable = 0;
    if (number.first === firstNum) {
      fixed++
    } else if (number.first === secondNum || number.first === thirdNum) {
      variable++
    }

    if (number.second === secondNum) {
      fixed++
    } else if (number.second === firstNum || number.second === thirdNum) {
      variable++
    }

    if (number.third === thirdNum) {
      fixed++
    } else if (number.third === secondNum || number.third === firstNum) {
      variable++
    }
    number.displayMessage = true;
    if (this.guessedNumbers.length < 10) {
      if (fixed != 3) {
        const guessNumber = {} as ThreeDigitNumber;
        guessNumber.first = '';
        guessNumber.second = '';
        guessNumber.third = '';
        this.guessedNumbers.push(guessNumber);
        this.cursorFirst(this.firstField, index);
        number.message = fixed + ' CNCP and ' + variable + ' CN'
      } else {
        number.message = 'All correct!!'
        return;
      }
    } else if (this.guessedNumbers.length == 10) {
      if (fixed != 3) {
        number.message = fixed + ' CNCP and ' + variable + ' CN'
        this.displayFailMessage = true;
      } else {
        number.message = 'All correct!!'
        return;
      }
    }
  }
  cursorFirst(firstField, index) {
    setTimeout(function(){
      firstField.forEach((element, index) =>
        element.nativeElement.focus()
      );
    }, 200)
  }

  callPlayAgain() {
    this.displayFailMessage = false;
    this.guessedNumbers = []
    this.ngOnInit();
  }
}

export interface ThreeDigitNumber {
  first: any;
  second: any;
  third: any;
  disable: boolean;
  displayMessage: boolean;
  message: any;
}
