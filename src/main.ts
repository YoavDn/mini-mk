import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const w = (canvas.width = 700)
const h = (canvas.height = 500)

function main() {
  const ctx = canvas.getContext("2d")!

  ctx.beginPath()
  ctx.fillRect(0, 0, w, h)

}

onload = () => main();
