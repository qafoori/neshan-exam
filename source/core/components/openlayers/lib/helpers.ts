import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

/**
 *
 *
 *
 * makes tile layer for map
 */
export const tileLayer = () => {
  return new TileLayer({
    source: new XYZ({
      url: 'http://mt0.google.com/vt/lyrs=p&hl=fa&x={x}&y={y}&z={z}',
    }),
  })
}
