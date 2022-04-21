import { FC } from 'react'
import { MapBox, OpenLayers } from '../../core/components'
import * as Lib from './lib'
import styles from './lib/styles.module.scss'

export const HomePage: FC = () => {
  const {} = Lib.H.useHomePage()

  return (
    <div className={styles.container}>
      <div>
        <MapBox />
      </div>

      <div>
        <OpenLayers />
      </div>
    </div>
  )
}
