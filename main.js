import Map from 'ol/Map.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import View from 'ol/View.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';

const vectorSource = new VectorSource({
  url: './Historic_GeoMAC_Perimeters_2003.geojson',
  format: new GeoJSON(),
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vectorLayer,
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
