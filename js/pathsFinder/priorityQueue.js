class PQItem {
  constructor(priority, value) {
    this.priority = priority
    this.value = value
  }
}

class PriorityQueue {
  constructor() {
    this.heap = []
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (
      currentIndex > 0 &&
      this.heap[currentIndex].priority < this.heap[this.getParentIndex(currentIndex)].priority
    ) {
      const parentIndex = this.getParentIndex(currentIndex)
      this.swap(currentIndex, parentIndex)
      currentIndex = parentIndex
    }
  }

  push(priority, value) {
    const pqItem = new PQItem(priority, value)
    this.heap.push(pqItem)
    this.heapifyUp()
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      let leftChildIndex = this.getLeftChildIndex(currentIndex)
      let rightChildIndex = this.getRightChildIndex(currentIndex)
      let smallestIndex = currentIndex

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex].priority < this.heap[smallestIndex].priority
      ) {
        smallestIndex = leftChildIndex
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].priority < this.heap[smallestIndex].priority
      ) {
        smallestIndex = rightChildIndex
      }

      if (currentIndex === smallestIndex) {
        break;
      }

      this.swap(currentIndex, smallestIndex)
      currentIndex = smallestIndex
    }
  }

  pop() {
    if (this.isEmpty()) {
      return null
    }
    const top = this.heap[0].value
    if (this.size() == 1) {
      this.heap.pop()
      return top
    }
    this.heap[0] = this.heap.pop()
    this.heapifyDown()
    return top
  }
}
