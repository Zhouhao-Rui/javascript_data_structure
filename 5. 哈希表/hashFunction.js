function hash_func(str, max) {
    // 定义hashcode
    let hash_code = 0;

    // 霍纳算法
    for (let i = 0; i < str.length; i++) {
        hash_code = 31 * hash_code + str.charCodeAt(i)
    }
    hash_code = hash_code % max
    return hash_code
}
//
// console.log(hash_func("rzh", 11))
// console.log(hash_func("whx", 11))
function isPrime(num) {
    let temp = Math.ceil(Math.sqrt(num))

    for (let i = 2; i < temp; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return true

}
function getPrime(num) {
    while (!isPrime(num)) {
        num ++
    }
    return num
}

function HashTable() {
    this.storage = [] // 数组存放元素
    this.count = 0 // 当前存放了多少元素
    this.limit = 7 // 总个数

    // 放入或者修改元素
    HashTable.prototype.put = (key, val) => {
        // 根据key映射到下标值
        const index = hash_func(key, this.limit)

        // 拿出数字
        let bucket = this.storage[index]
        // 如果当前数组不存在，添加一个数组
        if (bucket === undefined) {
            bucket = []
            this.storage[index] = bucket
        }
        // 如果key重复，会直接覆盖
        // 对数组进行遍历。判断是插入还是修改,override 是否覆盖
        let override = false
        for (let i = 0; i < bucket.length; i ++) {
            let tuple = bucket[i]
            if (tuple[0] == key) {
                tuple[1] = val
                override = true
            }

            if (this.count > this.limit * 0.75) {
                let newLimit = this.limit * 2
                newLimit = getPrime(newLimit)
                this.resize(newLimit)
            }
        }
        // 如果没有覆盖，那么就是新增
        if (! override) {
            bucket.push([key, val])
            this.count += 1
        }
    }
    // 根据key获取value
    HashTable.prototype.get = (key) => {
        // 获取下标值
        const index = hash_func(key, this.limit)
        // 根据下标值获得bucket
        const bucket = this.storage[index]
        // 如果bucket不存在
        if (bucket === undefined) {
            return null
        }
        // 遍历bucket，一个个查找
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] == key) {
                return tuple[1]
            }
        }
        return null
    }

    // 根据key删除元素
    HashTable.prototype.remove = (key) => {
        const index = hash_func(key, this.limit)

        const bucket = this.storage[index]
        if (bucket === undefined) {
            return null
        }

        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count --
                if (this.limit > 8 && this.count < this.limit * 0.25) {
                    let newLimit = Math.floor(this.limit / 2)
                    newLimit = getPrime(newLimit)
                    this.resize(Math.floor(this.limit / 2))
                }
                return tuple[1]
            }
        }
        return null
    }
    HashTable.prototype.isEmpty = () => {
        return this.count == 0
    }
    HashTable.prototype.size = () => {
        return this.count
    }

    // 扩容函数
    HashTable.prototype.resize = (new_limit) => {
        // 保存旧的数组中的内容
        let old_storage = this.storage;
        // 重置属性
        this.limit = new_limit
        // 清空所有的数据
        this.storage = []
        this.count = 0

        // 取出old_storage 中的所有元素，放入storage
        old_storage.forEach((bucket) => {
            if (bucket == null) {
                return
            }

            for (let i = 0; i < bucket.length; i++) {
                let tuple = bucket[i]
                this.put(tuple[0], tuple[1])
            }
        })

    }
}

let hashTable = new HashTable()
hashTable.put("name", "zhangsan")
hashTable.put("age", 18)
hashTable.put("age", 20)
console.log(hashTable)
console.log(hashTable.get("name"))
console.log(hashTable.remove("age"))
console.log(isPrime(10))