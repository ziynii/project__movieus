export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}${id}`;
}

export function makeDate(dates: Date) {

  const dateFormat = new Date(dates);
  const year = dateFormat.getFullYear();
  const month = dateFormat.getMonth() + 1;
  const date = dateFormat.getDate();

  return `${year}-${month}-${date}`;
}
