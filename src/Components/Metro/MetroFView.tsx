import { MetroProps } from '../../types/interfaces'
import MetroView from './MetroView'

/**
 * Metro Functional Component
 * @param props
 * @returns 
 * */
const MetroFView = (props: MetroProps) => {
  console.log(localStorage.getItem('TOKEN'))

  return (
    <MetroView></MetroView>
  )
}

export default MetroFView
