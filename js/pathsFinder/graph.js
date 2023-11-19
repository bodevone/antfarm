const MAX_N_ROOMS = 100000

class Room {
  constructor() {
    this.parent = "L"
    this.edges = new Set()
    this.edgeIn
    this.edgeOut
    this.priceIn = 0
    this.priceOut = 0
    this.costIn = 0
    this.costOut = 0
    this.split = false
  }
}

class Graph {
  constructor() {
    this.rooms = new Map()
    this.exits = new LinkedList()
    this.start
    this.end
    this.numAnts
  }

  buildFromData(data) {
    this.numAnts = data.numAnts
    this.start = data.start
    this.end = data.end

    for (const roomName of data.rooms) {
      this.rooms.set(roomName, new Room())
    }

    for (let connection of data.connections) {
      const [roomName1, roomName2] = connection.split("-")
      let room1 = this.rooms.get(roomName1)
      let room2 = this.rooms.get(roomName2)
      room1.edges.add(roomName2)
      room2.edges.add(roomName1)
    }
  }

  reset() {
    for (const room of this.rooms.values()) {
      room.edgeIn = "L"
      room.edgeOut = "L"
      room.costIn = MAX_N_ROOMS
      room.costOut = MAX_N_ROOMS
    }
    let room = this.rooms.get(this.start)
    room.costIn = 0
    room.costOut = 0
  }
}