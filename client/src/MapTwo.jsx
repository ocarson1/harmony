import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// eslint-disable-line import/no-webpack-loader-syntax
import {myKey} from './private/key'
//import './styles/Map.css'


//TODO: redo light/dark mode switching

//this code is heavily inspired by the mapbox documentation:
//https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

mapboxgl.accessToken = myKey;

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9); 

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: props.theme ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom
    });

    var geocoder = new MapboxGeocoder({
      accessToken: myKey,
      mapboxgl: mapboxgl,
    });
    geocoder.addTo('#geocoder-container')

  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
 
  return (
    <div>
      <div ref={mapContainer} className="map-container">
        <div id="geocoder-container"></div>
      </div>
    </div>
  );
}
