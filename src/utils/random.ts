export function generateRandomNumber(n: number): string {
  if (n < 1) {
    throw new Error('Number of digits must be at least 1.')
  }
  const min = Math.pow(10, n - 1) // The minimum possible n-digit number
  const max = Math.pow(10, n) - 1 // The maximum possible n-digit number
  return Math.floor(Math.random() * (max - min + 1) + min).toString()
}
