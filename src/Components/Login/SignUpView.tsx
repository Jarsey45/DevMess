import { useState } from 'react';
import { UserData, LoginProps } from '../../types/interfaces';
import { Form, Input, Button, Checkbox, Space } from 'antd';
import '../../styles/antd_stylesheet.css';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 12 }
}



const SignUpView: React.FC<LoginProps> = ({ handleClick, setRegister }) => {

  return (
    <Form
      {...layout}
      className="form"
      name="LogIn"
      initialValues={{ remember: true }}
      onFinish={(e) => handleClick({ ...e, type: "register" })}
    >
      <Form.Item
        label="Nick"
        name="username"
        rules={[{ required: true, message: "Podaj swój nick!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mail"
        name="mail"
        rules={[{ required: true, message: "Podaj swój mail!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hasło"
        name="password"
        rules={[{ required: true, message: "Podaj swoje hasło!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Zarejestruj się
          </Button>
          lub
          <Button type="default" onClick={() => setRegister()}>
            Zaloguj się
          </Button>
        </Space>
      </Form.Item>
    </Form >
  )
}

export default SignUpView
