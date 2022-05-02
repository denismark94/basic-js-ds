const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  parent = null;
  data = null;
  leftChild = null;
  rightChild = null;
  root() {
    if (this.parent) return this.parent.root()
    else if (this.data) return this
    else return null
  }

  add(data) {
    if (this.data) {
      if (data < this.data) {
        if (!this.leftChild) {
          this.leftChild = new BinarySearchTree();
          this.leftChild.parent = this;
        }
        this.leftChild.add(data);
      } else {
        if (!this.rightChild) {
          this.rightChild = new BinarySearchTree();
          this.rightChild.parent = this;
        }
        this.rightChild.add(data);
      }
    } else {
      this.data = data;
    }
  }

  has(data) {
    if (this.data === data) 
      return true;
    if (data < this.data) {
      if (this.leftChild) return this.leftChild.has(data)
      else return false;
    }
    else {
      if (this.rightChild) return this.rightChild.has(data)
      else return false;
    }
  }

  find(data) {
    if (this.data === data) return this;
    if (data < this.data) {
      if (this.leftChild) return this.leftChild.find(data);
      else return null;
    } else {
      if (this.rightChild) return this.rightChild.find(data);
      else return null;
    }
  }

  remove(data) {
    if (this.data === data) {
      if (!this.leftChild) {
        if (this.data < this.parent.data) {
          this.parent.leftChild = this.rightChild;
          if (this.rightChild)
            this.rightChild.parent = this.parent;
        }
        else  {
          this.parent.rightChild = this.rightChild;
           if (this.rightChild)
            this.rightChild.parent = this.parent;
        }
      } else if (!this.rightChild) {
        if (this.data < this.parent.data) this.parent.leftChild = this.leftChild;
        else this.parent.rightChild = this.leftChild;
      } else {
        this.data = this.rightChild.min()
        this.rightChild.remove(this.data);
      }
    } else if (data < this.data) {
      if (this.leftChild) return this.leftChild.remove(data);
    } else {
      if (this.rightChild) return this.rightChild.remove(data);
    }
  }

  min() {
    if (this.leftChild) return this.leftChild.min();
    else return this.data;
  }

  max() {
    if (this.rightChild) return this.rightChild.max();
    else return this.data;
  }
}

module.exports = {
  BinarySearchTree
};