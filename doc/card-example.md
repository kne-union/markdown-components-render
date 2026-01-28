# 卡片组件示例

这是一个展示如何在 Markdown 中使用 Card 组件的示例。

```yml
md-components:
  type: Card
  props:
    title: 基础卡片
    bordered: true
    children: |
      这是一段卡片内容。可以包含丰富的文本信息。

      - 列表项 1
      - 列表项 2
      - 列表项 3
```

## 不同尺寸的卡片

```yml
md-components:
  type: Flex
  props:
    vertical: true
    gap: 12
    children:
      - type: Card
        props:
          title: 小尺寸卡片
          size: small
          children: 这是一个小尺寸的卡片组件
      - type: Card
        props:
          title: 默认尺寸卡片
          children: 这是一个默认尺寸的卡片组件
```
