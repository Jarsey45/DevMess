//import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import MetroView from './MetroView'

/**
 * Metro Functional Component
 * @param props
 * @returns 
 * */
const MetroFView = () => {
  //console.log(localStorage.getItem('TOKEN'))
  const friends = useSelector((state: RootState) => state.login.friends);
  const teams = useSelector((state: RootState) => state.login.teams);



  return (
    <MetroView teams={teams} friends={friends} ></MetroView>
  )
}

export default MetroFView
