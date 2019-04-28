module.exports = {
  setupFiles: ['./__tests__/setup.js', 'jest-canvas-mock'],
  moduleFileExtensions: ['js', 'jsx','ts','tsx', 'json'],
  testMatch: ['**/__tests__/**/*.(test|spec).js?(x)'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverageFrom: ['src/client/components/**/*.{js,jsx}', '!**/node_modules/**'],
};
