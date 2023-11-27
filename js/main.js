const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth
const RADIUS = WIDTH / 50
const RADIUSANT = WIDTH / 110
const LINE_WIDTH = RADIUS / 10
const COLORMAIN = '#FF652F'
const COLOR = '#FFE400'
const COLORANT = '#14A76C'
const CONNECTION = '#747474'
const END = 100


class AntFarm {
  constructor() {
    this.canvas

    this.rooms = new Map()
    this.connections = new Set()
    this.start
    this.end
    this.numAnts = 1
    this.numNodes

    this.ants = new Map()
    this.antPrevRoom = new Map()

    this.navbar = document.querySelector('.navbar')
    this.rangePicker = document.getElementById('rangePicker')
    this.graphGeneratorButton = document.getElementById('graphGenerator')
    this.startButton = document.getElementById('start')

    this.init()
  }

  init() {
    this.createCanvas()
    this.addEventListeners()
    this.generateNewGraph()
  }

  createCanvas() {
    this.canvas = new fabric.Canvas('c', {'selection': false})
    this.canvas.setDimensions({width: window.innerWidth, height: window.innerHeight})
  }

  addEventListeners() {
    this.graphGeneratorButton.addEventListener('click', event => {
      this.generateNewGraph()
    })

    this.rangePicker.addEventListener('input', event => {
      const value = event.target.value
      this.numAnts = parseInt(value)

      const ants = document.getElementById('ants')
      ants.textContent = value
    })

    this.startButton.addEventListener('click', () => {
      let data = {}

      data.rooms = []
      for (const roomId of this.rooms.keys()) {
        data.rooms.push(roomId)
      }
  
      data.connections = []
      for (const connection of this.connections) {
        data.connections.push(connection)
      }

      data.numAnts = this.numAnts
      data.start = this.start
      data.end = this.end

      const pathsData = findPaths(data)

      this.animate(pathsData)
    })
  }

  resetCanvas() {
    this.rooms = new Map()
    this.connections = new Set()
    this.canvas.clear()
  }

  generateNewGraph() {
    this.resetCanvas()

    const graphData = generateGraph()

    this.numNodes = graphData.numNodes
    this.start = graphData.start.toString()
    this.end = graphData.end.toString()

    const positions = graphData.positions
    const edges = graphData.edges

    for (const [node, pos] of positions) {
      const x = WIDTH * pos[0]
      const y = HEIGHT * pos[1]
      this.createRoom(node.toString(), x, y)
    }

    for (const [node1, node2] of edges) {
      const room1 = this.rooms.get(node1.toString())
      const room2 = this.rooms.get(node2.toString())
      this.createConnection(room1, room2)
    }
  }

  createRoom(nodeId, left, top) {
    let color = COLOR
    if (nodeId == this.start || nodeId == this.end) {
      color = COLORMAIN
    }

    const c = new fabric.Circle({
      radius: RADIUS,
      fill: color,
      left: left - RADIUS,
      top: top - RADIUS,
      id: nodeId,
      hasControls: false,
      evented: false,
    })
  
    this.canvas.add(c)
    this.canvas.bringToFront(c)
    this.rooms.set(nodeId, c)
  }

  createConnection(c1, c2) {
    const key1 = c1.id.toString() + "-" + c2.id.toString()
    const key2 = c2.id.toString() + "-" + c1.id.toString()
    if (this.connections.has(key1) || this.connections.has(key2)) {
      return
    }

    const line = new fabric.Line([c1.left+RADIUS, c1.top+RADIUS, c2.left+RADIUS, c2.top+RADIUS], {
      stroke: CONNECTION,
      strokeWidth: LINE_WIDTH,
      hasControls: false,
      evented: false,
    })

    this.canvas.add(line)
    this.canvas.sendToBack(line)

    this.connections.add(key1)
  }

