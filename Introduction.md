# 项目选型与环境搭建

## 项目选型

1. 三大框架里选哪个？

   - react 个人爱好。
   - react-router 定义路由。
   - react context 状态管理。
   - react hooks 组件化。

2. 引入强类型语言？

   - typescript。为 js 提供类型支持，编辑器友好，增加代码可维护性，使用起来心里踏实。
   - 在使用第三方库时，可以写出更加符合规范的代码，避免 api 乱用等。
   - 项目中依赖了大量 @types/xxx 包，无形中增加了项目体积。
   - 编辑器对 ts 文件进行类型检查，需要遍历 node_modules 目录下所有的 @types 文件，会造成编辑器卡顿现象。
   - 目前仍然存在很多库没有 @types 支持，使用起来并不方便。

3. css 选型？

   - 预编译器 less。项目中使用了变量定义，选择器嵌套，选择器复用等，less 够用了。
   - 解决命名冲突可以使用 css modules，暂未考虑 css in js。
   - 使用 bem 命名规范。
   - 使用 postcss 插件 autoprefixer，增加 css 兼容性。

4. 构建工具选哪个？

   - webpack。内置 tree shaking，scope hosting 等，打包效率高，社区活跃。
   - webpack-merge 合并不同环境配置文件。
   - 配置 externals。引入 cdn 代替 node_modules 中体积较大的包。
   - gulp。用来打包 node 端代码。

5. 代码规范检查？

   - eslint。辅助编码规范执行，有效控制代码质量。同时也支持校验 typescript 语法。
   - 配置 eslint-config-airbnb 规则。
   - 配置 eslint-config-prettier 关闭和 prettier 冲突的规则。

6. 测试框架选型？

   - jest。大而全，包含：测试框架，断言库，mock 数据，覆盖率等。
   - enzyme。测试 react 组件。

7. 后端框架选型？

   - koa。精简好用，中间件机制强大。
   - apollo-server。帮助搭建 graphQL 后端环境。

8. 数据库选型？

   - mongodb。类 json 的存错格式，方便存储，前端友好。
   - 配置 mongoose，方便给 mongodb 数据库建模。

9. 接口方式选型？

   - graphql。可以根据需要格式获取对应数据，减少接口冗余数据。
   - graphql schema 定义了后端接口的参数，操作和返回类型，从此不需要提供接口文档。
   - 前端可以在 schema 定义后开始开发，数据格式自己掌握。
   - schema 可拼接。可以组合和连接多个 graphql api，进行级联查询等。
   - 社区友好，有很多优秀的库可以直接使用： apollo，relay 等。

基本框架选型完毕，接下来就开始搭建项目环境。

## 搭建 TypeScript 环境

TypeScript 是 JavaScript 的超集，意味着可以完全兼容 JavaScript 文件，但 TypeScript 文件却并不能直接在浏览器中运行，需要经过编译生成 JavaScript 文件后才能运行。

1、 新建 tsconfig.json 文件。

- tsc -init 生成初始化 tsconfig.json 文件。
- vscode 会根据 tsconfig.json 文件，进行动态类型检查，语法错误提示等。
- tsc 命令会根据 tsconfig.json 文件配置的规则，将 ts 代码转换为 js 代码。
- tslint 会读取 tsconfig.json 文件中的规则，辅助编码规范校验。
  - tslint 官宣会被废弃，后将被 eslint 代替。
  - eslint 同样会用到 tsconfig.json 文件中的内容。

2、 配置 eslint。

根据 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) 引导，配置 eslint 对 typescript 的支持。

- @typescript-eslint/parser 解析 ts 语法。
- @typescript-eslint/eslint-plugin 为 ts 文件应用 eslint 和 tslint 规则。

3、 选择一个 typescript 编译器，tsc 还是 babel？

使用 babel。好处如下：

