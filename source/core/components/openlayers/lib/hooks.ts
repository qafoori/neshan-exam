import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import * as ol from 'ol'
import * as Lib from '.'
import { MapOptions } from 'ol/PluggableMap'
import VectorSource from 'ol/source/Vector'
import { Icon, Style } from 'ol/style'
import Point from 'ol/geom/Point'
import { Vector as VectorLayer } from 'ol/layer'
import { fromLonLat, transform } from 'ol/proj'

export const useOpenLayers = ({ coords, rotation, zoom, onCoordsChange, onZoomChange, searchResult, onClear, geoCoderId, onQueryChange, query }: Lib.T.OpenLayersProps) => {
  const mapElement = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<ol.Map | null>(null)
  const markers = useRef<(Lib.T.TypedMarker | null)[]>([])
  const { lat, lng } = coords

  /**
   *
   *
   *
   * initiates the map and first functionalities
   */
  const createMap = () => {
    if (!mapElement.current) {
      return
    }
    const options: MapOptions = {
      target: mapElement.current,
      layers: [Lib.HE.tileLayer()],
      controls: [],
      view: new View({
        center: [lng, lat],
        zoom: zoom,
        projection: 'EPSG:4326',
        minZoom: 2,
        maxZoom: 18,
      }),
    }
    const map = new Map(options)
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
        const [lat, lng] = current.getView().getCenter()!
        onCoordsChange(lng, lat)
      }
      if (onZoomChange) {
        onZoomChange(current.getView().getZoom()! - 1)
      }
      // if (onRotationChange) { onRotationChange(current.getView().getRotation()) }
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
      mapRef.current.getView().setCenter([lng, lat])
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
      mapRef.current.getView().setZoom(zoom + 1)
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
      mapRef.current.getView().setRotation((-1 * rotation) / 30 / Math.PI)
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
    const [lat, lng] = transform(coords, 'EPSG:3857', 'EPSG:4326')

    addMarker([lat, lng], 'searched')
    current.getView().setZoom(15)
    current.getView().setCenter(coords)
  }

  /**
   *
   *
   *
   * adds a marker to the map
   */
  const addMarker = (coords: [number, number], type: 'searched' | 'clicked') => {
    const { current } = mapRef
    if (!current) {
      return
    }
    const iconFeature = new ol.Feature({
      geometry: new Point(fromLonLat(coords)),
    })
    const marker = new VectorLayer({
      source: new VectorSource({
        features: [iconFeature],
      }),
      style: new Style({
        image: new Icon({
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: `${type}-marker.png`,
          anchorOrigin: 'bottom-left',
        }),
      }),
    }) as Lib.T.TypedMarker

    marker.type = type
    markers.current = [...markers.current, marker]
    current.addLayer(marker)
  }

  /**
   *
   *
   *
   * clears markers by their type, if `markerType = undefined` will clear all markers
   */
  const clearMarkers = (markerType?: Lib.T.MarkerType) => {
    const { current } = mapRef
    if (!current) {
      return
    }

    const marks = markerType ? markers.current.filter(marker => marker?.type === markerType) : markers.current
    marks.forEach((marker, index) => {
      marker && current.removeLayer(marker)
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
