import React, { useMemo, Fragment, createElement } from 'react';
import markdown from 'markdown-it';
import mdComponents from './markdown-it-components';
import compileVariables from './compileVariables';
import useRefCallback from '@kne/use-ref-callback';
import merge from 'lodash/merge';
import preset, { globalParams } from './preset';
import htmlParser from 'html-react-parser';

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
    md.use(mdComponents);

    const html = md.render(children);
    return htmlParser(typeof htmlTransform === 'function' ? htmlTransform(html) : html, {
      replace(element) {
        if (element.attribs && element.attribs.class === 'md-components' && element.attribs['data-components']) {
          const componentsData = JSON.parse(element.attribs['data-components']);
          if (!componentsData['md-components']) {
            return null;
          }
          const { type, props } = componentsData['md-components'];
          const MdComponent = components[type];
          if (!MdComponent) {
            return null;
          }
          return <MdComponent {...Object.assign({}, compileVariables(props, variables))} />;
        }
        return element;
      }
    });
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
export { preset };
