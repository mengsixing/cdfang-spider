module.exports = {
  testMatch: ['**/__tests__/**/*.(test|spec).ts?(x)'],
  rootDir: "",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  setupFiles: ['./__tests__/setup.ts', 'jest-canvas-mock'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/", "/__mocks__/"],
  collectCoverageFrom: ['src/client/components/**/*.{ts,tsx}', '!**/node_modules/**'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.ts'
  }
};
