//import { useEffect } from 'react'
import {
  HomeOutlined,
  CoffeeOutlined
} from '@ant-design/icons'
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { MetroOptions } from '../../types/interfaces';
import MetroView from './MetroView';
import OptionComponentView from './OptionComponentView';


/**
 * Metro Functional Component
 * @param props
 * @returns 
 * */
const MetroFView = () => {
  //console.log(localStorage.getItem('TOKEN'))
  const [optionState, setOptionState] = useState<MetroOptions>(
    {
      type: "dashboard",
      key: null,
      data: {
        _id: null,
        _name: null,
      }
    } as MetroOptions);

  const friends = useSelector((state: RootState) => state.login.friends);
  const teams = useSelector((state: RootState) => state.login.teams);

  const makeMenuItem = (object: MetroOptions) => {
    return <Menu.Item
      className='menuItem'
      key={(object.key === null ? 0 : object.key).toString()}
      icon={(() => {
        switch (object.type) {
          case "dashboard": return <HomeOutlined />;
          case "coffee": return <CoffeeOutlined />;
          case "settings": return '';
          case "friend": return '';
          case "team": return '';
        }
      })()}
      onClick={() => { setOptionState(object) }} >
      {object.type.charAt(0).toUpperCase() + object.type.slice(1)}
    </Menu.Item >
  }

  useEffect(() => {

    console.log(optionState);
  }, [optionState])

  return (
    <MetroView
      teams={teams}
      friends={friends}
      makeMenuItem={makeMenuItem}
      optionComponent={<OptionComponentView {...optionState} ></OptionComponentView>}
    >

    </MetroView>
  )
}

export default MetroFView
