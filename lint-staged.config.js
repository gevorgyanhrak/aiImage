const sharedPrettierTargets = '*.{json,md,mdx}';

/** @type {import('lint-staged').Config} */
module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': ['pnpm exec eslint --fix --max-warnings=0'],
  'tests/**/*.{js,jsx,ts,tsx}': ['pnpm exec eslint --fix --max-warnings=0'],
  [sharedPrettierTargets]: ['pnpm exec prettier --write'],
};
