import { HTMLAttributes } from 'react'

export interface GeoCoderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  accessToken: string
  id: string
  onClear?: () => void
  onResult?: (result: OutputResult) => void
}

/**
 *
 *
 * manipulated an clean result from geocoder
 */
export type OutputResult = {
  coords: [number, number]
  wiki: string
  address: string
  country: string
  city: string
}

/**
 *
 *
 * dirty result from geocoder
 * this type defined because geocoder package doesn't have this type it self
 */
export type InputResult = {
  id: string
  type: string
  place_type: string[]
  relevance: number
  text_fa: string
  language_fa: string
  place_name_fa: string
  text: string
  language: string
  place_name: string
  matching_text: string
  matching_place_name: string
  bbox: number[]
  center: [number, number]
  context: {
    id: string
    wikidata: string
    short_code: string
    text_fa: string
    language_fa: string
    text: string
    language: string
  }[]
  geometry: {
    type: string
    coordinates: [number, number]
  }
  properties: {
    short_code: string
    wikidata: string
  }
}
