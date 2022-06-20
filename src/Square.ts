import type { Player } from './Player'

export class Square {
  public target: HTMLButtonElement
  public number: number

  constructor(target: HTMLButtonElement, number: number) {
    this.target = target
    this.number = number

    this.reset()
  }

  select(player: Player): void {
    this.target.setAttribute('aria-label', `Square ${this.number} picked by player ${player.name}`)
    this.target.setAttribute('aria-pressed', 'true')
    this.target.innerText = player.name
  }

  reset(): void {
    this.target.setAttribute('aria-label', `Square ${this.number}`)
    this.target.setAttribute('aria-pressed', 'false')
    this.target.innerText = ''
  }

  get isSelected(): boolean {
    return this.target.getAttribute('aria-pressed') === 'true'
  }
}
