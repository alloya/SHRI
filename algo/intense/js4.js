
function Item(v, left, right) {
  return {
      value: v,
      left, right
  }
}
const tree1 = Item(1, Item(2, Item( 3, Item( 4 ),Item( 5 )), Item( 6, Item( 7, Item( 8 ), Item( 9)))), Item(10, Item( 11,Item(12),
        Item( 13)))
)

const tree = (root) => {
  let arr = [root]
  while (arr.length) {
    const temp = arr.pop();
    if (temp.right) {
      arr.push(temp.right)
    }
    if(temp.left) {
      arr.push(temp.left)
    }
    console.log(temp.value)
  }
}


tree(tree1)