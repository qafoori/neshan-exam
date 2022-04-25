import { OutputResult, GeoCoderProps } from '../../geo-coder/lib/types'

export interface MapboxProps extends Omit<GeoCoderProps, 'id'> {
  accessToken: string
  zoom: number
  coords: Coords
  rotation: number
  geoCoderId: string
  searchResult?: OutputResult
  onZoomChange?: (zoom: number) => void
  onCoordsChange?: (latitude: number, longitude: number) => void
  onRotationChange?: (rotation: number) => void
}

export type Coords = { lat: number; lng: number }

export type TypedMarker = mapboxgl.Marker & {
  type: MarkerType
}

export type MarkerType = 'searched' | 'clicked'
