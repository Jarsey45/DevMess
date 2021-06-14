import { useState } from 'react';
import { LoginProps } from '../../types/interfaces';
import { Form, Input, Button, Checkbox, Space, Row, Col } from 'antd';
import '../../styles/antd_stylesheet.less';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
  sm: { offset: 2, span: 6 }
}




const SignInView: React.FC<LoginProps> = ({ handleClick, setRegister }) => {

  //TODO: Add animations on change
  return (
    <Form
      {...layout}
      className="form"
      name="LogIn"
      initialValues={{ remember: true }}
      onFinish={(e) => handleClick({ ...e, type: "login" })}
    >
      <img
        alt="logo"
        src="./logo2.png"
        style={{ height: '15vh', marginLeft: 'auto', marginRight: 'auto' }}
      />

      <Form.Item
        label="Email"
        name="mail"
        rules={[{ required: true, message: "Podaj swój mail!" }]}
        style={{ fontWeight: 'bolder' }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hasło"
        name="password"
        rules={[{ required: true, message: "Podaj swoje hasło!" }]}
        style={{ fontWeight: 'bold' }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked" style={{ fontWeight: 'bold' }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout} >
        <Space>
          <Button type="primary" htmlType="submit" >
            Sign In
          </Button>
          or
          <Button type="default" onClick={() => setRegister()} >
            Register now!
          </Button>
        </Space>
      </Form.Item>
    </Form >
  )
}

export default SignInView
