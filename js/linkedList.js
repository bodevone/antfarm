class LLElement {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  isEmpty() {
    return this.length === 0
  }

  len() {
    return this.length
  }

  front() {
    return this.head
  }

  back() {
    return this.tail
  }

  popFront() {
    if (this.head == null) {
      return null
    }
    this.length -= 1
    let temp = this.head
    this.head = this.head.next
    if (this.head) {
      this.head.prev = null
    }
    return temp.value
  }

  popBack() {
    if (this.head == null) {
      return null
    }
    this.length -= 1
    let temp = this.tail
    this.tail = this.tail.prev
    if (this.tail) {
      this.tail.next = null
    }
    return temp.value
  }

  pushFront(value) {
    this.length += 1
    const newElement = new LLElement(value)
    if (this.head == null) {
      this.head = newElement
      this.tail = newElement
      return
    }
    let temp = this.head
    this.head = newElement
    this.head.next = temp
    temp.prev = this.head
  }

  pushBack(value) {
    this.length += 1
    const newElement = new LLElement(value)
    if (this.head == null) {
      this.head = newElement
      this.tail = newElement
      return
    }
    let temp = this.tail
    this.tail = newElement
    this.tail.prev = temp
    temp.next = this.tail
  }
}
