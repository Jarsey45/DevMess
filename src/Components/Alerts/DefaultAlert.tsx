import React, { Component } from 'react'
import { Alert, Button, Space } from 'antd'
import { AlertProps } from '../../types/interfaces'

export default class DefaultAlert extends Component<AlertProps> {
  constructor(props: AlertProps) {
    super(props)
    console.log('alert Added');
    this.state = {

    }
  }

  render() {
    return (
      <Alert
        style={{ marginTop: '1vh' }}
        message={this.props?.title}
        description={this.props?.message}
        type="warning"
        afterClose={this.props.handleOk} // TODO: NAPRAW TO CHUJU
        action={
          <Space direction="vertical">
            <Button type="primary" onClick={this.props.handleOk}>
              OK
            </Button>
            <Button danger type="ghost" onClick={this.props.handleCancel} >
              Cancel
            </Button>
          </Space>
        }
        closable
      />
    )
  }
}
