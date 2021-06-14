import React, { useEffect } from 'react'
import { MetroProps } from '../../types/interfaces'
import MetroView from './MetroView'

const MetroFView = (props: MetroProps) => {
  console.log(localStorage.getItem('TOKEN'))

  return (
    <MetroView></MetroView>
  )
}

export default MetroFView
