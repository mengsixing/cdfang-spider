/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Loading from '../Loading';
import { AppContext } from '../../context/appContext';

const { useContext } = React;

export const RenderLoadingComponent = (
  WrapperedComponent: React.FunctionComponent<any>,
  LoadingHeight = '300px'
) => {
  function Temp(props: any) {
    const { isLoading } = useContext(AppContext);
    return isLoading ? (
      <Loading height={LoadingHeight} tip="加载中..." />
    ) : (
      <WrapperedComponent {...props} />
    );
  }
  return Temp;
};

export function RenderLoadingJSX(
  WrapperedComponent: JSX.Element,
  isLoading: boolean
): JSX.Element {
  return isLoading ? <Loading tip="加载中..." /> : WrapperedComponent;
}
