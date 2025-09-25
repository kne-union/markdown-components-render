import yaml from 'js-yaml';
import Ajv from 'ajv';

const ajv = new Ajv();

const mdComponentsSchema = {
  type: 'object',
  properties: {
    'md-components': {
      type: 'object',
      properties: {
        type: { type: 'string' },
        props: { type: 'object' }
      },
      required: ['type', 'props']
    }
  },
  required: ['md-components']
};

const validate = ajv.compile(mdComponentsSchema);

const mdComponents = function (md) {
  const defaultFence = md.renderer.rules.fence;
  const defaultCodeInline = md.renderer.rules.code_inline;

  md.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const regex = /^md-components:(.+)\{(.+)}$/;
    try {
      if (regex.test(token.content)) {
        const matcher = token.content.match(regex);
        const componentsType = matcher[1],
          props = JSON.parse(`{${matcher[2]}}`);
        const jsonData = {
          'md-components': {
            type: componentsType,
            props: props
          }
        };
        if (validate(jsonData)) {
          const element = document.createElement('code');
          element.setAttribute('class', 'md-components');
          element.dataset.components = JSON.stringify(jsonData);
          return element.outerHTML;
        }
      }
    } catch (e) {
      console.warn(e);
    }

    return defaultCodeInline(tokens, idx, options, env, self);
  };

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (token.info.trim() === 'yml') {
      try {
        const jsonData = yaml.load(token.content);
        if (validate(jsonData)) {
          const element = document.createElement('pre');
          element.setAttribute('class', 'md-components');
          element.dataset.components = JSON.stringify(jsonData);
          return element.outerHTML;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return defaultFence(tokens, idx, options, env, self);
  };
};

export default mdComponents;
