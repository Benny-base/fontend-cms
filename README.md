

Crud组件说明:
    const columns = [
        {
            title: '状态',                               // 标题
            key: 'status',                              // 必填唯一
            formType: 'select',                         // 渲染组件
            search: true,                               // 显示在
            addDisplay: true,                           // 显示在新增弹框中
            editDisplay: true,                          // 显示在编辑弹框中
            attribute: {},                              // 填当前组件的可用属性 如Input组件  { placeholder: '请输入', ...}
            rules: [{ required: true }, ...],           // 填表单验证规则 用法看Ant Design -> Form
            opts: {                                     // 封装的一些组件的options属性 可以写死 可以填url 请求options数组 选一种方式
                data: [{ label: 'abc', value: '1' }, ...]
                url: '', method: '', body: {}
            }
        },
        ...
    ]