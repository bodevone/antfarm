
function generateNumNodes(d) {
  const maxNumNodes = 15
  const minNumNodes = 5
  const min = Math.ceil(minNumNodes)
  const max = Math.floor(maxNumNodes)
  var n = 1
  while (n*d % 2 != 0) {
    n = Math.floor(Math.random() * (max - min) + min)
  }
  return n
}

function generateStartNode(numNodes) {
  return Math.floor(Math.random() * numNodes)
}

function generateEndNode(start, edges) {
  let visited = new Set()
  let graph = new Map()
  let queue = new LinkedList()
  for (const [n1, n2] of edges) {
    if (!graph.has(n1)) {
      graph.set(n1, new Array())
    }
    if (!graph.has(n2)) {
      graph.set(n2, new Array())
    }
    graph.get(n1).push(n2)
    graph.get(n2).push(n1)
  }
  visited.add(start)
  queue.pushBack(start)
  let end
  while (!queue.isEmpty()) {
    const node = queue.popFront()
    end = node
    for (const neighbour of graph.get(node)) {
      if (visited.has(neighbour)) {
        continue
      }
      visited.add(neighbour)
      queue.pushBack(neighbour)
    } 
  }
  return end

}

function generateEdges(n, d) {
  function _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  function _isSuitable(edges, potentialEdges) {
    if (potentialEdges.size == 0) {
      return true
    }
    for (let s1 of potentialEdges.keys()) {
      for (let s2 of potentialEdges.keys()) {
        if (s1 == s2) {
          break
        }
        if (s1 > s2) {
          [s1, s2] = [s2, s1]
        }
        let edge = [s1, s2]
        if (!edges.has(edge)) {
          return true
        }
      }
    }
    return false
  }

  function _createEdges() {
    let edges = new Set()
    let stubs = Array.from({ length: n * d }, (_, index) => index % n)
    while (stubs.length > 0) {
      let potentialEdges = new Map()
      
      _shuffle(stubs)

      for (let i=1; i<stubs.length; i=i+2) {
        let s1 = stubs[i-1]
        let s2 = stubs[i]
        if (s1 > s2) {
          [s1, s2] = [s2, s1]
        }
        let edge = [s1, s2]
        if (s1 != s2 && !edges.has(edge)) {
          edges.add(edge)
        } else {
          potentialEdges.set(s1, (potentialEdges[s1] || 0) + 1)
          potentialEdges.set(s2, (potentialEdges[s2] || 0) + 1)
        }
      }

      if (!_isSuitable(edges, potentialEdges)) {
        edges = null
      }

      stubs = []
      for (let [node, potential] of potentialEdges.entries()) {
        for (let i = 0; i < potential; i++) {
          stubs.push(node)
        }
      }
    }
    return edges
  }
  let edges = new Set()
  while (edges === null || edges.size == 0) {
    edges = _createEdges()
  }
  return Array.from(edges)
}

function generatePositions(edges, nnodes, iterations = 50, threshold = 1e-4, dim = 2) {
  const nodes = Array.from(new Set(edges.flat()));

  function _norm(vector) {
      return Math.sqrt(vector.reduce((sum, component) => sum + component ** 2, 0));
  }

  function _clip(value, lower, upper) {
      return Math.max(Math.min(value, upper), lower);
  }

  let pos = Array.from({ length: nnodes }, () => Array.from({ length: dim }, () => Math.random()));
  k = Math.sqrt(1.0 / nnodes);
  
  let max_x = pos[0][0];
  let min_x = pos[0][0];
  let max_y = pos[0][1];
  let min_y = pos[0][1];

  for (const [x, y] of pos) {
      max_x = Math.max(max_x, x);
      min_x = Math.min(min_x, x);
      max_y = Math.max(max_y, y);
      min_y = Math.min(min_y, y);
  }

  let t = Math.max(max_x - min_x, max_y - min_y) * 0.1;
  const dt = t / (iterations + 1);

  const A = Array.from({ length: nnodes }, () => Array.from({ length: nnodes }, () => 0.0));
  let ind = 0;
  const nodeMap = new Map();

  for (const [n1, n2] of edges) {
      if (!nodeMap.has(n1)) {
          nodeMap.set(n1, ind++);
      }
      if (!nodeMap.has(n2)) {
          nodeMap.set(n2, ind++);
      }

      const i = nodeMap.get(n1);
      const j = nodeMap.get(n2);
      A[i][j] = 1.0;
      A[j][i] = 1.0;
  }

  const delta = Array.from({ length: nnodes }, () => Array.from({ length: nnodes }, () => Array.from({ length: dim }, () => 0)));

  for (let iter = 0; iter < iterations; iter++) {
      const displacement = Array.from({ length: nnodes }, () => Array.from({ length: dim }, () => 0.0));

      for (let i = 0; i < nnodes; i++) {
          for (let j = 0; j < nnodes; j++) {
              for (let d = 0; d < dim; d++) {
                  delta[i][j][d] = pos[i][d] - pos[j][d];
                  const distance = _norm(delta[i][j]);
                  const clippedDistance = _clip(distance, 0.01, Infinity);
                  displacement[i][d] += delta[i][j][d] * (k * k / (clippedDistance ** 2) - A[i][j] * clippedDistance / k);
              }
          }
      }

      const length = displacement.map(vec => _norm(vec)).map(l => l < 0.01 ? 0.1 : l);
      
      const deltaPos = Array.from({ length: nnodes }, (_, i) => Array.from({ length: dim }, (_, d) => displacement[i][d] * t / length[i]));
      
      for (let i = 0; i < nnodes; i++) {
          for (let d = 0; d < dim; d++) {
              pos[i][d] += deltaPos[i][d];
          }
      }
      t -= dt;
      const normDeltaPos = _norm(deltaPos.map(vec => _norm(vec)));
      if ((normDeltaPos / nnodes) < threshold) {
          break;
      }
  }
  const result = Object.fromEntries(nodes.map((node, i) => [node, pos[i]]));
  return scalePositions(result);
}

function scalePositions(positionMap) {
  const nodes = Array.from(Object.keys(positionMap));
  const positions = Array.from(Object.values(positionMap));

  const minValues = positions[0].slice();
  const maxValues = positions[0].slice();

  for (const pos of positions) {
      for (let i = 0; i < pos.length; i++) {
          minValues[i] = Math.min(minValues[i], pos[i]);
          maxValues[i] = Math.max(maxValues[i], pos[i]);
      }
  }

  const scaledPositionMap = new Map();

  for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const pos = positions[i];

      const scaledPos = pos.map((value, i) =>
          0.1 + 0.8 * ((value - minValues[i]) / (maxValues[i] - minValues[i]))
      );

      scaledPositionMap.set(node, scaledPos);
  }

  return scaledPositionMap;
}

function generateGraph() {
  const d = 3
  const numNodes = generateNumNodes(d)
  const edges = generateEdges(numNodes, d)
  const start = generateStartNode(numNodes)
  const end = generateEndNode(start, edges)
  const positions = generatePositions(edges, numNodes)
  
  return {"edges": edges, "positions": positions, "numNodes": numNodes, "start": start, "end": end}
}
