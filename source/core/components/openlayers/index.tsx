import { FC } from 'react'
import * as Lib from './lib'

export const OpenLayers: FC<Lib.T.OpenLayersProps> = props => {
  const map = Lib.H.useOpenLayers(props)
  return <div ref={map} className="map-container" />
}
