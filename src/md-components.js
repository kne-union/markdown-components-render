import React from 'react';
import compileVariables from './compile-variables';
import classnames from 'classnames';
import htmlParser from 'html-react-parser';
import style from './style.module.scss';

// 递归渲染子组件
const renderChildren = (children, variables, components) => {
  if (!children) {
    return null;
  }

  // 如果 children 是数组，递归渲染每个子元素
  if (Array.isArray(children)) {
    return children.map((child, index) => {
      // 如果子元素是包含 type 和 props 的对象，渲染为组件
      if (child && typeof child === 'object' && child.type && child.props) {
        const ChildComponent = components[child.type];
        if (ChildComponent) {
          const compiledProps = compileVariables(child.props, variables);
          return <ChildComponent key={index} {...compiledProps} />;
        }
      }
      // 否则直接渲染
      return child;
    });
  }

  // 如果 children 是字符串，直接返回
  if (typeof children === 'string') {
    return children;
  }

  return children;
};

const MDComponents = ({ className, html, variables, components = {} }) => {
  return (
    <div className={classnames(style['markdown'], className)}>
      {htmlParser(html, {
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
            const compiledProps = compileVariables(props, variables);

            // 如果 props 包含 children 数组，需要特殊处理
            if (compiledProps.children && Array.isArray(compiledProps.children)) {
              const renderedChildren = renderChildren(compiledProps.children, variables, components);
              return <MdComponent {...compiledProps}>{renderedChildren}</MdComponent>;
            }

            return <MdComponent {...compiledProps} />;
          }
          return element;
        }
      })}
    </div>
  );
};

export default MDComponents;
