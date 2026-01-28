const { default: MarkdownComponentsRender } = _MarkdownComponentsRender;
const { default: mdUrl } = md;
const { default: Fetch } = _ReactFetch;
const { Card, App, Flex } = antd;

const CardExample = () => {
  const { message } = App.useApp();
  return (
    <Fetch
      url={mdUrl}
      ignoreSuccessState
      render={({ data }) => {
        return (
          <Flex vertical gap={10}>
            <MarkdownComponentsRender
              components={{ Card, Flex }}
              variables={{
                onClick: () => {
                  message.info('卡片被点击');
                }
              }}>
              {data}
            </MarkdownComponentsRender>
          </Flex>
        );
      }}></Fetch>
  );
};

render(<CardExample />);
