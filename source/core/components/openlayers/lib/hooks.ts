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

export const useOpenLayers = ({ coords, rotation, zoom, onCoordsChange, onRotationChange, onZoomChange, searchResult, onClear, geoCoderId, onQueryChange, query }: Lib.T.OpenLayersProps) => {
  const mapElement = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<ol.Map | null>(null)
  const markers = useRef<(Lib.T.TypedMarker | null)[]>([])
  const { lat, lng } = coords

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

  const onZoom = () => {
    if (mapRef.current) {
      mapRef.current.getView().setZoom(zoom + 1)
    }
  }

  const onCoords = () => {
    if (mapRef.current) {
      mapRef.current.getView().setCenter([lng, lat])
    }
  }

  const onRotate = () => {
    if (mapRef.current) {
      mapRef.current.getView().setRotation((-1 * rotation) / 30 / Math.PI)
    }
  }

  const onResultClear = () => {
    clearMarkers('searched')
    onClear && onClear()
    onQueryChange && onQueryChange('')
  }

  const onResult = () => {
    const { current } = mapRef
    if (!current) {
      return
    }
    if (!searchResult) {
      clearMarkers('searched')
      return
    }

    const { address, city, coords, country, wiki } = searchResult
    const [lat, lng] = transform(coords, 'EPSG:3857', 'EPSG:4326')

    addMarker([lat, lng], 'searched')
    current.getView().setZoom(15)
    current.getView().setCenter(coords)
  }

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
