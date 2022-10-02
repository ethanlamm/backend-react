import { Card, Form, Input, Button, Checkbox,message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'

import { useStore } from '@/store'
import {useNavigate} from 'react-router-dom'
function Login() {
    // 拿到login的Mobx仓库
    const { loginStore } = useStore()
    // 获取跳转实例对象（编程式跳转）
    const navigate=useNavigate()
    
    // 点击登录的按钮
    const onFinish = async ({ mobile, code }) => {
        try {
            // 相当于 dispatch
            await loginStore.setToken({ mobile, code })
            // 消息提示
            message.success('登录成功')
            // 跳转至首页
            navigate('/')
        } catch (e) {
            // 消息提示
            message.error(e.response?.data?.message || '登录失败')
        }
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form
                    initialValues={{
                        agree: true,
                    }}
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="mobile"
                        rules={[
                            { required: true, message: '请输入手机号' },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号码格式不正确',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            { required: true, message: '请输入验证码' },
                            { len: 6, message: '验证码是6个字符', validateTrigger: 'onBlur' }
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item
                        name="agree"
                        valuePropName='checked'
                        rules={[
                            {
                                validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('请勾选同意协议'))
                            }
                        ]}
                    >
                        <Checkbox>
                            我已阅读并同意<a href="">「用户协议」和「隐私条款」</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login