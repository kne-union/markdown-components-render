
# markdown-components-render


### 描述

渲染markdown文本，支持components.


### 安装

```shell
npm i --save @kne/markdown-components-render
```


### 概述

用于将一个yml格式的数据展示为一个已经定义好的react组件

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


#### 示例样式

```scss
.ant-card {
  border-color: black;
  text-align: center;
  width: 200px;
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _MarkdownComponentsRender(@kne/current-lib_markdown-components-render)[import * as _MarkdownComponentsRender from "@kne/markdown-components-render"],antd(antd),_ReactFetch(@kne/react-fetch),md(./doc/example.md)

```jsx
const { default: MarkdownComponentsRender } = _MarkdownComponentsRender;
const { default: mdUrl } = md;
const { default: Fetch } = _ReactFetch;
const { Card, Button, App } = antd;

const BaseExample = () => {
  const { message } = App.useApp();
  return (
    <Fetch
      url={mdUrl}
      ignoreSuccessState
      render={({ data }) => {
        return (
          <MarkdownComponentsRender
            components={{ Card, Button }}
            variables={{
              onClick: () => {
                message.info('你好');
              }
            }}>
            {data}
          </MarkdownComponentsRender>
        );
      }}></Fetch>
  );
};

render(<BaseExample />);

```


### API

| 属性名             | 说明                                             | 类型     | 默认值 |
|-----------------|------------------------------------------------|--------|-----|
| children        | markdown内容                                     | string | -   |
| components      | 用于渲染的组件类型对象，和yml里面的type对应                      | object | -   |
| variables       | 变量对象，如果被渲染组件属性的值中有$开头的变量，则去该变量中查找，如果可以查找到，引用该值 | object | -   |
| options         | markdown-it的配置参数                               | object | -   |
| options.config  | markdown-it初始化构造函数参数                           | object | -   |
| options.plugins | markdown-it对象.use 应用的值                         | array  | []  |

