import { Col, Row, Space } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { useEffect, useState } from "react";
import { MessageProps } from "../types/interfaces"

export const Message: React.FC<MessageProps> = ({ content, side }) => {
  const [element, setElement] = useState<JSX.Element>(<></>);

  useEffect(() => {
    switch (side) {
      case 'left':
        setElement(
          <Row >
            <Col className="messageFlexboxLeft"  >
              <Space>
                <Avatar>U</Avatar>
                <div className="messageContent">
                  {content}
                </div>
              </Space>
            </Col>
          </Row>);
        break;
      case 'right':
        setElement(
          <Row >
            <Col className="messageFlexboxRight" span={12} offset={12} >
              <Space>
                <div className="messageContent">
                  {content}
                </div>
                <Avatar>Me</Avatar>
              </Space>
            </Col>
          </Row>);
        break;
    }
  }, [side, content])

  return (
    <>
      {element}
    </>
  )
}