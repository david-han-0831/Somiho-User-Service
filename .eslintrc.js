/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:jsx-a11y/recommended',
      'next/core-web-vitals',
      'prettier',
    ],
    rules: {
      // 💡 필요한 룰만 켜두고, 불필요한 건 꺼두면 좋아
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'react/react-in-jsx-scope': 'off', // Next.js에서는 필요 없음
      'react/prop-types': 'off', // TypeScript 쓰므로 필요 없음
      'jsx-a11y/anchor-is-valid': 'off', // Next.js의 <Link>를 위한 예외 처리
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  