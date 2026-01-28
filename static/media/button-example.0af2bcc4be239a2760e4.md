# 按钮组件示例

展示如何在 Markdown 中使用各种类型的 Button 组件。

## 基础按钮

```yml
md-components:
  type: Flex
  props:
    gap: 8
    children:
      - type: Button
        props:
          type: primary
          children: 主要按钮
          onClick: $handlePrimaryClick
      - type: Button
        props:
          type: default
          children: 默认按钮
      - type: Button
        props:
          type: dashed
          children: 虚线按钮
      - type: Button
        props:
          type: link
          children: 链接按钮
          onClick: $handleLinkClick
```

## 按钮状态

```yml
md-components:
  type: Flex
  props:
    gap: 8
    children:
      - type: Button
        props:
          type: primary
          disabled: true
          children: 禁用按钮
      - type: Button
        props:
          type: primary
          danger: true
          children: 危险操作
          onClick: $handleDangerClick
```
