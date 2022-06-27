
export const randomInt = (min:number = 1, max:number = 1_000_000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