- babel 社区有许多非常好的插件，babel-preset-env 可以支持到具体兼容浏览器的版本号，而 tsc 编译器没这个功能。
- babel 可以同时支持编译 js 和 ts，所以没必要在引入 tsc 编译 ts 文件，只管理一个编译器，可维护性更高。
- babel 编译速度更快。tsc 编译器需要遍历所有类型定义文件（\*.d.ts），包括 node_modules 里的，以确保代码中正确地使用，type 太多会造成卡顿。

> **babel 流程分析**
>
> babel 是一个 js 语法编译器，在编译时分为 3 个阶段：解析、转换、输出。
>
> - 解析阶段：将 js 代码解析为抽象语法树（ast）。
> - 转换阶段：对 ast 进行修改，产生一个转换后的 ast。
> - 输出阶段：将转换后的 ast 输出成 js 文件。
>
> **plugin 和 preset**
>
> - plugin: 解析，转换，并输出转换后的 js 文件。例如：@babel/plugin-proposal-object-rest-spread 会输出支持`{...}`解构语法的 js 文件。
> - preset: 是一组组合好的 plugin 集合。例如：@babel/preset-env 让代码支持最新的 es 语法，自动引入需要支持新特性的 plugin。

4、搜集所有的 ts，tsx 页面（前端环境使用 webpack，node 项目使用 gulp），然后通过 babel 编译成 js 文件。

## 搭建 React 环境

React 是一个库，基于组件式开发，开发时常常需要用到以下语法：

- es6 模块化。
- jsx 语法。
- typescript 语法。
- css 预处理器。

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
- constants 目录，存放静态变量。

4、配置 webpack，以 index.tsx 为入口文件，进行打包编译。

- 由于不同环境的打包方式并不相同，这里抽象出开发环境、上线环境、优化环境的配置文件，使用 webpack-merge 合并配置文件。
- 配置 css 预处理器，使用 less-loader。
- 配置 ts 编译器，使用 babel-loader。
  - @babel/preset-env：编译最新的 es 语法。
  - @babel/preset-react：编译 react 语法。
  - @babel/preset-typescript：转换 typescript 语法。
- 配置 url-loader，打包项目中的图片资源。
- 配置 html-webpack-plugin 将最后生成的 js，css，注入第 1 步的 html 中。
  - 使用 ejs 模板配置开发环境和线上环境引入的 cdn。
- 开发环境配置，使用开箱即用的 webpack-dev-server。
  - webpack-dev-server 可以自动监听文件修改，自动刷新页面，以及默认 source-map 等功能。
  - 配置热模块替换，react-hot-loader。

> webpack 打包原理
>
> webpack 打包过程就像是一条流水线，从入口文件开始，搜集项目中所有文件的依赖关系，如果遇到不能够识别的模块，就使用对应的 loader 转换成能够识别的模块。webpack 还能使用 plugin 在流水线生命周期中挂载自定义事件，来控制 webpack 输出结果。

5、编写 npm script，一键开启开发模式。

```json
// cross-env 用来跨环境设置环境变量
"scripts": {
  "dev:client": "cross-env NODE_ENV=development webpack-dev-server --open"
}
```

6、现在运行 `npm run dev:client` 就可以愉快地编写客户端代码了。

## 搭建 NodeJs 环境

由于 node 端使用了 typescript 和最新的 es 语法，所以需要进行打包编译。

- 配置 gulp，遍历每一个 ts 文件，调用 gulp-babel，将 ts 代码转换成 js 代码。
- 配置 supervisor 自动重启 node 服务（nodemon 对于不存在的目录不能进行监控）。
- 编写 npm script 一键启动 node 端开发环境。

```json
"scripts": {
  "dev:server": "cross-env NODE_ENV=development gulp & cross-env NODE_ENV=development supervisor -i ./dist/client/ -w ./dist/ ./dist/app.js",
}
```

配置好 gulp 后，就可以运行 `npm run dev:server` 一键启动服务器端开发环境。

