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
        message={this.props?.title}
        description={this.props?.message}
        type="warning"
        action={
          <Space direction="vertical">
            <Button size="small" type="primary" onClick={this.props.handleOk}>
              OK
            </Button>
            <Button size="small" danger type="ghost" onClick={this.props.handleCancel} >
              Cancel
            </Button>
          </Space>
        }
        closable
      />
    )
  }
}
