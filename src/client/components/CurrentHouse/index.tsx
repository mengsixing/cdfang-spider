import * as React from 'react';
import { Collapse, List, Col, Row, Icon } from 'antd';
import './styles.less';
import { AppContext } from '../../context/appContext';

const { useContext } = React;
const { Panel } = Collapse;

function CurrentHouse() {
  const appState = useContext(AppContext);
  const { allData } = appState;
  const currentHouses = allData
    .filter(item => item.status !== '报名结束')
    .map(item => (
      // eslint-disable-next-line no-underscore-dangle
      <div className="current-house-list" key={item._id}>
        <Row>
          <Col span={4}>
            {' '}
            <span className="notification-icon">
              <Icon type="notification" />
            </span>
            {' '}
            {item.area}
          </Col>
          <Col span={8}>{item.name}</Col>
          <Col span={4}>{`${item.number}套`}</Col>
          <Col span={8}>
            登记截止时间：
            {`${item.endTime} `}
            <a
              className="register-link"
              rel="nofollow me noopener noreferrer"
              target="_blank"
              href="https://gfdj.cdfgj.gov.cn/lottery/accept/index"
            >
              登记
            </a>
          </Col>
        </Row>
      </div>
    ));
  return (
    <div className="content-card">
      <Collapse defaultActiveKey={['1']}>
        <Panel header="正在登记" key="1">
          <List
            bordered
            dataSource={currentHouses}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Panel>
      </Collapse>
    </div>
  );
}

export default CurrentHouse;
