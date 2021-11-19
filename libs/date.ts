export const convertTimeToJST = (date: string) => {
  const result = date.substring(0, date.length-1) + '+09:00';
  return result;
}

export const formatDate = (date: Date) => {
  const result = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日';
  return result;
}