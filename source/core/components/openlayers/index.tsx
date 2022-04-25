import { FC } from 'react'
import * as Lib from './lib'
import { GeoCoder } from '../geo-coder'
import styles from './lib/styles.module.scss'

export const OpenLayers: FC<Lib.T.OpenLayersProps> = props => {
  const { mapElement, onResultClear } = Lib.H.useOpenLayers(props)
  const { accessToken, geoCoderId, onResult } = props

  return (
    <div ref={mapElement} className={styles.mapContainer}>
      <GeoCoder accessToken={accessToken} id={geoCoderId} onResult={onResult} onClear={onResultClear} />
    </div>
  )
}
