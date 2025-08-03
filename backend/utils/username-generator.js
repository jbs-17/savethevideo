const letters = "abcdefghijklmnopqrstuvwxyz";
const capitals = letters.toUpperCase();
const numbers = '1234567890';
const all = [...numbers, ...letters, ...capitals];

export function usernameGenerator() {
  let result = '';
  while (result.length <= 6) {
    result += all[Math.floor(Math.random() * all.length)];
  }
  return result;
}