# cdfang-spider

[![Build Status](https://www.travis-ci.org/yhlben/cdfang-spider.svg?branch=master)](https://www.travis-ci.org/yhlben/cdfang-spider)
[![codecov](https://codecov.io/gh/yhlben/cdfang-spider/branch/master/graph/badge.svg)](https://codecov.io/gh/yhlben/cdfang-spider)
[![David](https://img.shields.io/david/yhlben/cdfang-spider.svg)](https://david-dm.org/yhlben/cdfang-spider)

> 成都房协网数据分析

统计成都自摇号以来所有的房源信息，通过图表的形式展示出来。

## 特点

- 动态获取最新数据
- 支持当前房源统计
- 支持周，月季度，年统计
- 支持房源数和楼盘数统计
- 支持区域分类统计
- 排名统计结果

## 项目选型

项目没有使用脚手架工具搭建，都是一步一步配置而成。搭建时主观使用作者最感兴趣的技术点：typescript，react hooks，graphql 等。具体的搭建流程在这里：[项目选型与环境搭建](https://github.com/yhlben/cdfang-spider/blob/master/Introduction.md)。

前端选型：react，react-router，bizchats，less 等。

后端选型：koa，koa-router，koa-static，cheerio，node-schedule，mongoose，graphql，log4js 等。

工程化选型：webpack，typescript，eslint，gulp，jest，travis 等。

## 使用

```shell
git clone https://github.com/yhlben/cdfang-spider.git
cd cdfang-spider
npm i
npm run dev
```

## 预览

> ![PREVIEW](https://github.com/yhlben/cdfang-spider/blob/master/screenshots/screenshots.gif?raw=true)

## TODOLIST

- [x] antd icon 打包过大（官方还未提供按需加载，已使用替代方案优化）
- [x] webpack 打包优化（持续）
- [x] graphql 接口支持
- [x] typescript 支持
- [ ] 页面性能优化（持续）

项目需要改进的有很多，请大家多提提意见。后续我也会不断改进，谢谢大家支持！
