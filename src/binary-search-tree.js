const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class TreeNode {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  insert(value) {
    const newNode = new TreeNode(value);

    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      this.insertNode(this.rootNode, newNode);
    }
  }

  insertNode(parent, newNode) {
    if (newNode.value < parent.value) {
      if (!parent.leftChild) {
        parent.leftChild = newNode;
      } else {
        this.insertNode(parent.leftChild, newNode);
      }
    } else {
      if (!parent.rightChild) {
        parent.rightChild = newNode;
      } else {
        this.insertNode(parent.rightChild, newNode);
      }
    }
  }

  contains(value) {
    return this.search(this.rootNode, value);
  }

  search(node, value) {
    if (!node) {
      return false;
    }

    if (value < node.value) {
      return this.search(node.leftChild, value);
    } else if (value > node.value) {
      return this.search(node.rightChild, value);
    } else {
      return true;
    }
  }

  findNode(value) {
    return this.find(this.rootNode, value);
  }

  find(node, value) {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      return this.find(node.leftChild, value);
    } else if (value > node.value) {
      return this.find(node.rightChild, value);
    } else {
      return node;
    }
  }

  remove(value) {
    this.rootNode = this.removeNode(this.rootNode, value);
  }

  removeNode(node, value) {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.leftChild = this.removeNode(node.leftChild, value);
    } else if (value > node.value) {
      node.rightChild = this.removeNode(node.rightChild, value);
    } else {
      if (!node.leftChild && !node.rightChild) {
        return null;
      } else if (!node.leftChild) {
        return node.rightChild;
      } else if (!node.rightChild) {
        return node.leftChild;
      } else {
        const minValue = this.findMin(node.rightChild);
        node.value = minValue;
        node.rightChild = this.removeNode(node.rightChild, minValue);
      }
    }

    return node;
  }

  findMin(node) {
    while (node.leftChild) {
      node = node.leftChild;
    }
    return node.value;
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    return this.findMin(this.rootNode);
  }

  findMax(node) {
    while (node.rightChild) {
      node = node.rightChild;
    }
    return node.value;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    return this.findMax(this.rootNode);
  }
}

module.exports = {
  BinarySearchTree
};