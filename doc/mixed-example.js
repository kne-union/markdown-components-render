const { default: MarkdownComponentsRender } = _MarkdownComponentsRender;
const { default: mdUrl } = md;
const { default: Fetch } = _ReactFetch;
const { Button, Card, App, Flex } = antd;

const MixedExample = () => {
  const { message } = App.useApp();
  return (
    <Fetch
      url={mdUrl}
      ignoreSuccessState
      render={({ data }) => {
        return (
          <Flex vertical gap={10}>
            <MarkdownComponentsRender
              components={{ Button, Card, Flex }}
              variables={{
                handleStart: () => {
                  message.success('开始使用！');
                },
                handleLearnMore: () => {
                  message.info('了解更多信息');
                },
                handleQuickAction: () => {
                  message.success('快捷操作执行成功');
                },
                handleMoreInfo: () => {
                  message.info('正在打开文档...');
                }
              }}>
              {data}
            </MarkdownComponentsRender>
          </Flex>
        );
      }}></Fetch>
  );
};

render(<MixedExample />);