  enableNavbar() {
    this.navbar.classList.remove('disabled')
    this.rangePicker.disabled = false
    this.graphGeneratorButton.disabled = false
    this.startButton.disabled = false
  }

  disableNavbar() {
    this.navbar.classList.add('disabled')
    this.rangePicker.disabled = true
    this.graphGeneratorButton.disabled = true
    this.startButton.disabled = true
  }

  animate(pathsData) {
    this.disableNavbar()

    const left = this.rooms.get(this.start).left + RADIUS - RADIUSANT
    const top = this.rooms.get(this.start).top + RADIUS - RADIUSANT

    for (let antInd=1; antInd<=this.numAnts; antInd++) {
      const ant = new fabric.Circle({
        radius: RADIUSANT,
        fill: COLORANT,
        left: left,
        top: top,
        hasControls: false,
        evented: false
      })
      this.ants.set(antInd, ant)
      this.antPrevRoom.set(antInd, this.rooms.get(this.start))
      this.canvas.add(ant)
    }

    setTimeout(this.animateStep(pathsData, 0), 1000)
  }
  
  animateStep(pathsData, stepInd) {
    let currAnt = 1
    for (const [ant, room] of pathsData.steps[stepInd].entries()) {
      const isFirstAnt = currAnt === 1
      const isLastAnt = currAnt === pathsData.steps[stepInd].size
      this.animateAnt(pathsData, ant, room, stepInd, isFirstAnt, isLastAnt)
      currAnt++
    }
  }
  
  animateAnt(pathsData, ant, room, stepInd, isFirstAnt, isLastAnt) {
    const fromX = this.antPrevRoom.get(ant).left + RADIUS - RADIUSANT
    const fromY = this.antPrevRoom.get(ant).top + RADIUS - RADIUSANT
  
    const toX = this.rooms.get(room).left + RADIUS - RADIUSANT
    const toY = this.rooms.get(room).top + RADIUS - RADIUSANT
  
    const dx = (toX - fromX) / END
    const dy = (toY - fromY) / END
    
    fabric.util.animate({
      startValue: 0,
      endValue: END,
      duration: 1000,
      onChange: value => {
        if (!this.ants.has(ant)) return

        const x = dx * value
        const y = dy * value

        this.ants.get(ant).set({left: fromX + x, top: fromY + y})

        if (isLastAnt) {
          this.canvas.renderAll()
        }
      },
      onComplete: () => {
        if (!isFirstAnt) return

        for (const [ant, room] of pathsData.steps[stepInd].entries()) {
          this.antPrevRoom.set(ant, this.rooms.get(room))
        }

        if (stepInd === pathsData.steps.length - 1) {
          this.finishAnimation()
          return
        }

        setTimeout(this.animateStep(pathsData, stepInd+1), 1000)
      }
    })
  }

  finishAnimation() {
    this.enableNavbar()

    for (const ant of this.ants.values()) {
      this.canvas.remove(ant)
    }

    this.ants = new Map()
    this.antPrevRoom = new Map()
  }
}

class ToggleInfo {
  constructor() {
    this.infoClosed = false

    this.info = document.querySelector('.info-wrapper')
    this.main = document.querySelector('.main')

    this.addEventListeners()
  }

  addEventListeners() {
    document.getElementById('info').addEventListener('click', () => {
      this.toggleInfo()
    })

    document.getElementById('close').addEventListener('click', () => {
      this.toggleInfo()
    })
  }

  toggleInfo() {
    if (this.infoClosed) {
      this.info.classList.remove('disabled')
      this.main.classList.add('disabled')
    } else {
      this.info.classList.add('disabled')
      this.main.classList.remove('disabled')
    }
    this.infoClosed = !this.infoClosed
  }
}

function burger() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function() {
      burger.classList.toggle('is-active')
      menu.classList.toggle('is-active')
  })
}

function init() {
  burger()
  new ToggleInfo()
  new AntFarm()
}

window.onload = init
