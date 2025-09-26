import React, { useMemo } from 'react';
import markdown from 'markdown-it';
import markdownComponentsPlugin from './md-components-plugin';
import MarkdownComponents from './md-components';

import useRefCallback from '@kne/use-ref-callback';
import merge from 'lodash/merge';
import preset, { globalParams } from './preset';

const MarkdownComponentsRender = ({ children = '', render: customRender, ...props }) => {
  const { htmlTransform, components = {}, variables = {}, options } = merge({}, globalParams, props);
  const render = useRefCallback(children => {
    const { config, plugins } = Object.assign({}, options, {
      config: {},
      plugins: []
    });

    const md = markdown(config);
    plugins.forEach(plugin => {
      const pluginArgs = Array.isArray(plugin) ? plugin : [plugin];
      md.use(...pluginArgs);
    });
    md.use(markdownComponentsPlugin);

    const html = md.render(children);

    return <MarkdownComponents html={typeof htmlTransform === 'function' ? htmlTransform(html) : html} variables={variables} components={components} />;
  });

  const result = useMemo(() => {
    return render(children);
  }, [children, render]);

  if (typeof customRender === 'function') {
    return customRender(result);
  }

  return result;
};

export default MarkdownComponentsRender;
export { preset, markdownComponentsPlugin, MarkdownComponents };
