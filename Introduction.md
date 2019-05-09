# 项目介绍

本项目属于个人学习实战项目，使用项目来整理平时所学。

## 项目选型

1. 三大框架里选哪个？

   - react。个人爱好，也比较看好。

2. 引入强类型语言？

   - 使用 typescript，为 js 提供类型支持，编辑器友好，增加代码可维护性，使用起来心里踏实。
   - 在使用第三方库时，可以写出更加符合规范的代码，避免 api 滥用等。
   - 项目中依赖了大量 @types/xxx 包，无形中增加了项目体积。
   - 编辑器对 ts 文件进行类型检查，需要遍历 node_modules 目录下所有的 @types 文件，会造成编辑器卡顿现象。
   - 目前仍然存在很多库没有 @types 支持，使用起来并不方便。

3. css 选型？

   - 预编译器 less，项目中只使用了选择器嵌套，选择器复用等，less 够用了。
   - 解决命名冲突可以使用 css modules，暂未考虑 css in js。

4. 构建工具选哪个？

   - webpack。内置 tree shaking，scope hosting 等，打包效率高，社区活跃。

5. js 代码规范？

   - 使用 eslint。辅助编码规范执行，有效控制代码质量。同时支持 typescript。

6. 测试框架选型？

   - jest，大而全，包含：测试框架，断言库，mock 数据，覆盖率等。

7. 后端框架选型？

   - koa，精简好用，中间件机制强大。

8. 数据库选型？

   - mongodb，类 json 的存错格式，方便存储，简单易用。

9. 接口方式选型？

   - graphql。根据需要格式获取对应数据，减少接口冗余数据。

基本框架选型完毕，接下来就开始搭建项目环境。

## 搭建 TypeScript 环境

TypeScript 是 JavaScript 的超集，意味着可以完全兼容 JavaScript 文件，但 TypeScript 文件却并不能直接在浏览器中运行，需要经过编译生成 JavaScript 文件后才能运行。

1、 新建 tsconfig.json 文件。

- tsc 命令会根据此文件配置的规则，将 ts 代码转换为 js 代码。
- tslint 会读取该文件中的规则，辅助编码规范校验。
  - tslint 官宣会被废弃，eslint 将代替 tslint 检查 ts 文件。
  - eslint 同样会用到 tsconfig.json 文件中的内容。

2、 配置 eslint。

根据 typescript-eslint 引导，配置 eslint 对 typescript 的支持。

- @typescript-eslint/parser 解析 ts 语法。
- @typescript-eslint/eslint-plugin 为 ts 文件应用 eslint 和 tslint 规则。

3、 选择一个 typescript 编译器，tsc 还是 babel？

使用 babel，好处如下：

- babel 社区有许多非常好的插件，babel-preset-env 可以支持到具体兼容浏览器的版本号，而 tsc 编译器没这个功能。
- babel 可以同时支持编译 js 和 ts，所以没必要在引入 tsc 编译 ts 文件，只管理一个编译器，可维护性更高。
- 更快的编译速度。tsc 编译器做的工作很多，它会扫描类型定义文件（\*.d.ts），包括 node_modules 里的，以确保你的代码里正确地使用，所以速度很慢。

> **babel 流程分析**
>
> babel 是一个 js 语法编译器，在编译时分为 3 个阶段：解析、转换、输出。
>
> - 解析阶段：将 js 代码解析为抽象语法树（ast）。
> - 转换阶段：对 ast 进行修改，产生一个新的 ast。
> - 输出阶段：将新的 ast 输出成 js 文件。
>
> **plugin 和 preset**
>
> - plugin: 是包括：解析，转换，输入在一起的东西。
> - preset: 是一组组合好的 plugin 集合。

4、搜集所有的 ts，tsx 页面（前端环境使用 webpack，node 项目使用 gulp），然后通过 babel 编译成 js 文件。

## 搭建 React 环境

react 是一个库，基于组件式开发，开发时常常需要用到以下语法：

- es6 模块化
- jsx 语法
- typescript 语法
- css 预处理器

这些语法在目前浏览器中并不能直接执行，需要进行打包编译，这也是搭建 React 环境的主要工作。

### 具体步骤

1、新建一个 html 文件，并在 body 中创建一个根节点，用于挂载 react 最后生成的 dom。

2、新建一个 index.tsx 文件，用于将项目中的所有组件，引入进来，并调用 render 方法，将组件渲染到根节点中。

3、React 项目分层。

- containers 目录，存放单独的页面
- components 目录，存放的是组件，一个组件包含 jsx 和 css 两个部分。
- context 目录，存放公用的 react context。
- config 目录，存放公共配置文件。
- utils 目录，公用的函数组件库。

4、配置 webpack，以 index.tsx 为入口文件，进行打包编译。

- 由于不同环境的打包方式并不相同，这里抽象出 3 个环境的配置文件，使用 webpack-merge 合并配置文件。
- 配置 css 预处理器，使用 less-loader。
- 配置 ts 编译器，使用 babel-loader。
- 配置 url-loader，打包项目中的图片资源。
- 配置 html-webpack-plugin 将最后生成的 js，css，注入第 1 步的 html 中。
- 热启动配置，使用开箱即用的 webpack-dev-server。

> webpack 打包原理
>
> webpack 打包过程就像是一条流水线，从入口文件开始，搜集项目中所有文件的依赖关系，如果遇到不能够识别的模块，就使用对应的 loader 转换成能够识别的模块。webpack 还能使用 plugin 在流水线生命周期中挂载自定义事件，来控制输出。

经过以上的配置，React 的环境就已经搭建完毕了。

## 搭建 NodeJs 环境

这里是基于 web 服务器，这里选择使用精简的 koa 框架。

1、建立 model 层，负责链接数据库，获取和更新数据。

- 使用 mongoose 更方便的对 mongodb 数据库进行读写操作。
- 封装好处理数据的方法，提供给 controller 层使用。

2、建立 controller 层，控制 web 层路由，根据前端请求，调用 model 层获取数据。

- 根据前端请求，处理对应的业务逻辑，需要对数据进行操作，就调用 model 层提供的方法。
- 编写中间件，记录系统日志，错误处理，404 页面等。

3、建立 views 层，由于本项目前端使用 react 渲染，所以这一块由前端打包生成。

- node 层提供一个静态文件服务器，用来访问前端打包后生成的 html 文件。

4、配置 gulp，让 node 端支持新的 es 语法、编译后端 ts 文件。

- 配置 gulp，遍历每一个 ts 文件，调用 babel，输出编译后的 js 文件。

## 搭建测试环境

1、新建 jest.config.js 文件。

- 配置初始化 setup.ts 文件。
- 配置测试匹配的测试文件。
- 配置 mock 数据文件。
- 配置测试文件的编译方式。
- 配置代码覆盖率文件。

2、新建\_\_mocks\_\_，\_\_tests\_\_目录，存放测试文件和 mock 数据。

- 按照 src 中的目录，建立相应的测试文件目录。

3、新建 setup.ts ，该文件会在运行时首先执行，在这里统一注入测试框架，全局变量等。

## 参考链接

- [TypeScript 和 Babel](https://juejin.im/post/5c822e426fb9a04a0a5ffb49)
- [前端决策树](https://github.com/sorrycc/f2e-decision-tree)
