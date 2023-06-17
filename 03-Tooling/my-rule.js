module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "sort your imports",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options,
    messages: ['custom rule sort-imports']
  },


  create(context) {
    const sourceCode = context.getSourceCode()

    function sortImports(imports) {
      const temp = [...imports]
      temp.sort((a, b) => a.source.value.localeCompare(b.source.value))
      return temp
    }

    function findUnsorted(nodes, sorted) {
      //console.log('findUnsorted nodes', nodes)
      //console.log('findUnsorted sorted', sorted)
      const node = nodes.find((node, i) => node !== sorted[i]);
      //console.log("CHECKKKKK", nodes[2]===sorted[2])
      //console.log('findUnsorted node', node);
      return node;
    }

    function getUnsorted(current, sorted) {
      const sortingMap = current.map((val, i) => [val, sorted[i]])
      // console.log("SORTING MAP", sortingMap[0])

      const unsortedNodes = sortingMap.filter((x) => x[0] !== x[1])
      //console.log("UNSORTED NODES", unsortedNodes[0])
      return unsortedNodes
    }

    const getTextRange = (left, right) => {
      return [left.range[0], right.range[1]]
    }

    function getNodeRange(source, node, includeComments = true) {
      if (includeComments && source.getCommentsBefore(node)[0]) {
        console.log('COMMENTS', source.getCommentsBefore(node)[0])
      }
      console.log("NODE RANGE", getTextRange(
        (includeComments && source.getCommentsBefore(node)[0]) || node,
        node
      ))
      return getTextRange(
        (includeComments && source.getCommentsBefore(node)[0]) || node,
        node
      )
    }

    function getNodeText(source, node, includeComments = true) {
      console.log("NODE TEXT", source.getText().slice(...getNodeRange(source, node, includeComments)))
      return source.getText().slice(...getNodeRange(source, node, includeComments))
    }
    return {
      Program(program) {
        const nodes = program.body.filter(el => el.type == 'ImportDeclaration');
        if (nodes.length <= 1) return;
        const sortedImports = sortImports(nodes)
console.log(sortedImports.map(el => el.source.value))
        const firstUnsortedNode = findUnsorted(nodes, sortedImports)
        //console.log("UNSORTED NODE",firstUnsortedNode)
        if (firstUnsortedNode) {
          let i = 0;
          const isFirstNode = (node) => node === nodes[0]
          context.report({
            node: firstUnsortedNode,
            message: 'custom rule sort-imports',
            *fix(fixer) {
              for (const [node, replacement] of getUnsorted(nodes, sortedImports)) {
                console.log('IIIIIIIIIIIIIIIIIIII', i)
                i++
                yield fixer.replaceTextRange(
                  getNodeRange(sourceCode, node, !isFirstNode(node)),
                  getNodeText(sourceCode, replacement, !isFirstNode(replacement))
                )
              }
            }
          });
        }
      }
    }
  }
}