### 层次结构划分

项目采用传统的 mvc 模式进行层次划分。

#### Model 层

Model 层的主要工作：连接数据库，封装数据库操作，例如：新增数据、删除数据、查询数据、更新数据等。

- 新建 model 文件夹，目录下的每一个文件对应数据库的一个表。
- model 文件中包含对一个数据表的增删改查操作。
  - 使用 mongoose 更方便地对 mongodb 数据库进行读写操作。
- model 文件返回封装好的对象，提供给 controller 层使用。

#### Controller 层

Controller 层的主要工作：接收和发送 http 请求。根据前端请求，调用 model 层获取数据，再返回给前端。

> 传统的后端一般还包含 service 层，专门用来处理业务逻辑。

- 根据前端请求，找到对应的 model 层获取数据，经过加工处理后，返回给前端。
- 编写中间件，记录系统日志，错误处理，404 页面等。
- 支持前端 react-router 中的 BrowserRouter。根据前端路由，后端配置对应的路由，匹配结果为 index.html 文件。
- 项目中使用的 graphql 比较基础，也直接放在了 controller 层进行处理。

#### View 层

View 层的主要工作：提供前端页面模板。如果是服务器端渲染，是将 model 层的数据注入到 view 层中，最后通过 controller 层返回给客户端。由于本项目前端使用 react 渲染，所以 view 层直接是经过 webpack 打包后的页面。

- 使用 koa-static 提供一个静态文件服务器，用来访问前端打包后生成的 html 文件。

### 搭建 GraphQL 环境

GraphQL 是一种用于 api 的查询语言，需要服务器端配置 graphql 支持，同时也需要客户端使用 graphql 语法的格式进行请求。

使用 apollo 更快的搭建 graphql 环境。

- 服务器端配置 apollo-server。
  - 使用 schema，定义请求的类型，返回的格式。
  - 使用 resolvers 来处理对应的 schema。
- 客户端配置 apollo-client。
  - 按照 apollo-server 定义的 schema，来请求数据。

### 搭建 MongoDB 环境

MongoDB 是一个面向文档存储的数据库，操作起来十分简单。

Mongoose 为 mongodb 提供了一种直接的，基于 scheme 结构去定义你的数据模型。它内置数据验证，查询构建，业务逻辑钩子等，开箱即用。

- 使用 mongoose 建立和本地 mongodb 的连接。
- 创建 model 模型，一个模型对应 mongodb 里的一张表。
- 根据 model 封装增删改查功能，并返回给 controller 层使用。

接下来的步骤就是安装 mongodb，启动服务，就可以了。

## 搭建测试环境

本项目使用 jest 作为测试框架，jest 包含了断言库、测试框架、mock 数据等功能，是一个大而全的测试库。由于前端使用了 react 项目，这里引入了专门用来测试 react 的 enzyme 库。

1、新建 jest.config.js 文件。

- 配置初始化 setup.ts 文件。
  - 根据 react 版本配置对应的 enzyme-adapter。
  - mock 全局变量，如 fech，canvas 等。
- 配置需要测试的文件。
- 配置 mock 数据文件。
- 配置测试文件的编译方式。
  - ts 代码使用 ts-jest 编译。
- 配置代码覆盖率文件。

2、编写测试文件。

- 新建\_\_mocks\_\_，\_\_tests\_\_目录，存放测试文件和 mock 数据文件。
- 按照 src 中的目录，建立相应的测试文件目录。

3、编写测试脚本和上传覆盖率脚本。

```json
"scripts": {
  "test": "jest --no-cache --colors --coverage --forceExit --detectOpenHandles",
  "coverage": "codecov"
}
```

## 配置上线环境

安装好各种环境之后，接下来就要考虑项目上线了。

### 配置服务器环境

