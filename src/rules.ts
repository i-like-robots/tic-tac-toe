export const wins = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
]

export function hasWon(moves: number[]): boolean {
  return wins.some((pattern) => {
    return pattern.every((number) => moves.includes(number))
  })
}
