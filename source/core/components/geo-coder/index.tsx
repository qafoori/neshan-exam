import { FC } from 'react'
import * as Lib from './lib'
import styles from './lib/styles.module.scss'

/***
 *
 *
 *
 * `GeoCoder` component helps `MapBox` & `OpenLayers` components to be able to query their selves through an input
 */
export const GeoCoder: FC<Lib.T.GeoCoderProps> = ({ accessToken, id, onClear, onResult, ...rest }) => {
  const geoCoder = Lib.H.useGeoCoder({ accessToken, onClear, onResult })

  return <div ref={geoCoder} id={id} {...rest} className={`${styles.geoCoderContainer} ${rest.className}`} />
}
