# cdfang-spider

[![Build Status](https://www.travis-ci.org/yhlben/cdfang-spider.svg?branch=master)](https://www.travis-ci.org/yhlben/cdfang-spider)
[![codecov](https://codecov.io/gh/yhlben/cdfang-spider/branch/master/graph/badge.svg)](https://codecov.io/gh/yhlben/cdfang-spider)
[![David](https://img.shields.io/david/yhlben/cdfang-spider.svg)](https://david-dm.org/yhlben/cdfang-spider)

> 成都房协网数据分析

统计成都自摇号以来所有的房源信息，通过图表的形式展示出来。

## Preview

在线预览：[https://cdfangyuan.cn](https://cdfangyuan.cn)

源代码：[https://github.com/yhlben/cdfang-spider](https://github.com/yhlben/cdfang-spider)

## Features

已实现的功能：

- [x] 房源数据同步最新。
- [x] 首页：登记中房源、汇总统计展示。
- [x] 首页：按楼盘数、房源数统计，及统计结果排名。
- [x] 首页：按区域统计，汇总表查询。
- [x] 历史页：年度汇总统计展示。
- [x] 历史页：按房源数、区域、月份统计，及统计结果排名。
- [x] 历史页：按房源数、楼盘数、区域统计，汇总表查询。

## Technology

主要用到的技术：

- React：MVVM 框架，用于构建前端界面。
- Ant Design：基于 React 的组件库。
- Bizchats：基于 React 的图表库。
- Less：CSS 预处理器，提供变量、计算、嵌套、Mixin、函数等。
- Webpack：打包前端项目，生成静态文件。
- Apollo：基于 GraphQL 封装，用于搭建后端 GraphQL 支持和前端数据请求。
- Koa：后端 Web 层框架，用于接收请求，进行处理。
- Cheerio：解析抓取的 HTML 数据。
- Mongoose：为 MongoDB 定义数据模型。
- Gulp：打包后端项目，编译 TS 语法。
- Jest：测试前后端项目，单元测试，API 测试等。
- Typescript：为 JS 提供良好的类型检查功能，能编译出高质量的 JS 代码。

项目没有使用脚手架工具搭建，都是一步一步配置而成。具体的搭建流程：[项目选型与环境搭建](https://github.com/yhlben/cdfang-spider/blob/master/Introduction.md)。

## Start

```shell
# clone with Git Bash
git clone https://github.com/yhlben/cdfang-spider.git

# change directory
cd cdfang-spider

# install dependencies
npm i

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Deploy

```shell
# clone with Git Bash
git clone https://github.com/yhlben/cdfang-spider.git

# change directory
cd cdfang-spider/docker

# run docker containers. It may take a long time.
docker-compose up -d

# server running at localhost:8082
```

## License

[MIT](https://github.com/yhlben/cdfang-spider/blob/master/LICENSE)

Copyright (c) 2018-present yhlben