- 安装 nodejs 环境。[nvm 安装 node](https://github.com/nvm-sh/nvm)
- 安装 pm2 进程守护。`npm i pm2 -g`
- 安装 mongodb。[mongodb 官方文档](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)
- 安装免费 https 证书。[letsencrypt 官网](https://letsencrypt.org/)
  - 域名需要先进行备案（使用阿里云备案，资料准备齐全的话 10 天左右就可以批下来）。

### 代码发布

本项目发布非常简单，只需要一步操作就搞定了，这些都是经过持续集成配置后的结果。

```zsh
# clone with Git Bash
git clone https://github.com/yhlben/cdfang-spider.git

# change directory
cd cdfang-spider

# install dependencies
npm i

# build for production with minification
npm run build
```

所有的事情都在 build 命令下完成了，我们分析一下 npm run build 命令做的事情。

- eslint 语法错误检查。
- 单元测试。
  - 上传测试覆盖率。
- 打包客户端代码。
  - 打包后生成 html 文件作为 node 端的 view 层，和后端绑定在一起。
  - 其他静态资源，在 webpack 打包后自动上传到七牛 cdn，使用 [qiniu-upload-plugin](https://www.npmjs.com/package/qiniu-upload-plugin) 来进行一键上传。
- 打包服务器端代码。

上述事情通过创建 npm script 就可以了完成需求了，但这些命令也不应该每次都由手工敲一遍，通过配置 travisCI，每一次 master 分支提交代码时，自动运行上述命令就行了。

#### travisCI 配置

travisCI 是一个持续集成平台，每当 github 提交代码时，travisCI 就会得到通知，然后根据 travisCI 中的配置信息执行相应的操作，并及时把运行结果反馈给用户。travisCI 配置文件可以参考项目根目录下的 `.travis.yml` 文件。配置文件核心在于 script 的配置。

```yml
script:
  - npm run build
  - npm run test
after_success: npm run coverage
```

可以看到，每一次 github 提交后，travisCI 就会执行 名称为 build 的任务，任务分为 2 个步骤，首先执行 build 命令，然后执行 test 命令，当命令都执行完成后，执行 coverage 命令。如果执行命令期间出现任何错误，travisCI 会通过邮件及时通知我们。真正要上线时，先查看 ci 状态，如果已通过所有的步骤，那就不用担心发布的代码有问题了。

### Docker 自动部署

最新的项目采用 Docker 进行部署，大大降低了部署的难度，只要安装 Docker 和 Docker Compose ，运行一行命令就可以部署好本项目。具体的步骤：

```shell
# clone with Git Bash
git clone https://github.com/yhlben/cdfang-spider.git

# change directory
cd cdfang-spider/docker

# run docker containers. It may take a long time.
docker-compose up -d

# server running at localhost:8082
```

Docker 部署项目原理可以参考[Docker 使用总结](https://yhlben.github.io/blog/project-docker.html)。

## 总结

至此，整个项目选型与搭建流程已经介绍完毕了，当然还有一些很细节的地方没有写进去，如果有不太明白的地方，可以提 issue，或者加我微信 yhl2016226。

接下来对以下 4 个方面写个小总结。

- 开发方面：项目将前端、后端、数据库端连通起来，组合成了一个小全栈的项目，加深了我对整个开发环节的理解。
- 测试方面：通过编写单元测试，ui 测试，api 测试，积累了自动化测试方面的经验。
- 运维方面：通过配置持续集成，守护进程，nginx，https 等，让我有能力实现小型项目的部署。
- 技术方面：项目中使用了一些比较新的技术，如：hooks api，graphql 等，但用的都很基础，主要是为了练手，后续还得深入学习。

对于项目后期更新，主要是基于以下几个方面：graphql，docker，k8s，微服务，serverless 等，东西太多，还得加油学习啊，😂

## 参考链接

- [TypeScript 和 Babel](https://juejin.im/post/5c822e426fb9a04a0a5ffb49)
- [前端决策树](https://github.com/sorrycc/f2e-decision-tree)
