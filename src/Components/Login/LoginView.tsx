import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Row, Col, Divider } from 'antd';
import '../../styles/antd_stylesheet.less';
import logo from '../images/logo2.png';
import SignInView from './SignInView';
import SignUpView from './SignUpView';
import { useHistory } from "react-router-dom";
import DefaultAlert from '../Alerts/DefaultAlert';
import { UserData } from '../../types/interfaces';
import { LoginUser, RegisterUser } from '../../api/Firebase';
import { RootState } from '../../app/store';
import { addAlert, disableAlert, userLogin } from '../../features/loginReducers';
import { useWindowSize } from '../../features/Hooks';
const { Header, Content, Footer } = Layout;

/**
 * Login Functional Component that contains logic of login and/or register
 * @param props
 * @returns JSX.Element
 * */
const LoginView: React.FC = () => {
  const history = useHistory();
  const [wantToRegister, setWantRegister] = useState(false)
  const [WindowHeight, WindowWidth] = useWindowSize();
  const alerts = useSelector((state: RootState) => state.login.alerts);
  const dispatch = useDispatch();

  //TODO: DOKONCZ TO KURWO
  const discardAlert = (id: number) => {
    dispatch(disableAlert(id))
  }

  const tryLog = async (data: UserData) => {
    //TODO: CHECK DATA FORMAT WITH REGEX
    switch (data.type) {
      case "login":

        const didLogIn = await LoginUser(data, {});
        if (didLogIn.status) {

          console.log('Logged', '=>', didLogIn.data)
          dispatch(userLogin(didLogIn.data));
          history.push('/metro')
        }
        else
          dispatch(
            addAlert(
              {
                element: {
                  title: "Error",
                  message: "Could not log in, check password and e-mail. ",
                },
                id: Math.floor(Math.random() * (10000 - 1)) + 1
              }
            )
          )
        break;
      case "register":
        const didRegister = await RegisterUser(data, {});

        if (didRegister)
          console.log('Registered', '=>', data.username)
        else
          dispatch(
            addAlert(
              {
                element: {
                  title: "Error",
                  message: "Could not resolve signup, please try again. ",
                },
                id: Math.floor(Math.random() * (10000 - 1)) + 1
              }
            )
          )
        //TODO: jeżeli zarejestruje to wjebać to wszystko do store
        break;
    }
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <img alt="logo" src={logo} style={{ height: 'inherit', paddingTop: '1vh' }} />
      </Header>
      <Content className="content">
        <Row justify="space-between" align="middle">
          <Col span={6}></Col>
          <Col span={12}>
            {wantToRegister ?
              <SignUpView
                size={{ WindowHeight, WindowWidth }}
                handleClick={tryLog}
                setRegister={() => { setWantRegister(false) }}>
              </SignUpView>
              :
              <SignInView
                size={{ WindowHeight, WindowWidth }}
                handleClick={tryLog}
                setRegister={() => { setWantRegister(true) }}>
              </SignInView>}
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row >
          <Col span={12} offset={6}  >
            {alerts.map((el: { element: any, id: number }) =>
              <DefaultAlert
                title={el.element.title}
                message={el.element.message}
                handleOk={() => { discardAlert(el.id) }}
                handleCancel={() => { console.log('cancel') }}
              ></DefaultAlert>
            )}
          </Col>
        </Row>

      </Content>
      <Footer className="footer">
        <Divider />
        <div className='footText'>Barłomiej Kowalczyk 2021</div>
      </Footer>
    </Layout>
  )
}

export default LoginView
