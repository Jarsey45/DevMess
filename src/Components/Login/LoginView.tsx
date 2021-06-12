import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Layout, Row, Col, Divider } from 'antd';
import '../../styles/antd_stylesheet.css';
import SignInView from './SignInView';
import SignUpView from './SignUpView';
import { UserData } from '../../types/interfaces'
import { LoginUser, RegisterUser } from '../../api/Firebase';
const { Header, Content, Footer } = Layout;


const LoginView: React.FC = () => {
  const [wantToRegister, setWantRegister] = useState(false)
  //const isLogged = useSelector((state: RootState) => state?.login.logged.status);

  const dispatch = useDispatch();

  const tryLog = async (data: UserData) => {
    switch (data.type) {
      case "login":

        const didLogIn = await LoginUser(data, {});
        if (didLogIn.valueOf())
          console.log('Zalogowano', '=>', data.username)
        else
          console.log('Nie można zalogować, sprawdz mail lub haslo')

        if (didLogIn)
          return;//TODO: jeżeli zaloguje to wjebać to wszystko do store
        else

          break;
      case "register":
        const didRegister = await RegisterUser(data, {});
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
      </Content>
      <Footer className="footer">
        <Divider style={{ borderWidth: 2, borderColor: "1px solid #610b00" }} />
        Barłomiej Kowalczyk 2021
      </Footer>
    </Layout>
  )
}

export default LoginView
