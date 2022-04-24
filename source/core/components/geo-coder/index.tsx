import { FC } from 'react'
import * as Lib from './lib'

export const GeoCoder: FC<Lib.T.GeoCoderProps> = () => {
  const {} = Lib.H.useGeoCoder()
  return <div></div>
}
