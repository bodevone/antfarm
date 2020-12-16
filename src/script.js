import * as fabric from 'fabric'

import '@/styles/style.css'
import '@/styles/style.scss'

let scale = 1
const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth
const RADIUS = WIDTH / 25
const RADIUSANT = WIDTH / 55
const LEFT = WIDTH / 2
const TOP = HEIGHT / 2
const LEFT_MAIN = WIDTH / 5
const RIGHT_MAIN = 4 * WIDTH / 5
const LINE_WIDTH = RADIUS / 5
const COLORMAIN = '#FF652F'
const COLOR = '#FFE400'
const COLORANT = '#14A76C'
const CONNECTION = '#747474'
const ANIMATION_TEXT = 'Animation in progress'
const URL = 'https://www.antfarm.ml/api/'
const END = 100

const EXAMPLES = [
  {
    "rooms": [[1/2, 1/4], [5/12, 3/4], [7/12, 3/4]],
    "connections": [[0, 2], [2, 1], [0, 3], [3, 4], [4, 1]]
  },
  {
    "rooms": [[7/20, 1/2], [1/2, 1/2], [13/20, 1/2], [7/20, 7/20], [1/2, 7/20], [1/2, 4/5], [13/20, 4/5], [4/5, 4/5], [1/5, 1/5], [17/40, 1/5], [13/20, 1/5]],
    "connections": [[0, 2], [2, 3], [3, 4], [4, 1], [0, 5], [5, 6], [6, 3], [2, 7], [7, 8], [8, 9], [9, 1], [0, 10], [10, 11], [11, 12], [12, 4]]
  }
]

let canvas
let selected = false

let rooms = {}
let connections = {}
let data = {}
data.ants = 1

let output = {}
let ants = {}
let antPrevRoom = {}

function createCanvas() {
  canvas = new fabric.Canvas('c')
  canvas.selection = false
  canvas.setDimensions({width:window.innerWidth, height:window.innerHeight})
}

function order(num1, num2) {
  let str1 = num1.toString()
  let str2 = num2.toString()
  if (num1 < num2) {
    return str1 + '-' + str2
  }
  return str2 + '-' + str1
}

class AntFarm {
  constructor() {
    this.id = 0
    this.exampleCounter = 0
    this.animation = false
    this.pressed = false
    this.animated = []

    this.addEventListeners()
    this.newRoom(LEFT_MAIN, TOP, COLORMAIN)
    this.newRoom(RIGHT_MAIN, TOP, COLORMAIN)
  }

  addEventListeners() {
    canvas.on('mouse:up', function(e) {
      const p = e.target
      if (p) {
        if (p.type != 'circle') {
          selected = false
        }
      } else {
        selected = false
      }
    })

    canvas.on('object:moving', function(e) {
      let p = e.target
      let length1 = 0
      let length2 = 0
      
      if (p.lines1) {
        length1 = p.lines1.length
      }
      if (p.lines2) {
        length2 = p.lines2.length
      }
      let length = Math.max(length1, length2)
      for (let i=0; i<length; i++) {
        p.lines1[i] && p.lines1[i].set({ 'x1': p.left + RADIUS/scale, 'y1': p.top + RADIUS/scale })
        p.lines1[i] && p.lines1[i].setCoords()
        p.lines2[i] && p.lines2[i].set({ 'x2': p.left + RADIUS/scale, 'y2': p.top + RADIUS/scale })
        p.lines2[i] && p.lines2[i].setCoords()
      }
      canvas.renderAll()
    })


    document.getElementById('clear').addEventListener('click', event => {
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }
      this.newCanvas()
    })

