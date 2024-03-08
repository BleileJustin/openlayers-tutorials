import DragAndDrop from 'ol/interaction/DragAndDrop';
import GeoJSON from 'ol/format/GeoJSON';
import Link from 'ol/interaction/Link';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {OSM} from 'ol/source';

const map = new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

const source = new VectorSource();

const layer = new VectorLayer({
  source: source,
});

map.addLayer(layer);

map.addInteraction(new Link());
map.addInteraction(
  new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON],
  })
);
