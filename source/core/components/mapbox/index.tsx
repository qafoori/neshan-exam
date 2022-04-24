import { FC } from 'react'
import * as Lib from './lib'
import styles from './lib/styles.module.scss'

export const MapBox: FC<Lib.T.MapboxProps> = props => {
  const map = Lib.H.useMapBox(props)
  return <div ref={map} className={styles.mapBoxContainer}></div>
}
