export function responseToBoolean(response: string): boolean {
  const r: string = response.toLocaleLowerCase();
  return  r === 'yes';
}
