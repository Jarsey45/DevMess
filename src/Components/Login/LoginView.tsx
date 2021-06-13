import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Row, Col, Divider } from 'antd';
import '../../styles/antd_stylesheet.css';
import SignInView from './SignInView';
import SignUpView from './SignUpView';
//import { userLogin, addAlert } from '../../features/loginReducers'
import DefaultAlert from '../Alerts/DefaultAlert';
import { UserData } from '../../types/interfaces';
import { LoginUser, RegisterUser } from '../../api/Firebase';
import { RootState } from '../../app/store';
import { addAlert, disableAlert } from '../../features/loginReducers';
const { Header, Content, Footer } = Layout;


const LoginView: React.FC = () => {
  const [wantToRegister, setWantRegister] = useState(false)
  const alerts = useSelector((state: RootState) => state.login.alerts);
  const dispatch = useDispatch();

  //TODO: DOKONCZ TO KURWO
  const discardAlert = (id: number) => {
    dispatch(disableAlert(id))
  }

  const tryLog = async (data: UserData) => {
    switch (data.type) {
      case "login":

        const didLogIn = await LoginUser(data, {});
        if (didLogIn.valueOf())
          console.log('Logged', '=>', data.username)
        else
          dispatch(
            addAlert(
              {// shouldn't delete all items from alerts but for now it does
                element: {
                  title: "Error",
                  message: "Could not log in, check password and e-mail. ",
                },
                id: alerts.length
              }
            )
          )
        // <DefaultAlert
        //           title="Error"
        //           message="Could not log in, check password and e-mail. "
        //           handleOk={() => { discardAlert(alerts.length) }}
        //           handleCancel={() => { console.log('cancel') }}
        //         ></DefaultAlert>

        if (didLogIn)
          return;//TODO: jeżeli zaloguje to wjebać to wszystko do store
        else

          break;
      case "register":
        const didRegister = await RegisterUser(data, {});

        if (didRegister)
          console.log('Registered', '=>', data.username)
        else
          dispatch(
            addAlert(
              {// shouldn't delete all items from alerts but for now it does
                element: {
                  title: "Error",
                  message: "Could not resolve signup, please try again. ",
                },
                id: alerts.length
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
        DevMess (Logo)
      </Header>
      <Content className="content">
        <Row justify="space-between" align="middle">
          <Col span={6}></Col>
          <Col span={12}>
            {wantToRegister ?
              <SignUpView handleClick={tryLog} setRegister={() => { setWantRegister(false) }} ></SignUpView> :
              <SignInView handleClick={tryLog} setRegister={() => { setWantRegister(true) }}></SignInView>}
          </Col>
          <Col span={6}></Col>
        </Row>
        {alerts.map((el: { element: any, id: number }) =>
          <DefaultAlert
            title={el.element.title}
            message={el.element.message}
            handleOk={() => { discardAlert(el.id) }}
            handleCancel={() => { console.log('cancel') }}
          ></DefaultAlert>
        )}

      </Content>
      <Footer className="footer">
        <Divider style={{ borderWidth: 2, borderColor: "1px solid #610b00" }} />
        Barłomiej Kowalczyk 2021
      </Footer>
    </Layout>
  )
}

export default LoginView
