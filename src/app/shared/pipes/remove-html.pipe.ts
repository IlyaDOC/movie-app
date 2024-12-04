import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtml'
})
export class RemoveHtmlPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    let cleanedText = value.replace(/<[^>]*>/g, '');

    cleanedText = cleanedText.replace(/&[a-zA-Z0-9#]+;/g, '');

    return cleanedText;
  }

}
