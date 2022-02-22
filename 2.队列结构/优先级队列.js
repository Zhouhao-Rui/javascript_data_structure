function priority_queue() {
    this.items = []

    // 封装一个新的函数，含有优先级和元素
    function queue_element(element, priority) {
        this.element = element
        this.priority = priority
    }

    priority_queue.prototype.enqueue = (element, priority) => {
        // 1. 创建queue_element对象
        const queueElement = new queue_element(element, priority)
        // 2. 判断items数组是否为空，分两种情况进行操作
        if (this.items.length === 0) {
            this.items.push(queueElement)
        } else {
            let added = false
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if (!added) {
                this.items.push(queueElement)
            }
        }
    }
    priority_queue.prototype.dequeue = () => {
        return this.items.shift()
    }

    priority_queue.prototype.front = () => {
        return this.items[0]
    }

    priority_queue.prototype.isEmpty = () => {
        return this.items.length == 0
    }

    priority_queue.prototype.size = () => {
        return this.items.length
    }

    priority_queue.prototype.toString = () => {
        let result_str = ''

        for (let i = 0; i < this.items.length; i++) {
            result_str += this.items[i] + ' '
        }
        return result_str
    }
}
let pq = new priority_queue()
pq.enqueue('abc', 111)
pq.enqueue('cdb', 200)
pq.enqueue('rss', 300)
pq.enqueue('hgh', 50)
console.log(pq)
