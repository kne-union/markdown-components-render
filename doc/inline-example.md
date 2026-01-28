# 行内组件示例

展示如何在 Markdown 文本中使用行内组件。

这是一个普通的文本段落，其中包含`md-components:Button{"type":"link","children":"行内按钮1"}`一个行内按钮。

## 混合使用

你可以在文本中灵活地插入多个行内组件，例如：`md-components:Button{"type":"primary","size":"small","children":"点赞"}`、`md-components:Button{"type":"default","size":"small","children":"评论"}` 和 `md-components:Button{"type":"link","size":"small","children":"分享"}`。

## 链接按钮

访问我们的`md-components:Button{"type":"link","href":"https://www.baidu.com","target":"_blank","children":"官方网站"}`了解更多信息。

## 带点击事件

点击`md-components:Button{"type":"link","onClick":"$handleShowMessage","children":"这里"}`会触发一个提示消息。
