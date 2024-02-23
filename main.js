import Map from 'ol/Map.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import View from 'ol/View.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import Layer from 'ol/layer/Layer';
import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer';

let style;

class WebGLLayer extends Layer {
  createRenderer() {
    return new WebGLVectorLayerRenderer(this, {
      className: this.getClassName(),
      style,
    });
  }
}

const source = new VectorSource({
  url: './Historic_GeoMAC_Perimeters_2003.geojson',
  format: new GeoJSON(),
});

const getStyle = (dash, pattern) => {
  let newStyle = {
    variables: style
      ? style.variables
      : {
          width: 2,
          offset: 0,
          capType: 'butt',
          joinType: 'miter',
          miterLimit: 10, // ratio
          dashLength1: 25,
          dashLength2: 15,
          dashLength3: 15,
          dashLength4: 15,
          dashOffset: 0,
          patternSpacing: 0,
        },
    'stroke-width': ['var', 'width'],
    'stroke-color': 'red',
    'stroke-offset': ['var', 'offset'],
    'stroke-miter-limit': ['var', 'miterLimit'],
    'stroke-line-cap': ['var', 'capType'],
    'stroke-line-join': ['var', 'joinType'],
  };
  if (dash) {
    newStyle = {
      ...newStyle,
      'stroke-line-dash': [
        ['var', 'dashLength1'],
        ['var', 'dashLength2'],
        ['var', 'dashLength3'],
        ['var', 'dashLength4'],
      ],
      'stroke-line-dash-offset': ['var', 'dashOffset'],
    };
  }
  if (pattern) {
    delete newStyle['stroke-color'];
    newStyle = {
      ...newStyle,
      'stroke-pattern-src': 'data/dot.svg',
      'stroke-pattern-spacing': ['var', 'patternSpacing'],
    };
  }
  return newStyle;
};

style = getStyle(false, false);

const vectorLayer = new WebGLLayer({
  source,
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
