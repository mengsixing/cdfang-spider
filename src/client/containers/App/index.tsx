import * as React from 'react';
import { Layout, BackTop } from 'antd';
import { hot } from 'react-hot-loader/root';
import Header from '../../components/Header';

import { COPYRIGHT, BEIAN_ICP } from '../../constants';

import './styles.less';

const App: React.FunctionComponent = ({ children }) => {
  return (
    <div>
      <BackTop />
      <Layout>
        <Layout.Header>
          <Header />
        </Layout.Header>
        {children}
        <Layout.Footer style={{ textAlign: 'center' }}>
          <div>
            <a href="http://www.beian.miit.gov.cn/" target="blank">
              {BEIAN_ICP}
            </a>
          </div>
          <div>{COPYRIGHT}</div>
        </Layout.Footer>
      </Layout>
    </div>
  );
};

export default hot(App);
