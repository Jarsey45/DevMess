import { LoginProps } from '../../types/interfaces';
import { Form, Input, Button, Checkbox, Space } from 'antd';
import '../../styles/antd_stylesheet.less';
import logo from '../images/logoLogin.png';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 12 }
}


/**
 * Sign Up Component 
 * @returns JSX.Element
 * */
const SignUpView: React.FC<LoginProps> = ({ handleClick, setRegister }) => {

  //TODO: Add animations on change
  return (
    <Form
      {...layout}
      className="form"
      name="LogIn"
      initialValues={{ remember: true }}
      onFinish={(e) => handleClick({ ...e, type: "register" })}
    >
      <img
        alt="logo"
        src={logo}
        style={{ height: '15vh', marginLeft: 'auto', marginRight: 'auto' }}
      />

      <Form.Item
        label="Nick"
        name="username"
        rules={[{ required: true, message: "Podaj swój nick!" }]}
        style={{ fontWeight: 'bolder' }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="mail"
        rules={[{ required: true, message: "Podaj swój mail!" }]}
        style={{ fontWeight: 'bolder' }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Podaj swoje hasło!" }]}
        style={{ fontWeight: 'bolder' }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}
        name="remember"
        valuePropName="checked"
        style={{ fontWeight: 'bolder' }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          or
          <Button type="default" onClick={() => setRegister()}>
            Sign in now!
          </Button>
        </Space>
      </Form.Item>
    </Form >
  )
}

export default SignUpView
