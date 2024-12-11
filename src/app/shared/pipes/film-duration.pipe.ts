import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filmDuration'
})
export class FilmDurationPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return '';

    return `${Math.floor(value / 60)} ч ${value % 60} мин`;
  }
}
