// import * as Adapter from 'enzyme-adapter-react-16';
// import { configure } from 'enzyme';
// import { GlobalWithFetchMock } from 'jest-fetch-mock';

// // 处理 jsdom canvas 报错
// customGlobal.console.error = () => {};
// customGlobal.console.warn = () => {};

// configure({
//   adapter: new Adapter(),
//   disableLifecycleMethods: false,
// });
// import '@testing-library/jest-dom/extend-expect';
// import * as dayjs from 'dayjs'

const customGlobal = global;

// customGlobal.fetch = require('jest-fetch-mock');

// customGlobal.fetchMock = customGlobal.fetch;

Object.defineProperty(customGlobal, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('dayjs');
