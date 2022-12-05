import React, { useEffect, useState } from 'react';
import Map, {    
   ViewState, ViewStateChangeEvent,
   MapLayerMouseEvent,
   Source, Layer } from 'react-map-gl'  

import 'mapbox-gl/dist/mapbox-gl.css'
import './styles/Map.css'

import {myKey} from './private/key'

import {overlayData, geoLayer} from './overlays' 

function onMapClick(e: MapLayerMouseEvent) {
  console.log(e)
}

interface mapProps {
  theme: boolean;
  setTheme: Function;
}

export default function GenerateMap(props: mapProps) {

  const [viewState, setViewState] = useState<ViewState>({
    longitude: -71.4129,
    latitude: 41.8245,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    // This isn't required if we look at the docs...
    // https://visgl.github.io/react-map-gl/docs/api-reference/types
    // Unfortuntely, that seems to have changed. See:
    // https://docs.mapbox.com/mapbox-gl-js/api/properties/#paddingoptions
    padding: {top: 1, bottom: 20, left: 1, right: 1}
  });  
  
  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(undefined)

  // Run this _once_, and never refresh (empty dependency list)
  useEffect(() => {
    overlayData().then(geoJSON => setOverlay(geoJSON))
  }, [])

  return (
    <div className="map-container">
    <div className="map-demo">
      <div className="map-demo-map">   
        {/* We could use {...viewState} for the 6 viewState fields, 
            but "spread" syntax wasn't covered in class. */}
        <Map 
         mapboxAccessToken={myKey}
         latitude={viewState.latitude}
         longitude={viewState.longitude}
         zoom={viewState.zoom}
         pitch={viewState.pitch}
         bearing={viewState.bearing}
         padding={viewState.padding}
         onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)} 
         onClick={(ev: MapLayerMouseEvent) => onMapClick(ev)}
         // This is too big, and the 0.9 factor is pretty hacky
         style={{width:(window.innerWidth - 406), height:window.innerHeight}} 
         mapStyle={props.theme ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'}>

          <Source id="geo_data" type="geojson" data={overlay}>
            <Layer id = {geoLayer.id} type = {geoLayer.type} paint = {geoLayer.paint} />
          </Source>
        </Map>       
      </div>
      {/* <div className='map-status'>
        {`lat=${viewState.latitude.toFixed(4)},
          long=${viewState.longitude.toFixed(4)},
          zoom=${viewState.zoom.toFixed(4)}`}
      </div> */}
    </div>
    <button className="playlist-button">MAKE A GEO-PLAYLIST

    </button>
    </div>
  );
}
