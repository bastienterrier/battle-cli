export function humanizeDate(date: Date): string {
  let dateToDisplay: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  if (date.getHours() && date.getMinutes()) {
    dateToDisplay += ` à ${date.getHours()}h${date.getMinutes()}m`;
  }
  if (date.getSeconds()) {
    dateToDisplay += `${date.getSeconds()}s`;
  }

  return dateToDisplay;
}
