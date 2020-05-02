import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('first') firstField: ElementRef;
  @ViewChild('second') secondField: ElementRef;
  @ViewChild('third') thirdField: ElementRef;

  ngOnInit(): void {
    this.generatedNumber = Math.floor(100 + Math.random()*900);
    const guessNumber = {} as ThreeDigitNumber;
    guessNumber.first = '';
    guessNumber.second = '';
    guessNumber.third = '';
    this.guessedNumbers.push(guessNumber);
    console.log(this.generatedNumber);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    //this.thirdField.nativeElement.focus();
    return true;

  }

  firstNumberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 49 || charCode > 57)) {
      return false;
    }
    //this.secondField.nativeElement.focus();
    return true;

  }

  testNumber(number) {
     if(number.first == '' || number.second == '' || number.third == '') {
      alert('Fill all entries')
      return;
    }
    number.disable = true;
    const firstNum = parseInt((this.generatedNumber+'')[0]);
    const secondNum = parseInt((this.generatedNumber+'')[1]);
    const thirdNum = parseInt((this.generatedNumber+'')[2]);
    let fixed = 0; 
    let variable = 0;
    if(number.first === firstNum) { 
      fixed++
    } else if (number.first === secondNum || number.first === thirdNum) {
      variable++
    }

    if(number.second === secondNum) { 
      fixed++
    } else if (number.second === firstNum || number.second === thirdNum) {
      variable++
    }

    if(number.third === thirdNum) { 
      fixed++
    } else if (number.third === secondNum || number.third === firstNum) {
      variable++
    }
    number.displayMessage = true;
    if(this.guessedNumbers.length < 10) {
      if(fixed != 3) {
        const guessNumber = {} as ThreeDigitNumber;
        guessNumber.first = '';
        guessNumber.second = '';
        guessNumber.third = '';
        this.guessedNumbers.push(guessNumber);
        number.message = fixed+' CNCP and '+ variable + ' CN'
      } else {
        number.message = 'All correct!!'
        return;
      }
    } else if(this.guessedNumbers.length == 10) {
      if(fixed != 3) {
        number.message = fixed+' CNCP and '+ variable + ' CN'
        this.displayFailMessage = true;
      } else {
        number.message = 'All correct!!'
        return;
      }
    }
     // this.firstField.nativeElement.focus();
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
