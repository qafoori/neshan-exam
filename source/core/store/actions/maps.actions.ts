import { actionTypes } from '../../constants'
import { StoreAction } from '../../types/store.type'
import { Coords } from '../../types/map.types'

export const setMapCoords: StoreAction<Coords> = payload => {
  return {
    type: actionTypes.MAP.COORDS,
    payload,
  }
}

export const setMapZoom: StoreAction<number> = payload => {
  return {
    type: actionTypes.MAP.ZOOM,
    payload,
  }
}

export const setMapRotation: StoreAction<number> = payload => {
  return {
    type: actionTypes.MAP.ROTATION,
    payload,
  }
}
