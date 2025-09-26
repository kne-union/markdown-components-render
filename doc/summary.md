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