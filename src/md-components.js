import React from 'react';
import compileVariables from './compile-variables';
import htmlParser from 'html-react-parser';

const MDComponents = ({ html, variables, components = {} }) => {
  return htmlParser(html, {
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
};

export default MDComponents;
