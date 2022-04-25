import { actionTypes } from '../../constants'
import { StoreAction } from '../../types/store.type'
import { Coords } from '../../types/map.types'
import { OutputResult } from '../../components/geo-coder/lib/types'

export const setMapCoords: StoreAction<Coords> = payload => ({
  type: actionTypes.MAP.COORDS,
  payload,
})

export const setMapZoom: StoreAction<number> = payload => ({
  type: actionTypes.MAP.ZOOM,
  payload,
})

export const setMapRotation: StoreAction<number> = payload => ({
  type: actionTypes.MAP.ROTATION,
  payload,
})

export const setGeoResult: StoreAction<OutputResult | undefined> = payload => ({
  type: actionTypes.MAP.GEO_RES,
  payload,
})


export const setQuery: StoreAction<string> = payload => ({
  type: actionTypes.MAP.QUERY,
  payload,
})
