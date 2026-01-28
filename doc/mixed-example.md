# 综合示例

展示如何在一个 Markdown 文档中混合使用多种组件。

## 信息展示

欢迎使用文档系统！下面是一个信息卡片：

```yml
md-components:
  type: Card
  props:
    title: 欢迎使用
    children: |
      这是一段欢迎使用的内容。你可以在这里放置任意格式的文本。

      这是一个功能强大的 Markdown 渲染器，支持自定义组件。
```

## 操作按钮

点击以下按钮进行操作：

```yml
md-components:
  type: Flex
  props:
    gap: 8
    children:
      - type: Button
        props:
          type: primary
          children: 立即开始
          onClick: $handleStart
      - type: Button
        props:
          children: 了解更多
          onClick: $handleLearnMore
```

## 表格信息

| 功能 | 说明 | 状态 |
| --- | --- | --- |
| 组件渲染 | 支持自定义 React 组件 | ✅ |
| 变量替换 | 支持动态变量传入 | ✅ |
| 行内组件 | 支持行内语法插入组件 | ✅ |

## 行内快捷操作

在文本中，你可以直接使用 `md-components:Button{"type":"link","onClick":"$handleQuickAction","children":"快捷操作"}` 来执行一些快速操作。

## 更多信息

如需了解更多，请点击`md-components:Button{"type":"link","onClick":"$handleMoreInfo","children":"查看文档"}`。
