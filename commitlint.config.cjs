module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, etc)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Test additions or changes
        'build', // Build system changes
        'ci', // CI configuration changes
        'chore', // Other changes that don't modify src or test files
        'revert', // Revert a previous commit
      ],
    ],
    'subject-case': [2, 'never', ['upper-case']],
    'subject-min-length': [2, 'always', 3],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
  },
};
