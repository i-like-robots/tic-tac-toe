import { PlayerTypes, GameStatus } from './constants'
import { Player } from './Player'
import { Square } from './Square'

export class Game {
  public status: GameStatus
  public players: Player[]
  public activePlayer: Player
  public title: HTMLElement
  public playButton: HTMLButtonElement
  public endButton: HTMLButtonElement
  public readyButton: HTMLButtonElement
  public squares: Square[] = []

  constructor(target: HTMLElement) {
    this.players = [new Player(PlayerTypes.X), new Player(PlayerTypes.O)]

    this.initialise(target)
    this.onReady()
  }

  private initialise(target: HTMLElement) {
    this.title = target.querySelector<HTMLElement>('.Game-title')
    this.title.setAttribute('aria-live', 'assertive')

    const squares = target.querySelectorAll<HTMLButtonElement>('.Game-square')

    squares.forEach((element, i) => {
      const square = new Square(element, i + 1)

      element.onclick = () => {
        if (this.status === GameStatus.Play && !square.isSelected) {
          this.onMove(square)
        }
      }

      this.squares.push(square)
    })

    this.playButton = target.querySelector<HTMLButtonElement>('.Game-play')
    this.playButton.onclick = () => this.onPlay()

    this.endButton = target.querySelector<HTMLButtonElement>('.Game-end')
    this.endButton.onclick = () => this.onEnd(GameStatus.Draw)

    this.readyButton = target.querySelector<HTMLButtonElement>('.Game-ready')
    this.readyButton.onclick = () => this.onReady()
  }

  nextTurn(): void {
    const activeIndex = this.activePlayer ? this.players.indexOf(this.activePlayer) : 0

    this.activePlayer = this.players[1 - activeIndex]
    this.title.innerText = `Player ${this.activePlayer.name} to play`
  }

  onMove(square: Square): void {
    this.activePlayer.move(square)

    if (this.activePlayer.isWinner) {
      this.onEnd(GameStatus.Win)
    } else if (this.squares.every((square) => square.isSelected)) {
      this.onEnd(GameStatus.Draw)
    } else {
      this.nextTurn()
    }
  }

  onReady(): void {
    this.status = GameStatus.Ready

    this.title.innerText = 'Ready to play'

    this.playButton.disabled = false
    this.readyButton.disabled = true
    this.endButton.disabled = true

    this.squares.forEach((square) => square.reset())
    this.players.forEach((player) => player.reset())
  }

  onPlay(): void {
    this.status = GameStatus.Play

    this.playButton.disabled = true
    this.readyButton.disabled = true
    this.endButton.disabled = false

    this.nextTurn()
  }

  onEnd(status: GameStatus): void {
    this.status = status

    if (status === GameStatus.Win) {
      this.title.innerText = `Player ${this.activePlayer.name} wins!`
    } else {
      this.title.innerText = 'The game was a tie'
    }

    this.playButton.disabled = true
    this.readyButton.disabled = false
    this.endButton.disabled = true
  }
}
