import { FC } from 'react'
import * as Lib from './lib'
import { GeoCoder } from '../geo-coder'
import styles from './lib/styles.module.scss'

export const MapBox: FC<Lib.T.MapboxProps> = props => {
  const { mapElement, onResultClear } = Lib.H.useMapBox(props)
  const { accessToken, geoCoderId, onResult } = props

  return (
    <div ref={mapElement} className={styles.mapContainer}>
      <GeoCoder accessToken={accessToken} id={geoCoderId} onResult={onResult} onClear={onResultClear} />
    </div>
  )
}
