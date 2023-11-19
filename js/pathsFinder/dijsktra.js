function checkVertice(graph, pq, v) {
  let room = graph.rooms.get(v)
  if (room.split && room.costIn > room.costOut+room.priceOut-room.priceIn && v != graph.start) {
    room.edgeIn = room.edgeOut
    room.costIn = room.costOut + room.priceOut - room.priceIn
    if (room.costIn != room.costOut) {
      pq.push(room.costIn, v)
    }
  }  
  if (!room.split && room.costOut > room.costIn+room.priceIn-room.priceOut && v != graph.end) {
    room.edgeOut = room.edgeIn
    room.costOut = room.costIn + room.priceIn - room.priceOut
    if (room.costIn != room.costOut) {
      pq.push(room.costOut, v)
    }
  }
}

function checkEdge(graph, pq, v1, v2) {
  let room1 = graph.rooms.get(v1)
  let room2 = graph.rooms.get(v2)
  if (v1 == graph.end || v2 == graph.start || room2.parent == v1) {
    return
  }
  if (room1.parent == v2 && room1.costIn < MAX_N_ROOMS && (1+room2.costOut > room1.costIn+room1.priceIn-room2.priceOut)) {
    room2.edgeOut = v1
    room2.costOut = room1.costIn - 1 + room1.priceIn - room2.priceOut
    pq.push(room2.costOut, v2)
    checkVertice(graph, pq, v2)
  } else if (room1.parent != v2 && room1.costOut < MAX_N_ROOMS && room2.costIn-1 > room1.costOut+room1.priceOut-room2.priceIn) {
    room2.edgeIn = v1
    room2.costIn = room1.costOut + 1 + room1.priceOut - room2.priceIn
    pq.push(room2.costIn, v2)
    checkVertice(graph, pq, v2)
  }
}

function changePrices(graph) {
  for (const room of graph.rooms.values()) {
    room.priceIn = room.costIn
    room.priceOut = room.costOut
  }
}

function dijsktra(graph) {
  let pq = new PriorityQueue()
  graph.reset()
  pq.push(0, graph.start)
  while (pq.size() > 0) {
    let v1 = pq.pop()
    for (const v2 of graph.rooms.get(v1).edges) {
      checkEdge(graph, pq, v1, v2)
    }
  }
  changePrices(graph)
  return graph.rooms.get(graph.end).edgeIn != "L"
}
 