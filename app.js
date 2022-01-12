const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

context.strokeStyle = '#ccc'
context.fillStyle = '#ccc'

canvas.height = window.innerHeight - 120

createSizeCanvas()

const maxX = canvas.width
const maxY = canvas.height

let i = -1
let j = -1

createGrid()

let arr = new Array(i)

for (let a = 0; a <= i; a++) {
  arr[a] = new Array(j).fill(false)
}

canvas.onclick = (event) => {
  let clickX = event.clientX - (event.clientX % 10)
  let clickY = event.clientY - (event.clientY % 10) - 10
  // console.log(clickX, clickY)
  drawCell(clickX, clickY)
}

document.getElementById('clear').onclick = clear
document.getElementById('start').onclick = start
document.getElementById('stop').onclick = stop

function createSizeCanvas() {
  if (window.innerWidth % 10 !== 0) {
    canvas.width = window.innerWidth - (window.innerWidth % 10)
    canvas.style.width = window.innerWidth - (window.innerWidth % 10)
  } else {
    canvas.width = window.innerWidth
  }

  if (canvas.height % 10 !== 0) {
    canvas.height = canvas.height - (canvas.height % 10)
    canvas.style.height = canvas.height - (canvas.height % 10)
  } else {
    canvas.height = canvas.height
  }
}

function createGrid() {
  i = 0
  j = 0
  // console.log('max X: ', maxX, ' max Y: ', maxY)

  context.strokeStyle = '#ccc'
  context.fillStyle = '#ccc'
  context.beginPath()
  for (let x = 0; x <= maxX; x += 10) {
    i++
    context.moveTo(x, 0)
    context.lineTo(x, maxY)
    context.stroke()
  }

  for (let y = 0; y <= maxY; y += 10) {
    j++
    context.moveTo(0, y)
    context.lineTo(maxX, y)
    context.stroke()
  }

  // console.log('Array size: ', i, ' ', j)

  // Cell size = 10x10px
  // context.fillRect(10, 10, 10, 10)
}

let timer
function start() {
  timer = setInterval(() => {
    play()
  }, 120)
}

function stop() {
  clearInterval(timer)
  createGrid()
}

function clear() {
  arr = null
  arr = new Array(i)

  for (let a = 0; a <= i; a++) {
    arr[a] = new Array(j).fill(false)
    // ar[a] = [...arr[a]]
  }

  stop()
  context.fillStyle = 'rgb(75, 75, 75)'
  context.fillRect(0, 0, maxX, maxY)
  context.fillStyle = '#ccc'
  createGrid()
}

function play() {
  let ar = new Array(i)

  for (let a = 0; a <= i; a++) {
    ar[a] = new Array(j).fill(false)
    // ar[a] = [...arr[a]]
  }

  checkAllLifeCell(ar)

  for (let a = 0; a <= i; a++) {
    arr[a] = [...ar[a]]
  }

  context.fillStyle = 'rgb(75, 75, 75)'
  context.fillRect(0, 0, maxX, maxY)
  context.fillStyle = '#ccc'

  drawCellFromArr()
  // console.log(arr)
}

function checkAllLifeCell(ar) {
  for (let ii = 0; ii <= i; ii++) {
    for (let jj = 0; jj <= j; jj++) {
      if (arr[ii][jj] === true) {
        isWillDead(ii, jj) ? (ar[ii][jj] = false) : (ar[ii][jj] = true)
      } else {
        isWillLife(ii, jj) ? (ar[ii][jj] = true) : null
      }
    }
  }
}

function isWillDead(ii, jj) {
  let count = -1
  try {
    for (let a = ii - 1; a <= ii + 1; a++) {
      for (let b = jj - 1; b <= jj + 1; b++) {
        if (arr[a][b] === undefined) continue
        if (arr[a][b] === true) {
          // console.log('i: ', a, ' j: ', b)
          count++
        }
      }
    }
    // console.log(count)
    if (count === 2 || count === 3) {
      return false
    } else return true
  } catch (e) {}
}

function isWillLife(ii, jj) {
  let count = 0
  try {
    for (let a = ii - 1; a <= ii + 1; a++) {
      for (let b = jj - 1; b <= jj + 1; b++) {
        if (arr[a][b] === undefined) continue
        if (arr[a][b] === true) count++
      }
    }
    if (count === 3) {
      return true
    } else return false
  } catch (e) {}
}

function drawCellFromArr() {
  for (let a = 0; a < i; a++) {
    for (let b = 0; b < j; b++) {
      if (arr[a][b]) {
        // console.log(a, ' ', b)
        drawCells(a * 10, b * 10)
      }
    }
  }
}

function drawCells(x, y) {
  context.fillStyle = '#ccc'
  context.fillRect(x, y, 10, 10)
}

function drawCell(x, y) {
  if (arr[x / 10][y / 10] === true) {
    context.fillStyle = 'rgb(75, 75, 75)'
    context.fillRect(x + 1, y + 1, 8, 8)
    arr[x / 10][y / 10] = false
  } else {
    context.fillStyle = '#ccc'
    context.fillRect(x, y, 10, 10)
    arr[x / 10][y / 10] = true
  }
}
