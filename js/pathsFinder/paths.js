class Paths {
  constructor() {
    this.numPaths = 0
    this.numSteps = 0
    this.allPaths = []
    this.assignment = []
  }

  calcSteps(numAnts) {
    let shortest = this.allPaths[0].len()
    let longest = this.allPaths [this.allPaths.length-1].len()
    let sum = 0
    for (let i=0; i<this.numPaths; i++) {
      sum += longest - this.allPaths[i].len()
    }
    let nAnts = longest - shortest + (numAnts-sum) / this.numPaths
    let rem = (numAnts-sum) % this.numPaths
    if (rem > 0) {
      nAnts++
    }
    this.numSteps = shortest + nAnts - 1
  }

  findAssignment(numAnts) {
    let longest = this.allPaths [this.allPaths.length-1].len()
    let sum = 0
    for (let i=0; i<this.numPaths; i++) {
      sum += longest - this.allPaths[i].len()
    }
    let fn = parseFloat(numAnts-sum) / parseFloat(this.numPaths)
    let remSteps = (fn - parseFloat(parseInt(fn))) * parseFloat(this.numPaths)
    for (let i=0; i<this.numPaths; i++) {
      let assignNum = longest-this.allPaths[i].len()+parseInt(fn)
      if (remSteps > 0) {
        assignNum++
        remSteps--
      }
      this.assignment.push(assignNum)
    }
  }
}
