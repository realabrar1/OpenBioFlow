/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/out/**",
      "**/.venv/**",
      "**/venv/**",
      "**/infrastructure/**",
      "**/terraform/**"
    ]
  }
];
