import * as Lib from '.'
import mapboxgl, { Map } from 'mapbox-gl'
import { useEffect, useRef } from 'react'

mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', e => e && console.error(e), true)

export const useMapBox = ({ coords, rotation, zoom, onCoordsChange, onRotationChange, onZoomChange, searchResult, accessToken, onClear, geoCoderId, onQueryChange, query }: Lib.T.MapboxProps) => {
  const mapElement = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markers = useRef<(Lib.T.TypedMarker | null)[]>([])
  const { lat, lng } = coords

  /**
   *
   *
   *
   * initiates the map and first functionalities
   */
  const createMap = () => {
    if (mapRef.current || !mapElement.current) {
      return
    }
    mapboxgl.accessToken = accessToken

    const options: mapboxgl.MapboxOptions = {
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      bearing: rotation,
      minZoom: 2,
      maxZoom: 18,
    }
    const map = new mapboxgl.Map(options)
    map.on('moveend', onMove)
    mapRef.current = map
  }

  /**
   *
   *
   *
   * when user moves the map, dispatches new values for `coordinates`, `zoom`, `rotation`
   */
  const onMove = () => {
    const { current } = mapRef
    if (current) {
      if (onCoordsChange) {
        const { lat, lng } = current.getCenter()!
        onCoordsChange(lat, lng)
      }
      if (onZoomChange) {
        onZoomChange(current.getZoom())
      }
      if (onRotationChange) {
        onRotationChange(current.getBearing())
      }
    }
  }

  /**
   *
   *
   *
   * updates map coords when they change from outside of this module
   */
  const onCoords = () => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng })
    }
  }

  /**
   *
   *
   *
   * updates map zoom when it change from outside of this module
   */
  const onZoom = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom)
    }
  }

  /**
   *
   *
   *
   * updates map rotation when it change from outside of this module
   */
  const onRotate = () => {
    if (mapRef.current) {
      mapRef.current.setBearing(rotation)
    }
  }

  /**
   *
   *
   *
   * triggers when user clears the result of geocoder component
   */
  const onResultClear = () => {
    clearMarkers('searched')
    onClear && onClear()
    onQueryChange && onQueryChange('')
  }

  /**
   *
   *
   *
   * triggers when user chooses one of the suggested results from geocoder component
   */
  const onResult = () => {
    const { current } = mapRef
    if (!current) {
      return
    }
    if (!searchResult) {
      clearMarkers('searched')
      return
    }
    const { coords } = searchResult
    const [lat, lng] = coords

    addMarker([lat, lng], 'searched')
    current.setZoom(15)
    current.setCenter(coords)
  }

  /**
   *
   *
   *
   * adds a marker to the map
   */
  const addMarker = (coords: [number, number], type: Lib.T.MarkerType) => {
    const { current } = mapRef
    if (!current) {
      return
    }

    const img = document.createElement('img')
    img.src = `${type}-marker.png`

    const marker = new mapboxgl.Marker({
      element: img,
      anchor: 'bottom',
    }) as Lib.T.TypedMarker

    marker.type = type
    markers.current = [...markers.current, marker]
    marker.setLngLat(coords)
    marker.addTo(current)
  }

  /**
   *
   *
   *
   * clears markers by their type, if `markerType = undefined` will clear all markers
   */
  const clearMarkers = (markerType?: Lib.T.MarkerType) => {
    const marks = markerType ? markers.current.filter(marker => marker?.type === markerType) : markers.current
    marks.forEach((marker, index) => {
      marker?.remove()
      markers.current[index] = null
    })
  }

  /**
   *
   *
   *
   * add a `input` listener to the geocoder input, in order to listen to it's changes and trigger `onQueryChange` function if passed
   */
  const addInputListener = () => {
    const input = document.querySelector(`#${geoCoderId} input`) as HTMLInputElement | null
    if (!input) {
      return
    }

    input.addEventListener('input', () => {
      const { value } = input
      onQueryChange && onQueryChange(value)
    })
  }

  /**
   *
   *
   *
   * triggers when query for the `geocoder` changes
   */
  const onQuery = () => {
    const input = document.querySelector(`#${geoCoderId} input`) as HTMLInputElement | null
    if (!input || !query) {
      return
    }
    input.value = query
  }

  useEffect(createMap, [])
  useEffect(onCoords, [lat, lng])
  useEffect(onZoom, [zoom])
  useEffect(onRotate, [rotation])
  useEffect(onResult, [searchResult])
  useEffect(addInputListener, [])
  useEffect(onQuery, [query])
  return { mapElement, onResultClear }
}
