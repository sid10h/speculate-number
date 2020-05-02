import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  displayNumber: any;
  @ViewChildren('first') firstField: QueryList<ElementRef>;
  @ViewChildren('second') secondField: QueryList<ElementRef>;
  @ViewChildren('third') thirdField: QueryList<ElementRef>;
  @ViewChildren('fourth') fourthField: QueryList<ElementRef>;
  @ViewChildren('fifth') fifthField: QueryList<ElementRef>;

  ngOnInit(): void {

    var arr = [];
    var r = Math.floor(Math.random() * 10);
    if(r != 0) {
      arr.push(r);
    }
    while(arr.length < 5) {
      var r = Math.floor(Math.random() * 10);
      if(arr.indexOf(r) === -1) {
        arr.push(r);
      }  
    }

    this.generatedNumber = arr;
    const guessNumber = {} as ThreeDigitNumber;
    guessNumber.first = '';
    guessNumber.second = '';
    guessNumber.third = '';
    guessNumber.fourth = '';
    guessNumber.fifth = '';
    this.guessedNumbers.push(guessNumber);
    this.displayNumber = 1*this.generatedNumber[4] + 10*this.generatedNumber[3] + 100*this.generatedNumber[2] + 1000*this.generatedNumber[1] + 10000*this.generatedNumber[0];
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
    if (position === 3) {
      this.fourthField.forEach((element, index) =>
        element.nativeElement.focus()
      )
    }
    if (position === 4) {
      this.fifthField.forEach((element, index) =>
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
    const firstNum = this.generatedNumber[0];
    const secondNum = this.generatedNumber[1];
    const thirdNum = this.generatedNumber[2];
    const fourthNum = this.generatedNumber[3];
    const fifthNum = this.generatedNumber[4];
    let fixed = 0;
    let variable = 0;
    if (number.first === firstNum) {
      fixed++
    } else if (number.first === secondNum || number.first === thirdNum || number.first === fourthNum || number.first === fifthNum) {
      variable++
    }

    if (number.second === secondNum) {
      fixed++
    } else if (number.second === firstNum || number.second === thirdNum || number.second === fourthNum || number.second === fifthNum) {
      variable++
    }

    if (number.third === thirdNum) {
      fixed++
    } else if (number.third === firstNum || number.third === secondNum || number.third === fourthNum || number.third === fifthNum) {
      variable++
    }

    if (number.fourth === fourthNum) {
      fixed++
    } else if (number.fourth === firstNum || number.fourth === secondNum || number.fourth === thirdNum || number.fourth === fifthNum) {
      variable++
    }

    if (number.fifth === fifthNum) {
      fixed++
    } else if (number.fifth === firstNum || number.fifth === secondNum || number.fifth === thirdNum || number.fifth === fourthNum) {
      variable++
    }
    number.displayMessage = true;
    if (this.guessedNumbers.length < 10) {
      if (fixed != 5) {
        const guessNumber = {} as ThreeDigitNumber;
        guessNumber.first = '';
        guessNumber.second = '';
        guessNumber.third = '';
        guessNumber.fourth = '';
        guessNumber.fifth = '';
        this.guessedNumbers.push(guessNumber);
        this.cursorFirst(this.firstField, index);
        number.message = fixed + ' CNCP and ' + variable + ' CN'
      } else {
        number.message = 'All correct!!'
        return;
      }
    } else if (this.guessedNumbers.length == 10) {
      if (fixed != 5) {
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
  fourth: any;
  fifth: any;
  disable: boolean;
  displayMessage: boolean;
  message: any;
}
