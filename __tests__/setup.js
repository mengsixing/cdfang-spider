import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

global.window.console.error = () => {
  // console.warn(...a);
};

global.window.console.warn = () => {
  // console.warn(...a);
};
// refs only work with mount, yes.

configure({
  adapter: new Adapter(),
  disableLifecycleMethods: false,
});
