import { FeatureCollection } from "geojson";
import { FillLayer } from "react-map-gl";


// Type predicate for FeatureCollection
export function isFeatureCollection(json: any): json is FeatureCollection {
    console.log(json.type === "FeatureCollection")
    return json.type === "FeatureCollection"
}

export function overlayData(): Promise<GeoJSON.FeatureCollection | undefined> {
  const url = 'http://localhost:3600/redlining'
  
  return fetch(url)
    .then(response => response.json())
    .then(data => data['data'])
    .catch(error => console.log(error))
}

////////////////////////////////////

const propertyName = 'holc_grade';

export const geoLayer: FillLayer = {
    id: 'geo_data',
    type: 'fill',
    paint: {
        'fill-color': [
            'match',
            ['get', propertyName],
            'A',
            '#5bcc04',
            'B',
            '#04b8cc',
            'C',
            '#e9ed0e',
            'D',
            '#d11d1d',
            /* other */ '#ccc'
        ],
        'fill-opacity': 0.2
    }
};
