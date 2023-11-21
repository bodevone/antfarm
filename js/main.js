const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth
const RADIUS = WIDTH / 50
const RADIUSANT = WIDTH / 110
const LINE_WIDTH = RADIUS / 10
const COLORMAIN = '#FF652F'
const COLOR = '#FFE400'
const COLORANT = '#14A76C'
const CONNECTION = '#747474'
const ANIMATION_TEXT = 'Animation in progress'
const END = 100


class AntFarm {
  constructor() {
    this.canvas

    this.animation = false
    this.pressed = false

    this.rooms = {}
    this.connections = new Set()
    this.animated = []
    this.ants = {}
    this.antPrevRoom = {}
    this.numAnts = 1
    this.numNodes
    this.start
    this.end

    this.init()
  }

  init() {
    this.createCanvas()
    this.addEventListeners()
    this.createExample()
  }

  createCanvas() {
    this.canvas = new fabric.Canvas('c', {'selection': false})
    this.canvas.setDimensions({width: window.innerWidth, height: window.innerHeight})
  }

  addEventListeners() {
    document.getElementById('example').addEventListener('click', event => {
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }
      this.createExample()
    })

    document.getElementById('rangePicker').addEventListener('input', event => {
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }

      const value = event.target.value
      this.numAnts = parseInt(value)

      const ants = document.getElementById('ants')
      ants.textContent = value
    })

    document.getElementById('start').addEventListener('click', () => {
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }
      let data = {}
      data.rooms = []
      for (let roomId in this.rooms) {
        data.rooms.push(roomId)
      }
  
      data.connections = []
      for (const connection of this.connections) {
        data.connections.push(connection)
      }
      data.numAnts = this.numAnts
      data.start = this.start.toString()
      data.end = this.end.toString()
      const pathsData = findPaths(data)
  
      this.animateSetup(pathsData)
    })
  }

  createExample() {
    const graphData = generateGraph()

    this.newCanvas()
    const positions = graphData.positions
    const edges = graphData.edges
    this.numNodes = graphData.numNodes
    this.start = graphData.start
    this.end = graphData.end

    for (const [node, pos] of positions) {
      let x = WIDTH * pos[0]
      let y = HEIGHT * pos[1]
      this.newRoom(node, x, y)
    }
    for (const [node1, node2] of edges) {
      const room1 = this.rooms[node1]
      const room2 = this.rooms[node2]
      this.newLine(room1, room2)
    }
  }

  newCanvas() {
    this.rooms = {}
    this.connections = new Set()
    this.canvas.clear()
    this.completed()
  }

  newRoom(nodeId, left, top) {
    let color = COLOR
    if (nodeId == this.start || nodeId == this.end) {
      color = COLORMAIN
    }
    let c = new fabric.Circle({
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
    this.rooms[nodeId] = c
  }

  newLine(c1, c2) {
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

  animateSetup(pathsData) {
    this.animation = true

    let left = this.rooms[this.start].left + RADIUS - RADIUSANT
    let top = this.rooms[this.start].top + RADIUS - RADIUSANT

    for (let i=1; i<=this.numAnts; i++) {
      let ant = new fabric.Circle({
        radius: RADIUSANT,
        fill: COLORANT,
        left: left,
        top: top,
        hasControls: false,
        evented: false
      })
      this.ants[i] = ant
      this.antPrevRoom[i] = this.rooms[this.start]
      this.canvas.add(ant)
    }

    for (let i=0; i<=pathsData.steps.length; i++) {
      this.animated.push(false)
    }

    setTimeout(this.animate(pathsData, 0), 1000)
  }
  
  animate(pathsData, i) {
    let len = pathsData.steps[i].size
    let curr = 0
    for (const [ant, room] of pathsData.steps[i].entries()) {
      curr++
      this.animateAnt(pathsData, ant, room, i, curr===len)
    }
  }
  
  animateAnt(pathsData, ant, room, i, last) {
    let fromX = this.antPrevRoom[ant].left + RADIUS - RADIUSANT
    let fromY = this.antPrevRoom[ant].top + RADIUS - RADIUSANT
  
    let toX = this.rooms[room].left + RADIUS - RADIUSANT
    let toY = this.rooms[room].top + RADIUS - RADIUSANT
  
    let dx = (toX - fromX) / END
    let dy = (toY - fromY) / END
    
    fabric.util.animate({
      startValue: 0,
      endValue: END,
      duration: 1000,
      onChange: value => {
        let x = dx * value
        let y = dy * value
        this.ants[ant].set({left: fromX + x, top: fromY + y})
        if (last) {
          this.canvas.renderAll()
        }
      },
      onComplete: () => {
        if (pathsData.steps[i] && !this.animated[i]) {
          for (const [ant, room] of pathsData.steps[i].entries()) {
            this.antPrevRoom[ant] = this.rooms[room]
          }
          this.animated[i] = true
          if (pathsData.steps[i+1]) {
            setTimeout(this.animate(pathsData, i+1), 1000)
          } else {
            this.completed()
          }
        }
        
      }
    })
  }

  show(textShow) {
    if (this.pressed) {
      return
    }
    this.pressed = true
    
    let span = document.createElement('span')
    let text = document.createTextNode(textShow)
    span.appendChild(text)
    span.classList.add('tag', 'is-large', 'is-warning')
  
    let div = document.getElementById('show')
  
    div.appendChild(span)
  
    div.style.position = 'absolute'
    div.style.left = '50%'
    div.style.zIndex = 100
    div.style.paddingTop = '5em'
  
    setTimeout(() => {
      let op = 1
      let timer = setInterval(() => {
        if (op <= 0.1){
          clearInterval(timer)
          span.remove()
          div.removeAttribute('style')
          this.pressed = false
        }
        span.style.opacity = op
        span.style.filter = 'alpha(opacity=' + op * 100 + ')'
        op -= op * 0.1
      }, 30)
    }, 2000)
  }

  completed() {
    this.animation = false
  
    for (let i=0; i<this.numAnts; i++) {
      this.canvas.remove(this.ants[i+1])
    }
    this.animated = []
    this.ants = {}
    this.antPrevRoom = {}
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
  let burger = document.querySelector('.burger')
  let menu = document.querySelector('#'+burger.dataset.target);
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
