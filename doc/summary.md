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