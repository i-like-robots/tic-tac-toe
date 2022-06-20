import { Game } from './Game'

const target = document.querySelector<HTMLElement>('.Game')
target && new Game(target)
