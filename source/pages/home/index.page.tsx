import { FC } from 'react'
import { MapBox, OpenLayers } from '../../core/components'
import * as Lib from './lib'
import styles from './lib/styles.module.scss'

export const HomePage: FC = () => {
  const { baseMapsProps } = Lib.H.useHomePage()

  return (
    <div className={styles.container}>
      <div>
        <MapBox {...baseMapsProps} geoCoderId="mapBoxGeocoder" />
      </div>

      <div>
        <OpenLayers {...baseMapsProps} geoCoderId="openLayersGeocoder" />
      </div>
    </div>
  )
}
