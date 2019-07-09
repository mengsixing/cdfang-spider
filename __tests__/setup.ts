import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { GlobalWithFetchMock } from 'jest-fetch-mock';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

customGlobal.fetch = require('jest-fetch-mock');

customGlobal.fetchMock = customGlobal.fetch;

// 处理 jsdom canvas 报错
customGlobal.console.error = () => {};
customGlobal.console.warn = () => {};

configure({
  adapter: new Adapter(),
  disableLifecycleMethods: false
});
