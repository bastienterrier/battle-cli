import { humanizeDate } from './date';

export function humanizeFilename(filename: string): string {

  const [player, date]: string[] = filename.split('_');

  const humanizedDate: string = humanizeDate(new Date(parseInt(date, 10)));

  return `${player} - ${humanizedDate}`;
}
