class Node {
  constructor(left, right, value) {
    this.left = left;
    this.right = right;
    this.value = value;
  }
}


function getNodeOrNull(value) {
  if(value === null){
    return null;
  }
  return new Node(null,null, value);

}

// 应该使用一个队列来处理 
// root , root 弹出, root left, root right
// let array = [null, 1, 2, 4, null, 6, 7, 8, 9, 10, 11];
// let nodeArray = []
// for (let i = 1; i < array.length; i++){
//   if(array[i] == null){
//     continue
//   }
//   let node = getNodeOrNull(array[1]);
//   nodeArray.push(node);
//   if(node){
//     node.left = getNodeOrNull(array[i * 2])
//     node.right = getNodeOrNull(array[i * 2 + 1])
//   }
// }

// 递归生成
function preOrder(){
  if(value == null){
    return
  }
  // new Node(father)
  node.value = value
  preOrder(node.left)
  preOrder(node.right)
}

