import { Layout } from "antd"
import React, { useEffect, useState } from "react";
import { MetroOptions } from "../../types/interfaces";
import TeamChatFView from "./TeamChatFView";
import ChatFView from "./ChatFView";
import DashboardFView from "./DashboardFView";
import CoffeeFView from "./CoffeeFView";
import ErrorView from "./ErrorView";

const { Header, Content } = Layout;

//That component is not entirely needed, but may be usefull later on
const OptionComponentView: React.FC<MetroOptions> = ({ type, data }) => {

  const [componentElement, setComponentElement] = useState<JSX.Element>(<ErrorView></ErrorView>);

  useEffect(() => {
    switch (type) {
      case "friend":
        data !== undefined ? setComponentElement(<ChatFView {...data}></ChatFView>) : setComponentElement(<ErrorView></ErrorView>);
        break;
      case "team":
        data !== undefined ? setComponentElement(<TeamChatFView {...data}></TeamChatFView>) : setComponentElement(<ErrorView></ErrorView>);
        break;
      case "coffee": setComponentElement(<CoffeeFView></CoffeeFView>);
        break;
      case "dashboard": setComponentElement(<DashboardFView></DashboardFView>);
        break;
      default: setComponentElement(<ErrorView></ErrorView>); break;
    }
  }, [type, data])


  return (
    <Layout className="layout" >
      <Header className="header" style={{ padding: 0 }} />
      <Content className='contentOption' >
        <div className="contentScreen" >
          {componentElement}
        </div>
      </Content>
    </Layout>
  )
}

export default OptionComponentView
export type OptionComponent = typeof OptionComponentView;