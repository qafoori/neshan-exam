import { actionTypes } from '../../constants'
import { StoreAction } from '../../types/store.type'

const initialState = {
  zoom: 5,
  rotation: 0,
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

    default: {
      return states
    }
  }
}
