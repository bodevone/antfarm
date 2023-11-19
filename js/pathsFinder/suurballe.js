function setNodeSplit(graph, v) {
  if (v != graph.start && v != graph.end) {
    graph.rooms.get(v).split = true
  }
}

function setNodeUnsplit(graph, v) {
  graph.rooms.get(v).split = false
  graph.rooms.get(v).parent = "L"
}

function setGraphPath(graph) {
  let unsplit = false
  let v1 = graph.end
  let v2 = graph.rooms.get(v1).edgeIn
  graph.exits.pushBack(v2)
  while (v1 != graph.start) {
    if (graph.rooms.get(v2).parent == v1) {
      if (unsplit) setNodeUnsplit(graph, v1)
      unsplit = true
      v1 = v2
      v2 = graph.rooms.get(v1).edgeIn
    } else {
      graph.rooms.get(v1).parent = v2
      setNodeSplit(graph, v1)
      unsplit = false
      v1 = v2
      v2 = graph.rooms.get(v1).edgeOut
    }
  }
}

function suurballe(graph) {
  if (!dijsktra(graph)) {
    return false
  }
  setGraphPath(graph)
  return true
}