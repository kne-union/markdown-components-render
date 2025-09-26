| 属性名             | 说明                                             | 类型       | 默认值 |
|-----------------|------------------------------------------------|----------|-----|
| children        | markdown内容                                     | string   | -   |
| components      | 用于渲染的组件类型对象，和yml里面的type对应                      | object   | -   |
| variables       | 变量对象，如果被渲染组件属性的值中有$开头的变量，则去该变量中查找，如果可以查找到，引用该值 | object   | -   |
| options         | markdown-it的配置参数                               | object   | -   |
| options.config  | markdown-it初始化构造函数参数                           | object   | -   |
| options.plugins | markdown-it对象.use 应用的值                         | array    | []  |
| htmlTransform   | 用于转换渲染后的HTML内容的函数                              | function | -   |
| customRender    | 自定义渲染函数，用于覆盖默认的渲染逻辑                            | function | -   |