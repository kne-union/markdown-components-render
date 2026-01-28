const { default: MarkdownComponentsRender } = _MarkdownComponentsRender;
const { default: mdUrl } = md;
const { default: Fetch } = _ReactFetch;
const { Button, App, Flex } = antd;

const InlineExample = () => {
  const { message } = App.useApp();
  return (
    <Fetch
      url={mdUrl}
      ignoreSuccessState
      render={({ data }) => {
        return (
          <Flex vertical gap={10}>
            <MarkdownComponentsRender
              components={{ Button }}
              variables={{
                handleShowMessage: () => {
                  message.info('这是一个行内按钮触发的事件');
                }
              }}>
              {data}
            </MarkdownComponentsRender>
          </Flex>
        );
      }}></Fetch>
  );
};

render(<InlineExample />);
