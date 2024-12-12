import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ageFormat'
})
export class AgeFormatPipe implements PipeTransform {

  transform(age: number): string {
    if (!age) return '';
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    if (lastDigit > 11 && lastDigit <= 19) {
      return `${age} лет`
    }

    switch (lastDigit) {
      case 1:
        return `${age} год`;
      case 2:
      case 3:
      case 4:
        return `${age} года`;
      default:
        return `${age} лет`;
    }
  }

}
