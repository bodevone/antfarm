function getPath(graph, v) {
  let path = new LinkedList()
  path.pushFront(graph.end)
  while (v !== graph.start) {
    path.pushFront(v)
    v = graph.rooms.get(v).parent
  }
  return path
}

function getGraphPaths(graph) {
  let paths = new Paths()
  paths.numPaths = graph.exits.len()
  let link = graph.exits.front()
  while (link != null) {
    p = getPath(graph, link.value)
    paths.allPaths.push(p)
    link = link.next
  }
  paths.allPaths.sort((a, b) => a.len() - b.len())
  paths.calcSteps(graph.numAnts)
  return paths
}

function getPaths(graph) {
  if (!suurballe(graph)) return null

  return getGraphPaths(graph)
}

function findBestPaths(graph) {
  let bestPaths = getPaths(graph)
  if (bestPaths == null) {
    return null
  }
  for (let i=1; i++; i<graph.numAnts) {
    let currPaths = getPaths(graph)
    if (currPaths == null) break

    if (currPaths.numSteps < bestPaths.numSteps) bestPaths = currPaths
  }
  return bestPaths
}

function formatPaths(paths, numAnts) {
  let result = {}
  paths.findAssignment(numAnts)
  let lastAnt = 0
  let antNum = 1
  let activeAnt = 1
  let m = new Map()
  let steps = new Array()
  for (let j=0; j<paths.numSteps; j++) {
    let currStep = new Map()
    for (let k=activeAnt; k<=lastAnt; k++) {
      const val = m.get(k)
      if (val != null) {
        currStep.set(k, val.value)
        m.set(k, val.next)
      } else {
        activeAnt = k + 1
        m.delete(k)
      }
    }
    for (let i=0; i<paths.numPaths; i++) {
      if (antNum > numAnts) break
      if (paths.assignment[i] <= 0) continue

      paths.assignment[i]--
      currStep.set(antNum, paths.allPaths[i].front().value)
      m.set(antNum, paths.allPaths[i].front().next)
      antNum++
    }
    if (currStep.size > 0) steps.push(currStep)
    lastAnt = antNum - 1
  }
  result["steps"] = steps
  return result
}

function findPaths(data) {
  let graph = new Graph()
  graph.buildFromData(data)
  let paths = findBestPaths(graph)
  return formatPaths(paths, graph.numAnts)
}
