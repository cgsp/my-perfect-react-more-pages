import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'

export default class TabBarExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: '首页',
    }
  }
  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        tabBarPosition="top"
      >
        <TabBar.Item
          title="Life"
          key="Life"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selected={this.state.selectedTab === '首页'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: '首页',
            })
          }}
          data-seed="logId"
        />
      </TabBar>
    )
  }
}
