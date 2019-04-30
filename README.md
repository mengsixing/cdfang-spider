# cdfang-spider

[![Build Status](https://www.travis-ci.org/yhlben/cdfang-spider.svg?branch=master)](https://www.travis-ci.org/yhlben/cdfang-spider)
[![codecov](https://codecov.io/gh/yhlben/cdfang-spider/branch/master/graph/badge.svg)](https://codecov.io/gh/yhlben/cdfang-spider)
[![David](https://img.shields.io/david/yhlben/cdfang-spider.svg)](https://david-dm.org/yhlben/cdfang-spider)

> 成都房协网数据分析

每 15 分钟爬取房协网数据，保存到数据库，前端读取元数据，用可视化图表框架渲染。

## 使用

```shell
git clone https://github.com/yhlben/cdfang-spider.git
cd cdfang-spider
npm i
npm run dev
```

## 特点

- 手动搭建 react 环境
- 手动搭建 koa 环境
- 支持 rest 和 graphql 接口
- nodejs 爬虫
- 可视化数据分析

## 客户端

- react
- less
- bizcharts
- antd

## 服务器端

- koa
- graphql
- mongoose
- cheerio
- node-schedule

## 工程化

- webpack
- eslint
- gulp
- jest

## TODOLIST

- [x] antd icon 打包过大（官方还未提供按需加载，已使用替代方案优化）
- [x] webpack 打包优化（持续）
- [x] graphql 接口支持
- [x] typescript 支持
- [ ] 页面性能优化（持续）
