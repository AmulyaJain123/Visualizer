export function addInBinarySearchTree(tree, value) {
  let node = tree;
  if (tree === null) {
    return {
      val: value,
      right: null,
      left: null,
    };
  }
  while (1) {
    if (node.val > value) {
      if (node.left) {
        node = node.left;
      } else {
        node.left = { val: value, right: null, left: null };
        return tree;
      }
    } else {
      if (node.right) {
        node = node.right;
      } else {
        node.right = { val: value, right: null, left: null };
        return tree;
      }
    }
  }
}

export function objectTreeToArray(root) {
  const height = heightOfTree(root);
  const array = [];
  for (let i = 0; i < height; ++i) {
    const arr = new Array(parseInt(Math.pow(2, i))).fill(null);
    array.push(arr);
  }
  function add(x, y, node) {
    if (!node) {
      return
    }
    array[x][y] = node.val;
    add(x + 1, y * 2, node.left)
    add(x + 1, y * 2 + 1, node.right)
  }
  add(0, 0, root);
  return JSON.parse(JSON.stringify(array));

}

export function heightOfTree(root) {
  function solver(root) {
    if (!root) {
      return 0;
    }
    return 1 + Math.max(heightOfTree(root.right), heightOfTree(root.left))
  }
  const height = solver(root);
  return height;
}
