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
    messages: ['Sort imports']
  },


  create(context) {
    const sourceCode = context.getSourceCode();
    const text = sourceCode.getText();

    function sortImports(imports) {
      const result = [...imports];

      result.sort((a, b) => getImportPriority(a) - getImportPriority(b) ||
        a.source.value.localeCompare(b.source.value));
      return result;
    }

    function findUnsorted(nodes, sorted) {
      const node = nodes.find((node, i) => node !== sorted[i]);
      return node;
    }

    function getUnsorted(current, sorted) {
      const sortingMap = current.map((val, i) => [val, sorted[i]])
      const unsortedNodes = sortingMap.filter((x) => x[0] !== x[1])
      return unsortedNodes
    }

    const getTextRange = (left, right) => {
      return [left.range[0], right.range[1]]
    }

    function getNodeRange(source, node) {
      return getTextRange(source.getCommentsBefore(node)[0] || node, node)
    }

    function getNodeText(source, node) {
      return source.getText().slice(...getNodeRange(source, node))
    }

    function getImportPriority(node) {
      if (node.type === 'VariableDeclaration') return 5;
      const value = node.source.value;
      if (value.startsWith('@')) {
        return 1
      }
      if (value.startsWith('../')) {
        return 3
      }
      if (value.startsWith('.')) {
        return 4
      }
      else {
        return 2
      }
    }


    return {
      Program(program) {
        const nodes = program.body.filter(el => el.type == 'ImportDeclaration' || (el.type == 'VariableDeclaration' && el.declarations.some(decl => decl.init && decl.init.type === 'ImportExpression')));

        if (nodes.length <= 1) return;
        const sortedImports = sortImports(nodes)
        const firstUnsortedNode = findUnsorted(nodes, sortedImports)
        if (firstUnsortedNode) {
          context.report({
            node: firstUnsortedNode,
            message: 'Sort imports',
            fix(fixer) {
              const temp = [];
              for (const [node, replacement] of getUnsorted(nodes, sortedImports)) {
                const range = getNodeRange(sourceCode, node)
                const text = getNodeText(sourceCode, replacement)
                temp.push(
                  fixer.replaceTextRange(range, text)
                )
              }
              return temp
            }
          });
        }
        for (let i = 1; i < nodes.length; i++) {
          const node = nodes[i]
          const prevNode = nodes[i - 1]

          const nodeOrComment = sourceCode.getCommentsBefore(node)[0] || node
          const rangeBetween = [
            prevNode.range[1],
            nodeOrComment.range[0],
          ];
          const actualSeparator = text
            .slice(...rangeBetween)
            .replace(/[^\n]/g, "")
            .replace("\n", "")
          const isSameGroup = getImportPriority(sortedImports[i - 1]) === getImportPriority(sortedImports[i])
          if (isSameGroup) {
            if (actualSeparator !== "") {
              context.report({
                message: "extraNewlines",
                loc: {},
                fix: (fixer) => fixer.replaceTextRange(rangeBetween, "\n"),
              })
            }
          }
          else if (actualSeparator !== "\n") {
            context.report({
              message: "missing separator",
              loc: {},
              fix: (fixer) => fixer.insertTextAfter(prevNode, "\n"),
            })
          }
        }
      }
    }
  }
}