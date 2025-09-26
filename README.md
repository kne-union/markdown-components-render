
# markdown-components-render


### 描述

渲染markdown文本，支持components.


### 安装

```shell
npm i --save @kne/markdown-components-render
```


### 概述

本项目是一个用于渲染 Markdown 内容的组件库，支持通过自定义组件和变量替换来增强 Markdown 的渲染能力。

#### 功能特性

- **Markdown 渲染**：支持标准的 Markdown 语法渲染。
- **自定义组件**：允许通过 `components` 属性定义自定义组件类型。
- **变量替换**：支持通过 `variables` 属性实现动态变量替换。
- **HTML 转换**：提供 `htmlTransform` 函数用于转换渲染后的 HTML 内容。
- **自定义渲染逻辑**：支持通过 `customRender` 函数覆盖默认的渲染逻辑。

#### 使用场景

- 动态生成文档内容。
- 支持变量替换的动态页面渲染。
- 自定义 Markdown 渲染逻辑的场景。


如下的yml会被渲染为Card组件

```jsunicoderegexp
\`\`\`yml
md-components:
  type: Card
  props:
    title: 我是标题
    size: small
    children: 我是内容
\`\`\`
```

如果需要传入参数，可以$开头

```jsunicoderegexp
\`\`\`yml
md-components:
  type: Button
  props:
    type: primary
    children: 我是一个按钮
    onClick: $onClick
\`\`\`
```

支持行内组件:
```md
我是一个行内组件\`md-components:Button{"type":"link","onClick":"$onClick","children":"我是一个行内按钮"}\`
```

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _MarkdownComponentsRender(@kne/current-lib_markdown-components-render)[import * as _MarkdownComponentsRender from "@kne/markdown-components-render"],antd(antd),_ReactFetch(@kne/react-fetch),md(./doc/example.md)

```jsx
const { default: MarkdownComponentsRender } = _MarkdownComponentsRender;
const { default: mdUrl } = md;
const { default: Fetch } = _ReactFetch;
const { Card, Button, App, Flex } = antd;

const BaseExample = () => {
  const { message } = App.useApp();
  return (
    <Fetch
      url={mdUrl}
      ignoreSuccessState
      render={({ data }) => {
        return (
          <Flex vertical gap={10}>
            <MarkdownComponentsRender
              components={{ Card, Button }}
              variables={{
                onClick: () => {
                  message.info('你好');
                }
              }}>
              {data}
            </MarkdownComponentsRender>
          </Flex>
        );
      }}></Fetch>
  );
};

render(<BaseExample />);

```


### API

| 属性名             | 说明                                             | 类型       | 默认值 |
|-----------------|------------------------------------------------|----------|-----|
| children        | markdown内容                                     | string   | -   |
| components      | 用于渲染的组件类型对象，和yml里面的type对应                      | object   | -   |
| variables       | 变量对象，如果被渲染组件属性的值中有$开头的变量，则去该变量中查找，如果可以查找到，引用该值 | object   | -   |
| options         | markdown-it的配置参数                               | object   | -   |
| options.config  | markdown-it初始化构造函数参数                           | object   | -   |
| options.plugins | markdown-it对象.use 应用的值                         | array    | []  |
| htmlTransform   | 用于转换渲染后的HTML内容的函数                              | function | -   |
| customRender    | 自定义渲染函数，用于覆盖默认的渲染逻辑                            | function | -   |
