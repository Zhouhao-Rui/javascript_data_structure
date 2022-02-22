function DoubleLinkedList() {
    this.head = null
    this.tail = null
    this.length = 0
    function Node(item) {
        this.prev = null
        this.item = item
        this.next = null
    }

    // 方法的封装
    DoubleLinkedList.prototype.append = (element) => {
        // 1.根据元素创建节点
        let newNode = new Node(element)

        // 2.判断列表是否为空列表
        if (this.head == null) {
            // 如果为空的话，头指针和尾指针都是指向这个插入的元素
            this.head = newNode
            this.tail = newNode
        } else {
            // 如果不为空，直接在尾指针上面next指向新的元素
            this.tail.next = newNode
            // 新元素的prev进行赋值，但是tail不需要更改，因为本来就是null
            newNode.prev = this.tail
            this.tail = newNode
        }

        // 3.length+1
        this.length++

    }

    DoubleLinkedList.prototype.toString = () => {
        return this.backwardString()
    }

    DoubleLinkedList.prototype.forwardString = () => {
        let current = this.tail
        let res_str = ""
        // 依次向前遍历
        while (current) {
            res_str += current.item
            current = current.prev
        }
        return res_str
    }

    DoubleLinkedList.prototype.backwardString = () => {
        let current = this.head
        let result_str = ""
        // 依次向后遍历
        while (current) {
            result_str += current.item
            current = current.next
        }
        return result_str
    }

    DoubleLinkedList.prototype.insert = (position, data) => {
        // 越界判断
        if (position > this.length || position < 0) {
            return false
        }
        // 根据data创建节点
        let newNode = new Node(data)
        // 找到正确的位置
        if (this.length == 0) {
            this.head = newNode
            this.tail = newNode
        }else {
            if (position == 0) {
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            } else if (position == this.length) {
                this.tail.next = newNode
                newNode.prev = this.tail
                this.tail = newNode
            } else {
                let current = this.head
                let index = 0
                // 找到正确的位置
                while (index ++ < position) {
                    current = current.next
                }
                // 替代掉current
                newNode.next = current
                newNode.prev = current.prev
                current.prev.next = newNode
                current.prev = newNode
            }
        }
        this.length += 1
    }

    DoubleLinkedList.prototype.get = (position) => {
        // 越界判断
        if (position >= this.length || position < 0) {
            return null
        }
        if (position < this.length / 2) {
            let current = this.head
            let index = 0
            while (index++ < position) {
                current = current.next
            }
            return current.item
        }else {
            let current = this.tail
            let index = this.length
            while (index -- > position) {
                current = current.prev
                console.log('current', current)
            }
            return current.item
        }
    }

    DoubleLinkedList.prototype.indexOf = (element) => {
        let current = this.head
        let index = 0
        // 向后找
        while (current) {
            if (current.item == element) {
                return index
            }
            current = current.next
            index += 1
        }
        return -1
    }

    DoubleLinkedList.prototype.removeAt = (position) => {
        // 越界判断
        if (position < 0 || position >= this.length) {
            return null
        }
        let current = this.head
        // 具体删除
        if (this.length == 1) {
            this.head = null
            this.tail = null
        }else {
            if (position == 0) {
                this.head.next.prev = null
                this.head = this.head.next
            } else if (position == this.length - 1) {
                this.tail.prev.next = null
                this.tail = this.tail.prev
            }else {
                // 找到当前节点
                let index = 0
                while (index ++ < position) {
                    current = current.next
                }
                current.prev.next = current.next
                current.next.prev = current.prev
            }
        }
        this.length -= 1
        return current.item
    }

    DoubleLinkedList.prototype.remove = (element) => {
        const index = this.indexOf(element)

        return this.removeAt(index)
    }

    DoubleLinkedList.prototype.isEmpty = () => {
        return this.length == 0
    }

    DoubleLinkedList.prototype.size = () => {
        return this.length
    }

    // 获取链表的第一个元素
    DoubleLinkedList.prototype.getHead = () => {
        return this.head.item
    }

    DoubleLinkedList.prototype.getTail = () => {
        return this.tail.item
    }
}

// test
let list = new DoubleLinkedList()
list.append('abc')
list.append('fgh')
list.append('qwe')

console.log(list)
list.insert(0, "jjy")
list.insert(3, "ffd")
console.log(list.get(3))
console.log(list.indexOf('asa'));
console.log(list.removeAt(3))
console.log(list.backwardString())
