const { default: MarkdownComponentsRender } = _MarkdownComponentsRender;
const { default: mdUrl } = md;
const { default: Fetch } = _ReactFetch;
const { Card, Button, App } = antd;

const BaseExample = () => {
  const { message } = App.useApp();
  return (
    <Fetch
      url={mdUrl}
      ignoreSuccessState
      render={({ data }) => {
        return (
          <MarkdownComponentsRender
            components={{ Card, Button }}
            variables={{
              onClick: () => {
                message.info('你好');
              }
            }}>
            {data}
          </MarkdownComponentsRender>
        );
      }}></Fetch>
  );
};

render(<BaseExample />);
