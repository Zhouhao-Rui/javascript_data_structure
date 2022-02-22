// 单向链表

function LinkedList() {
    // 属性
    this.head = null

    // 内部节点
    function Node(data) {
        // 初始next为null
        this.data = data
        this.next = null
    }

    // 链表的长度
    this.length = 0

    //append
    LinkedList.prototype.append = (data) => {
        let newNode = new Node(data)
        // 判断是否为第一个
        if (this.length == 0) {
            // 让header指向这个节点
            this.head = newNode
        }else {
            // 首先将current作为head指向的节点
            let current = this.head
            // 搜索直到最后一个节点
            while (current.next) {
                current = current.next
            }
            // 最后一个节点的next是新的节点值
            current.next = newNode
        }
        this.length += 1
    }
    // tostring
    LinkedList.prototype.toString = () => {
        // 定义变量
        let current = this.head
        let res = ""

        // 循环所有的节点
        while (current) {
            res += current.data + " "
            current = current.next
        }
        return res
    }

    //insert
    LinkedList.prototype.insert = (position, data) => {
        // 对position进行越界判断
    //    -1
        if (position < 0 || position > this.length) {
            return false
        }

        // 根据data创建出节点
        let newNode = new Node(data)

        // 向正确的位置插入节点
        if (position == 0) {
            // 从头开始，第一个指向的为head
            newNode.next = this.head
            // 改变head
            this.head = newNode

            /**
             * 这里不可以反过来操作，因为如果先改变head，就找不到第一个元素了，next指针失效
             */
        }else {
            let index = 0
            let current = this.head
            let previous = null
            while (index ++ < position) {
                // 这样可以找到对应position的node
                console.log("index", index)

                previous = current
                current = current.next
                console.log("current", current)
            }

            newNode.next = current
            previous.next = newNode
        }
        this.length += 1
        return true
    }

    //get
    LinkedList.prototype.get = (position) => {
        // 越界判断
        if (position < 0 || position >= this.length) {
            return null
        }
        let current = this.head
        let index = 0
        while (index ++  < position) {
            current = current.next
        }
        return current.data
    }

    // indexof
    LinkedList.prototype.indexOf = (element) => {
        let current = this.head
        let index = 0
        while (current) {
            if (current.data == element) {
                return index
            }
            current = current.next
            index += 1
        }
        // 没有找到
        return -1
    }

    // update
    LinkedList.prototype.update = (position, element) => {
        // 判断越界
        if (position >= this.length || position < 0) {
            return false
        }
        let index = 0
        let current = this.head
        while (index < position) {
            current = current.next
            index ++
        }
        current.data = element
        return true
    }

    // RemoveAt
    LinkedList.prototype.removeAt = (position) => {
        if (position < 0 || position >= this.length) {
            return false
        }

        // 判断删除第一个
        if (position == 0) {
            this.head = this.head.next
        }else {
            let index = 0
            let current = this.head
            let previous = null
            // 找到这个current
            while (index < position) {
                previous = current
                current = current.next
                index += 1
            }
            previous.next = current.next
        }
        this.length -= 1
        return true
    }

    //remove
    LinkedList.prototype.remove = (element) => {
        // 根据element获取到位置
        let position = this.indexOf(element)
        return this.removeAt(position)
    }

    // isEmpty
    LinkedList.prototype.isEmpty = () => {
        return this.length == 0
    }

    // size
    LinkedList.prototype.size = () => {
        return this.length
    }
}

let list = new LinkedList()

list.append("abc")
list.append("cbd")
list.append("lll")
list.insert(2, "qqq")
console.log(list.get(2))
console.log(list.indexOf("lll"))
console.log(list.update(2, "ckk"))
console.log(list.removeAt(2))
console.log(list.remove('qqq'))
console.log(list.toString())