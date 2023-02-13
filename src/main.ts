import './style.css';
import Game from './game/game';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

function main() {
  const ctx = canvas.getContext('2d')!;
  const game = new Game({ ctx });
  game.start();
}

onload = () => main();
