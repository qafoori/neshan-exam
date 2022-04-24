import { mapsActions } from '../../../core/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import type { MapboxProps } from '../../../core/components/mapbox/lib/types'
import type { RootState } from '../../../core/types/store.type'

export const useHomePage = () => {
  const dispatch = useDispatch()
  const { coords, rotation, zoom } = useSelector((root: RootState) => root.mapsReducer)
  const { lat, lng } = coords

  const updateZoom = (newZoom: number) => dispatch(mapsActions.setMapZoom(newZoom))
  const updateRotation = (newRotation: number) => dispatch(mapsActions.setMapRotation(newRotation))
  const updateCoords = (lat: number, lng: number) => dispatch(mapsActions.setMapCoords({ lat, lng }))

  const baseMapsProps: Omit<MapboxProps, 'accessToken'> = {
    zoom: zoom,
    rotation,
    coords: { lat, lng },
    onCoordsChange: updateCoords,
    onRotationChange: updateRotation,
    onZoomChange: updateZoom,
  }

  return { baseMapsProps }
}
