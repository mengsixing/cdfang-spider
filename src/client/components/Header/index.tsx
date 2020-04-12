import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  GithubFilled,
  CalendarOutlined,
} from '@ant-design/icons';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import Notice from '../Notice';
import { tabKeyRouterMap, GITHUB_URL } from '../../constants';
import { requestPvs, requestData } from '../../utils/request';
import { AppContext } from '../../context/appContext';
import './styles.less';

const { useState, useEffect, useContext } = React;

const Header: React.FunctionComponent<RouteComponentProps> = ({
  history,
  location,
}) => {
  const gotoGithub = () => {
    window.location.href = GITHUB_URL;
  };
  const appState = useContext(AppContext);
  const [pvs, changePvs] = useState(0);

  const selectedYear = tabKeyRouterMap[location.pathname];

  const requestDataWrapper = (year: string) => {
    appState.changeLoading(true);
    requestData(year, (allHouses: cdFang.IhouseData[]) => {
      appState.changeData(allHouses);
      appState.changeLoading(false);
    });
  };

  useEffect(() => {
    // 获取 pv
    requestPvs((pvNumber: number): void => {
      changePvs(pvNumber);
    });

    // 获取房源信息
    requestDataWrapper(selectedYear);
  }, []);

  // 根据理由选中对应 menu 项
  const defaultYear = [selectedYear];

  // 路由切换
  const clickMenu = ({ key }: { key: string }) => {
    if (key !== selectedYear) {
      history.push(tabKeyRouterMap[key]);
      requestDataWrapper(key);
    }
  };

  return (
    <div className="cdfang-header">
      <div className="cdfang-header-item">
        <span className="cdfang-header-item-pv">{`累计查询：${pvs}次`}</span>
        <Notice />
        <GithubFilled onClick={gotoGithub} />
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={defaultYear}
        onClick={clickMenu}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">
          <HomeOutlined />
          首页
        </Menu.Item>
        <Menu.Item key="2019">
          <CalendarOutlined />
          2019年
        </Menu.Item>
        <Menu.Item key="2018">
          <CalendarOutlined />
          2018年
        </Menu.Item>
        <Menu.Item key="2017">
          <CalendarOutlined />
          2017年
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default withRouter(Header);
