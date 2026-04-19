import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(value: string, maxLength: 10): string {
    if (value.length <= maxLength) {
      return value;
    }
    if (!value) {
      return '';
    }
    return value.slice(0, maxLength) + '...';
  }
}
