function Set() {
    // 属性
    this.items = {}
    // 方法
    Set.prototype.add = (value) => {
        // 判断集合中是否已经包含了该元素
        if (this.has(value)) {
            return false
        }
        // 将元素添加到集合中
        this.items[value] = value
        return true
    }

    Set.prototype.has = (value) => {
        return this.items.hasOwnProperty(value)
    }

    Set.prototype.remove = (value) => {
        // 判断是否有这个元素
        if (! this.items.hasOwnProperty(value)) {
            return false
        }
        // 删除这个元素
        delete this.items[value]
        return true
    }

    Set.prototype.clear = () => {
        this.items = {}
    }

    Set.prototype.size = () => {
        return Object.keys(this.items).length
    }

    Set.prototype.values = () => {
        return Object.values(this.items)
    }

    // 集合间的操作
    Set.prototype.union = (otherSet) => {
        // this: 集合对象A
        // otherSet: 集合对象B
        // 1，创建新的集合
        let unionSet = new Set()

        // 2. 将A集合中所有的元素添加到新集合中
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        // 3. 取出B集合中的元素，判断是否需要添加到新元素
        values = otherSet.values()
        for (let i = 0; i < values.length; i ++) {
            unionSet.add(values[i])
        }
        return unionSet
    }

    Set.prototype.intersection = (otherSet) => {
        // 创建新的集合
        let intersection = new Set()
        // 将集合A遍历
        let values = this.values()
        for (let i = 0; i < values.length; i ++) {
            if (otherSet.has(values[i])) {
               intersection.add(values[i])
            }
        }
        return intersection
    }

    Set.prototype.difference = (otherSet) => {
        let difference = new Set()
        // 将集合A遍历
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (! otherSet.has(values[i])) {
                difference.add(values[i])
            }
        }
        return difference
    }

    Set.prototype.subSet = (otherSet) => {
        // this: 集合A
        // otherSet: 集合B
        // 遍历A中的所有元素，如果发现A中的元素，在B中不存在，那么false
        // 如果遍历完了整个集合，依然没有false，那么为true
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                return false
            }
        }
        return true

    }

}

let set = new Set()

set.add(1)
set.add(5)
set.add(15)
set.add(30)
set.add(6)
// 取出items
let set2 = new Set()
set2.add(1)
set2.add(2)
set2.add(3)
console.log(Object.values(set.items))

const obj1 = {
    1: 1,
    2: 2,
    3: 3

}

const obj2 = {
    3: 3,
    4: 4,
    5: 5
}

console.log({...obj1 , ...obj2})