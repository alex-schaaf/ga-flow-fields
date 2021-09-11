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

for (let x = leftX; x < nCols; x++) {
  const row: number[] = []
  for (let y = topY; y < nRows; y++) {
    const angle = (y / nRows) * Math.PI
    row.push(angle)
  }
  grid.push(row)
}

const sketch = (p: p5) => {
  function drawGrid() {
    for (let x = 0; x < nCols; x++) {
      for (let y = 0; y < nRows; y++) {
        const theta = grid[x][y]
        const nx = Math.cos(theta)
        const ny = Math.sin(theta)
        p.strokeWeight(1)
        p.line(
          x * resolution,
          y * resolution,
          (x + nx / 1.5) * resolution,
          (y + ny / 1.5) * resolution
        )
        p.strokeWeight(4)
        p.point((x + nx / 1.5) * resolution, (y + ny / 1.5) * resolution)
      }
    }
  }

  function drawCurve(xStart: number, yStart: number, nSteps: number = 200) {
    p.beginShape()
    let x = xStart
    let y = yStart
    for (let n = 0; n < nSteps; n++) {
      p.vertex(x, y)

      const xi = Math.round(x / resolution)
      const yi = Math.round(y / resolution)

      if (xi < 0 || xi >= grid.length) {
        continue
      }
      if (yi < 0 || yi >= grid[xi].length) {
        continue
      }

      const gridAngle = grid[xi][yi]

      const xStep = Math.cos(gridAngle) * width * 0.005
      const yStep = Math.sin(gridAngle) * width * 0.005

      x += xStep
      y += yStep
    }
    p.endShape()
  }

  p.setup = () => {
    const canvas = p.createCanvas(width, height)
    canvas.parent("p5-canvas")
    p.stroke(255)
    p.noFill()
    p.strokeWeight(1)

    // drawGrid()
    p.stroke(255, 0, 0)
    p.strokeWeight(1)
    for (let n = 0; n < 100; n++) {
      drawCurve(
        Math.random() * width,
        Math.random() * height,
        Math.floor(Math.random() * 100)
      )
    }
  }

  p.draw = () => {}
}

new p5(sketch)
