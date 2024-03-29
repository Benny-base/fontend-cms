import styles from './index.less';
import { Button, Form, Input } from 'antd'
import { UserStore } from '@/stores'
import { history } from 'umi'

const Page = () => {

    const handleSignIn = async(values) => {
        const res = await UserStore.signIn(values)
        if(res.code) return
        UserStore.setToken(res.data.token)
        UserStore.setInfo(res.data)
        window.umi_render(res.data.routes);
        history.push('/home')
    };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={handleSignIn}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

Page.label = 'signIn'
Page.hidden = true

export default Page