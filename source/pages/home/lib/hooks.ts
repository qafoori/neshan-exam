import { mapsActions } from '../../../core/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import type { OpenLayersProps } from '../../../core/components/openlayers/lib/types'
import type { RootState } from '../../../core/types/store.type'
import { OutputResult } from '../../../core/components/geo-coder/lib/types'

export const useHomePage = () => {
  const dispatch = useDispatch()
  const { coords, rotation, zoom, geoRes } = useSelector((root: RootState) => root.mapsReducer)
  const { lat, lng } = coords
  const { MAP_BOX_API_KEY } = process.env

  const updateZoom = (newZoom: number) => dispatch(mapsActions.setMapZoom(newZoom))
  const updateRotation = (newRotation: number) => dispatch(mapsActions.setMapRotation(newRotation))
  const updateCoords = (lat: number, lng: number) => dispatch(mapsActions.setMapCoords({ lat, lng }))
  const updateSearchResult = (res?: OutputResult) => dispatch(mapsActions.setGeoResult(res))

  const baseMapsProps: Omit<OpenLayersProps, 'geoCoderId'> = {
    coords: { lat, lng },
    zoom: zoom,
    rotation,
    accessToken: MAP_BOX_API_KEY ?? '',
    searchResult: geoRes,
    onCoordsChange: updateCoords,
    onRotationChange: updateRotation,
    onZoomChange: updateZoom,
    onResult: updateSearchResult,
    onClear: updateSearchResult,
  }

  return { baseMapsProps }
}
