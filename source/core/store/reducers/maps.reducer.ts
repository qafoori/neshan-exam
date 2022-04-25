import { actionTypes } from '../../constants'
import { StoreAction } from '../../types/store.type'
import { OutputResult } from '../../components/geo-coder/lib/types'
import { Coords } from '../../types/map.types'

const initialState = {
  zoom: 5,
  rotation: 0,
  geoRes: <OutputResult | undefined>undefined,
  coords: {
    lat: 32.6516,
    lng: 53.7709,
  },
}

export const mapsReducer = (states = initialState, { type, payload }: ReturnType<StoreAction<any>>): typeof initialState => {
  switch (type) {
    case actionTypes.MAP.ZOOM: {
      return {
        ...states,
        zoom: payload,
      }
    }

    case actionTypes.MAP.COORDS: {
      return {
        ...states,
        coords: payload,
      }
    }

    case actionTypes.MAP.ROTATION: {
      return {
        ...states,
        rotation: payload,
      }
    }

    case actionTypes.MAP.GEO_RES: {
      return {
        ...states,
        geoRes: payload,
      }
    }

    default: {
      return states
    }
  }
}
