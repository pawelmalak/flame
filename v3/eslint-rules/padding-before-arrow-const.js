export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
  },
  create(context) {
    const source = context.sourceCode;

    return {
      VariableDeclaration(node) {
        if (node.kind !== 'const' && node.kind !== 'let') {
          return;
        }

        const hasArrow = node.declarations.some(
          (d) => d.init && d.init.type === 'ArrowFunctionExpression',
        );

        if (!hasArrow) {
          return;
        }

        const tokenBefore = source.getTokenBefore(node, {
          includeComments: true,
        });

        if (!tokenBefore) {
          return;
        }

        if (tokenBefore.value === '{') {
          return;
        }

        // If preceded by `export`, look past it to get the real previous token
        const effectiveTokenBefore =
          tokenBefore.value === 'export'
            ? source.getTokenBefore(tokenBefore, { includeComments: true })
            : tokenBefore;

        if (!effectiveTokenBefore) {
          return;
        }

        if (effectiveTokenBefore.value === '{') {
          return;
        }

        const lineBefore = effectiveTokenBefore.loc.end.line;
        const nodeLine = node.loc.start.line;

        if (nodeLine - lineBefore < 2) {
          context.report({
            node,
            message: 'Expected blank line before arrow function const declaration.',
            fix(fixer) {
              return fixer.insertTextBefore(node, '\n');
            },
          });
        }
      },
    };
  },
};
