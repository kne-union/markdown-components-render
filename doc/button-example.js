const { default: MarkdownComponentsRender } = _MarkdownComponentsRender;
const { default: mdUrl } = md;
const { default: Fetch } = _ReactFetch;
const { Button, App, Flex } = antd;

const ButtonExample = () => {
  const { message } = App.useApp();
  return (
    <Fetch
      url={mdUrl}
      ignoreSuccessState
      render={({ data }) => {
        return (
          <Flex vertical gap={10}>
            <MarkdownComponentsRender
              components={{ Button, Flex }}
              variables={{
                handlePrimaryClick: () => {
                  message.success('主要按钮被点击');
                },
                handleLinkClick: () => {
                  message.info('链接按钮被点击');
                },
                handleDangerClick: () => {
                  message.error('危险操作被触发');
                }
              }}>
              {data}
            </MarkdownComponentsRender>
          </Flex>
        );
      }}></Fetch>
  );
};

render(<ButtonExample />);
