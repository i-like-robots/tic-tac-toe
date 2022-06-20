import type { PlayerTypes } from './constants'
import type { Square } from './Square'
import { hasWon } from './rules'

export class Player {
  public name: string
  public moves: number[] = []

  constructor(name: PlayerTypes) {
    this.name = name
    this.reset()
  }

  move(square: Square): void {
    square.select(this)
    this.moves.push(square.number)
  }

  reset(): void {
    this.moves = []
  }

  get isWinner(): boolean {
    return hasWon(this.moves)
  }
}
