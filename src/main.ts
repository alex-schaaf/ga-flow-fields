import p5 from "p5"
import "./styles.scss"

const width = 800
const height = Math.sqrt(2) * width

const leftX = width * -0.5
const rightX = width * 0.5
const topY = height * -0.5
const bottomY = height * 0.5
const resolution = width * 0.025

const nCols = (rightX - leftX) / resolution
const nRows = (bottomY - topY) / resolution

const grid: number[][] = []

const defaultAngle = Math.PI * 0.25

for (let x = 0; x < nCols; x++) {
  const row: number[] = []
  for (let y = 0; y < nRows; y++) {
    const angle = (y / nRows) * Math.PI
    row.push(angle)
  }
  grid.push(row)
}

const sketch = (p: p5) => {
  function drawGrid() {
    for (let x = 0; x < nCols; x++) {
      for (let y = 0; y < nRows; y++) {
        // p.point(x * resolution, y * resolution)
        const theta = grid[x][y]
        const nx = Math.cos(theta)
        const ny = Math.sin(theta)
        p.line(
          x * resolution,
          y * resolution,
          (x + nx / 1.5) * resolution,
          (y + ny / 1.5) * resolution
        )
      }
    }
  }

  p.setup = () => {
    const canvas = p.createCanvas(width, height)
    canvas.parent("p5-canvas")
    p.stroke(255)
    p.strokeWeight(1)

    drawGrid()
  }

  p.draw = () => {}
}

new p5(sketch)
