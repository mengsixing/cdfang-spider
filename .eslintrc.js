module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "eslint-config-airbnb",
    "plugin:@typescript-eslint/recommended",
    // 关闭可能与 prettier 有冲突的规则
    "prettier",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  rules: {
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
    "react/jsx-props-no-spreading": 0,
    "@typescript-eslint/ban-ts-ignore":0,
    "@typescript-eslint/no-empty-function":0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ]
  },
  // 解决不能直接默认导入 ts 文件 的问题。import/no-unresolved
  settings: {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack.base.config.js"
      }
    }
  },
  overrides: [
    {
      "files": ["*.ts"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": 0,
      }
    },
    {
      "files": ["*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": 0,
        "react/prop-types": 0
      }
    }
  ]
};
