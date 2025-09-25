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
    try {
      if (/^md-components/.test(token.content)) {
        const pattern = /md-components:(\w+)\{([^}]+)}/g;
        let matches;
        const results = [];
        while ((matches = pattern.exec(token.content)) !== null) {
          results.push({
            componentsType: matches[1],
            props: matches[2]
          });
        }
        if (results.length > 0) {
          return results
            .map(({ componentsType, props }) => {
              const jsonData = {
                'md-components': {
                  type: componentsType,
                  props: JSON.parse(`{${props}}`)
                }
              };
              if (validate(jsonData)) {
                const element = document.createElement('code');
                element.setAttribute('class', 'md-components');
                element.dataset.components = JSON.stringify(jsonData);
                return element.outerHTML;
              }
              return '';
            })
            .join('');
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
