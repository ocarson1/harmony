import { FeatureCollection } from "geojson"
import { resolve } from "node:path/win32";
import { FillLayer } from "react-map-gl";
import { MapboxScaleControl } from "react-map-gl/dist/esm/types";

// Import the raw JSON file
import rl_data from "./mockData/mockMarkers.json"

// Type predicate for FeatureCollection
function isFeatureCollection(json: any): json is FeatureCollection {
    return json.type === "FeatureCollection"
}

export async function overlayData(): Promise<GeoJSON.FeatureCollection | undefined> {
  
  // HARMONY: to use fetchGeoJSON uncomment this out and comment out the rl data import
  //let rl_data = await fetchGeoJSON(24,50,-126,-60)

  if(isFeatureCollection(rl_data)) {
    return rl_data
  }
  else return undefined
}


// HARMONY:  We will probably need to fetch our GeoJSON in a way similar to this because the point data is always changing. Not 
// using this method right now because I'm testing out adding images with mock geoJSON data.
async function fetchGeoJSON(minLat: Number, maxLat: Number, minLon: Number, maxLon: Number) {
  let url: string = `http://localhost:2023/redlining?minLat=${minLat}&maxLat=${maxLat}&minLon=${minLon}&maxLon=${maxLon}`
  return await fetch(url)
    .then(r => r.json())
    .then(json => {
      if (json !== undefined) {
        if (json.result === "success") {
          return(json)
        }
        else {
          return "ERROR Fetching GeoJSON Data"
      }
    }
    })
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

