export const convertTimeToJST = (date: string) => {
  const result = date.substring(0, date.length-1) + '+09:00';
  return result;
}

export const formatDate = (date: Date) => {
  const result = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
  return result;
}