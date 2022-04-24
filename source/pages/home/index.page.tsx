import { FC } from 'react'
import { MapBox, OpenLayers } from '../../core/components'
import * as Lib from './lib'
import styles from './lib/styles.module.scss'

export const HomePage: FC = () => {
  const { baseMapsProps } = Lib.H.useHomePage()
  const { MAP_BOX_API_KEY } = process.env

  return (
    <div className={styles.container}>
      <div>
        <MapBox {...baseMapsProps} accessToken={MAP_BOX_API_KEY ?? ''} />
      </div>

      <div>
        <OpenLayers {...baseMapsProps} />
      </div>
    </div>
  )
}
