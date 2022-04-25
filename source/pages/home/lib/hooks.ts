import { mapsActions } from '../../../core/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import type { OpenLayersProps } from '../../../core/components/openlayers/lib/types'
import type { RootState } from '../../../core/types/store.type'
import { OutputResult } from '../../../core/components/geo-coder/lib/types'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Lib from '.'
import { useEffect } from 'react'

export const useHomePage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const mapState = useSelector((root: RootState) => root.mapsReducer)
  const { coords, rotation, zoom, geoRes, query } = mapState
  const { lat, lng } = coords
  const { MAP_BOX_API_KEY } = process.env

  /**
   *
   *
   *
   * updates the url search query parameters when one of the associated states changes
   */
  const updateURL = () => {
    const searchObj: Lib.T.URLQueries = {
      lat: coords.lat.toString(),
      lng: coords.lng.toString(),
      query: query,
      rotation: rotation.toString(),
      zoom: zoom.toString(),
      geoRes: geoRes ? `'${JSON.stringify(geoRes)}'` : '',
    }
    const searchString = new URLSearchParams(searchObj).toString()
    navigate(`?${searchString}`, { replace: true })
  }

  /**
   *
   *
   *
   * checks the url search queries on first load and adds the desired setting to the maps
   */
  const checkURL = () => {
    const searchString = location.search
    const { geoRes, lat, lng, query, rotation, zoom } = <Lib.T.URLQueries>Object.fromEntries(new URLSearchParams(searchString))
    if (geoRes) {
      const res = JSON.parse(geoRes.substring(1, geoRes.length).substring(0, geoRes.length - 2))
      updateSearchResult(res)
    }
    if (lat && lng) {
      updateCoords(parseFloat(lat), parseFloat(lng))
    }
    if (query) {
      updateQuery(query)
    }
    if (rotation) {
      updateRotation(parseFloat(rotation))
    }
    if (zoom) {
      updateZoom(parseFloat(zoom))
    }
  }

  /**
   *
   * updates zoom state
   */
  const updateZoom = (newZoom: number) => dispatch(mapsActions.setMapZoom(newZoom))

  /**
   *
   * updates rotation state
   */
  const updateRotation = (newRotation: number) => dispatch(mapsActions.setMapRotation(newRotation))

  /**
   *
   * updates coords (lat, lng) state
   */
  const updateCoords = (lat: number, lng: number) => dispatch(mapsActions.setMapCoords({ lat, lng }))

  /**
   *
   * updates search result state
   */
  const updateSearchResult = (res?: OutputResult) => dispatch(mapsActions.setGeoResult(res))

  /**
   *
   * updates query state
   */
  const updateQuery = (query: string) => dispatch(mapsActions.setQuery(query))

  /**
   *
   *
   *
   * base props for both `OpenLayers` & `MapBox` components which has same keys and values
   */
  const baseMapsProps: Omit<OpenLayersProps, 'geoCoderId'> = {
    coords: { lat, lng },
    accessToken: MAP_BOX_API_KEY ?? '',
    searchResult: geoRes,
    query,
    rotation,
    zoom,
    onCoordsChange: updateCoords,
    onRotationChange: updateRotation,
    onZoomChange: updateZoom,
    onResult: updateSearchResult,
    onClear: updateSearchResult,
    onQueryChange: updateQuery,
  }

  useEffect(checkURL, [])
  useEffect(updateURL, [mapState])
  return { baseMapsProps }
}
