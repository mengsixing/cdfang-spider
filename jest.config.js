module.exports = {
  setupFiles: ['./__tests__/setup.ts', 'jest-canvas-mock'],
  moduleFileExtensions: ['js', 'jsx','ts','tsx', 'json'],
  testMatch: ['**/__tests__/**/*.(test|spec).ts?(x)'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverageFrom: ['src/client/components/**/*.{ts,tsx}', '!**/node_modules/**'],
};
