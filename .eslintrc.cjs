module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "no-unused-vars": 1,
    "@typescript-eslint/no-unused-vars": "warn",
    "no-empty-interface": 0,
    "@typescript-eslint/no-empty-interface": [
      "warn",
      {
        allowSingleExtends: true,
      },
    ],
    "no-param-reassign": [
      1,
      {
        props: true,
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "import/extensions": 0,
  },
};