    document.getElementById('example').addEventListener('click', event => {    
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }  
      scale = 2
      this.newCanvas()
      const example = EXAMPLES[this.exampleCounter]
      const rs = example.rooms
      const conns = example.connections

      for (const r of rs) {
        this.newRoom(WIDTH*r[0], HEIGHT*r[1], COLOR)
      }
      for (const c of conns) {
        this.newLine(rooms[c[0]], rooms[c[1]])
      }
      this.exampleCounter++
      if (this.exampleCounter == EXAMPLES.length) {
        this.exampleCounter = 0
      }
    })

    document.getElementById('rangePicker').addEventListener('input', event => {
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }
      const value = event.target.value
      data.ants = parseInt(value)

      const ants = document.getElementById('ants')
      ants.textContent = value
    })

    document.getElementById('add-room').addEventListener('click', () => {
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }
      this.newRoom(LEFT, TOP, COLOR)
    })

    document.getElementById('delete').addEventListener('click', () => {
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }
      const act = canvas.getActiveObject()
      if (act) {
        if (act.type == 'line') {
          this.deleteLine(act)
        } else {
          if (act.id == 0 || act.id == 1) {
            this.show('Cannot delete main rooms')
          } else {
            canvas.remove(act)
            selected = false
            // rooms = rooms.filter(item => item.id !== act.id)
            delete rooms[act.id]

            // Delete line
            if (act.lines1) {
              for (let i=0; i<act.lines1.length; i++) {
                this.deleteLine(act.lines1[i])
              }
            }
            if (act.lines2) {
              for (let i=0; i<act.lines2.length; i++) {
                this.deleteLine(act.lines2[i])
              }
            }
          }
        }
      } else {
        this.show('No object selected')
      }
    })

    document.getElementById('start').addEventListener('click', () => {
      if (this.animation) {
        this.show(ANIMATION_TEXT)
        return
      }
      data.rooms = []
      for (let id in rooms) {
        data.rooms.push(parseInt(id))
      }

      data.connections = []
      for (let connection in connections) {
        data.connections.push(connection)
      }
      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((newData) => {
        output = newData
        this.animateSetup()
      })
      .catch((error) => {
        this.show('Error from server')
      })
    })

  }

  newCanvas() {
    rooms = {}
    connections = {}
    selected = false
    this.id = 0
    canvas.clear()
    this.completed()
    this.newRoom(LEFT_MAIN, TOP, COLORMAIN)
    this.newRoom(RIGHT_MAIN, TOP, COLORMAIN)
  }

  newRoom(left, top, color) {
    const CURR_RADIUS = RADIUS / scale
    let c = new fabric.Circle({
      radius: CURR_RADIUS,
      fill: color,
      left: left - CURR_RADIUS,
      top: top - CURR_RADIUS,
      id: this.id
    })
    c.hasControls = false
  
    c.lines1 = []
    c.lines2 = []
  
    canvas.add(c)
    canvas.bringToFront(c)
    rooms[this.id] = c
    if (this.id!=0 && this.id!=1) {
      canvas.setActiveObject(c)    
    }
    this.id++
    this.clickRoom(c)
  }

  clickRoom(c) {
    c.on('mousedown', e => {      
      if (selected && selected != c) {
        this.newLine(selected, c)
      } else {
        selected = c
      }
    })
  }

  newLine(c1, c2) {
    let temp = order(c1.id, c2.id)
    if (!(temp in connections)) {
      let line
      if (c1.id < c2.id) {
        line = new fabric.Line([c1.left+RADIUS/scale, c1.top+RADIUS/scale, c2.left+RADIUS/scale, c2.top+RADIUS/scale], {
          stroke: CONNECTION,
          strokeWidth: LINE_WIDTH / scale,
          id: temp
        })
        c1.lines1.push(line)
        c2.lines2.push(line)
      } else {
        line = new fabric.Line([c2.left+RADIUS/scale, c2.top+RADIUS/scale, c1.left+RADIUS/scale, c1.top+RADIUS/scale], {
          stroke: CONNECTION,
          strokeWidth: LINE_WIDTH / scale,
          id: temp
        })
        c2.lines1.push(line)
        c1.lines2.push(line)
      }
      line.room1 = c2
      line.room2 = c1

      line.lockMovementX = true
      line.lockMovementY = true
      line.lockScalingX = true
      line.lockScalingY = true
      line.lockUniScaling = true
      line.lockRotation = true
      line.hasControls = false

      canvas.add(line)
      canvas.sendToBack(line)

      connections[temp] = line
      selected = false      

      canvas.discardActiveObject()
      canvas.requestRenderAll()
    }
  }

  deleteLine(act) {
    canvas.remove(act)
  
    let room1 = act.room1
    let room2 = act.room2
  
    room1.lines1 = room1.lines1.filter(line => line.id !== act.id)
    room1.lines2 = room1.lines2.filter(line => line.id !== act.id)
    room2.lines1 = room2.lines1.filter(line => line.id !== act.id)
    room2.lines2 = room2.lines2.filter(line => line.id !== act.id)
  
    delete connections[act.id]
  }

  animateSetup() {
    if (output.Error) {
      this.show(output.ErrorMessage)
    } else {
      this.animation = true
  
      this.lockCanvas()
  
      let left = rooms[0].left + RADIUS / scale - RADIUSANT / scale
      let top = rooms[0].top + RADIUS/scale - RADIUSANT / scale
  
      for (let i=0; i<data.ants; i++) {
        let ant = new fabric.Circle({
          radius: RADIUSANT / scale,
          fill: COLORANT,
          left: left,
          top: top,
          hasControls: false,
          evented: false
        })
        ants[i+1] = ant
        antPrevRoom[i+1] = rooms[0]
        canvas.add(ant)
      }

      for (let i=0; i<=output.Steps.length; i++) {
        this.animated.push(false)
      }

      setTimeout(this.animate(0), 1000)
    }
  }
  
  animate(i) {
    let len = 0
    for (let o in output.Steps[i]) {
      len++
    }
    let curr = 0
    for (const [ant, room] of Object.entries(output.Steps[i])) {
      curr++    
      this.animateAnt(ant, room, i, curr==len)
    }
  }
  
  animateAnt(ant, room, i, last) {
    let fromX = antPrevRoom[ant].left + RADIUS/scale - RADIUSANT/scale
    let fromY = antPrevRoom[ant].top + RADIUS/scale - RADIUSANT/scale
  
    let toX = rooms[room].left + RADIUS/scale - RADIUSANT/scale
    let toY = rooms[room].top + RADIUS/scale - RADIUSANT/scale
  
    let dx = (toX - fromX) / END
    let dy = (toY - fromY) / END

  
    fabric.util.animate({
      startValue: 0,
      endValue: END,
      duration: 1000,
      onChange: value => {
        let x = dx * value
        let y = dy * value
        ants[ant].set({left: fromX + x, top: fromY + y})
        if (last) {
          ants[ant].setCoords()
          canvas.renderAll()
        }
      },
      onComplete: () => {
        if (output.Steps[i] && !this.animated[i]) {
          for (const [ant, room] of Object.entries(output.Steps[i])) {
            antPrevRoom[ant] = rooms[room]
          }
          this.animated[i] = true
          if (output.Steps[i+1]) {
            setTimeout(this.animate(i+1), 1000)
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
      let op = 1;  // initial opacity
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
    this.unlockCanvas()
  
    for (let i=0; i<data.ants; i++) {
      canvas.remove(ants[i+1])
    }
  
    ants = {}
    antPrevRoom = {}
    this.animated = []
  }

  lockCanvas() {
    for (let id in rooms) {
      rooms[id].hasControls = false
      rooms[id].evented = false
    }
    for (let link in connections) {
      connections[link].hasControls = false
      connections[link].evented = false
    }
  }

  unlockCanvas() {
    for (let id in rooms) {
      rooms[id].evented = true
    }
    for (let link in connections) {
      connections[link].evented = true
    }
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
  createCanvas()
  const toggleInfo = new ToggleInfo()
  const antFarm = new AntFarm()
}

window.onload = init

