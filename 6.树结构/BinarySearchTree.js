function BinarySearchTree() {
    // root属性
    this.root = null

    // 节点
    function Node(key) {
        this.key = key
        this.left = null
        this.right = null
    }

    // 插入数据
    BinarySearchTree.prototype.insert = function (key) {
        // 根据key创建节点
        let newNode = new Node(key)
        // 判断是否存在根节点
        if (this.root == null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    BinarySearchTree.prototype.insertNode = (node, newNode) => {
        /**
         * node: 和新节点比较的node
         * newNode: 新节点
         */
        if (newNode.key < node.key) {
            // 向左查找
            // 左子节点为空
            if (node.left == null) {
                node.left = newNode
            }else {
                this.insertNode(node.left, newNode)
            }
        }else {
            // 向右查找
            // 右节点为空
            if (node.right == null) {
                node.right = newNode
            }else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    // 先序遍历的实现
    BinarySearchTree.prototype.preOrderTraversal = (handler) => {
        this.preOrderTraversalNode(this.root, handler)
    }
    // 第一次：node 根节点
    // 第二次：node 左节点
    // 第三次: node 左节点的左节点
    // 第四次：node左节点的左节点的左节点
    BinarySearchTree.prototype.preOrderTraversalNode = (node, handler) => {
        if (node == null) {
            return
        }else {
            // 1。处理经过的节点
            handler(node.key)
            // 处理经过节点的左子节点
            this.preOrderTraversalNode(node.left, handler)
            // 处理经过节点的右子节点
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    // 中序遍历
    BinarySearchTree.prototype.inOrderTraversal = (handler) => {
        this.inOrderTraversalNode(this.root, handler)
    }

    BinarySearchTree.prototype.inOrderTraversalNode = (node, handler) => {
        if (node != null) {
            this.inOrderTraversalNode(node.left, handler)
            handler(node.key)
            this.inOrderTraversalNode(node.right, handler)
        }
    }

    // 后序遍历
    BinarySearchTree.prototype.postOrderTraversal = (handler) => {
        this.postOrderTraversalNode(this.root, handler)
    }

    BinarySearchTree.prototype.postOrderTraversalNode = (node, handler) => {
        if (node != null) {
            this.postOrderTraversalNode(node.left, handler)
            this.postOrderTraversalNode(node.right, handler)
            handler(node.key)
        }
    }

    // 最大值和最小值
    BinarySearchTree.prototype.searchMin = () => {
        // 拿到根节点
        let node = this.root
        // 左节点还存在，一直往左走
        while (node.left) {
            node = node.left
        }
        // 左节点不存在了，返回
        return node
    }

    BinarySearchTree.prototype.searchMax = () => {
        // 拿到根节点
        let node = this.root
        // 一直向右查找
        while (node.right) {
            node = node.right
        }
        return node
    }

    BinarySearchTree.prototype.search = (key) => {
        return this.searchNode(this.root, key)
    }
    BinarySearchTree.prototype.searchNode = (node, key) => {
        // 如果根节点为空，直接返回
        if (node == null) {
            return false
        }

        if (node.key > key) {
            return this.searchNode(node.left, key)
        }else if (node.key < key) {
            return this.searchNode(node.right, key)
        }else {
            return true
        }
    }

    BinarySearchTree.prototype.remove = (key) => {
        // 寻找要删除的节点
        let current = this.root
        let parent = null
        let isLeftChild = true

        // 开始寻找删除的节点
        // 大条件：查找的节点和当前节点不相同
        while (current.key != key) {
            parent = current
            if (key < current.key) {
                isLeftChild = true
                current = current.left
            }else {
                isLeftChild = false
                current = current.right
            }

            // 没有找到，已经找到了叶节点，依然没有相等的key
            if (current == null) {
                return false
            }
        }

        // 根据对应的情况删除节点
        // 删除的节点是叶子节点
        if (current.left == null && current.right == null) {
            // 删除节点是根节点，并且也是一个根节点
            if (current == this.root) {
                this.root = null
                // 根据isLeftChild来判断是左子节点还是右子节点
            }else if (isLeftChild) {
                parent.left = null
            }else {
                parent.right = null
            }
        }
        // 删除的节点有一个子节点
        // parent.left = current.left
        // parent.right = current.right
        else if (current.right == null) {
            if (current == this.root) {
                this.root = current.left
            }
            else if (isLeftChild) {
                parent.left = current.left
            }else {
                parent.right = current.left
            }
        } else if (current.left == null) {
            if (current == this.root) {
                this.root = current.right
            }
            else if (isLeftChild) {
                parent.left = current.right
            }else {
                parent.right = current.right
            }
        }
        // 删除的节点有两个子节点

    }
    BinarySearchTree.prototype.getSuccessor = (delNode) => {
        let successor = delNode
        let current = delNode.right
        let successorParent = delNode

        while (current != null) {
            successorParent = successor
            successor = current
            current = current.left
        }

        if (successor != delNode.right) {
            successorParent.left = successor.right
            successor.right = delNode.right
        }
        return successor
    }
}

// 测试代码
let binary_search_tree = new BinarySearchTree()
binary_search_tree.insert(11)
binary_search_tree.insert(7)
binary_search_tree.insert(15)
binary_search_tree.insert(5)
binary_search_tree.insert(3)
binary_search_tree.insert(9)
binary_search_tree.insert(8)
binary_search_tree.insert(10)
binary_search_tree.insert(13)
binary_search_tree.insert(12)
binary_search_tree.insert(14)
binary_search_tree.insert(20)
binary_search_tree.insert(18)
binary_search_tree.insert(25)
binary_search_tree.insert(6)

// 测试
// let res = ''
// binary_search_tree.preOrderTraversal(function (key) {
//     res += key + ' '
// })
// console.log(res)

// let res = ''
// binary_search_tree.inOrderTraversal(function (key) {
//     res += key + ' '
// })
// console.log(res)

let res = ''
binary_search_tree.postOrderTraversal(function (key) {
    res += key + ' '
})

console.log(res)

console.log(binary_search_tree.searchMin())
console.log(binary_search_tree.searchMax())
console.log(binary_search_tree.search(24))
console.log(binary_search_tree.remove(3))