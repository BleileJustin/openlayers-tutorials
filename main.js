import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import DragAndDrop from 'ol/interaction/DragAndDrop';
import GeoJSON from 'ol/format/GeoJSON';
import Link from 'ol/interaction/Link';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/WebGLTile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {OSM} from 'ol/source';
import LayerSwitcher from 'ol-layerswitcher';

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

const locSource = new VectorSource({
  url: './data/geojson/world-cities.geojson',
  format: new GeoJSON(),
});

const layer = new VectorLayer({
  title: 'Layer',
  source: source,
});

const locLayer = new VectorLayer({
  title: 'Location',
  source: locSource,
});

map.addLayer(locLayer);
map.addLayer(layer);

map.addInteraction(new Link());
map.addInteraction(
  new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON],
  })
);

const layerSwitcher = new LayerSwitcher({
  activationMode: 'click',
  startActive: false,
  groupSelectStyle: 'children',
});

map.addControl(layerSwitcher);
