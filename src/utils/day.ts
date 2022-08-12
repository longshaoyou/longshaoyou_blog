export const getTime = (time: number): string => {
  const date: Date = new Date(time);
  const Y: string = date.getFullYear() + "-";
  const M: string = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  const D: string = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  const h: string = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  const m: string = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
  const s: string = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds() + "";
  return Y + M + D + h + m + s;
};
