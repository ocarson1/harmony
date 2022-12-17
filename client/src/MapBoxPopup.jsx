import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, {Marker} from 'mapbox-gl'; 
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import {myKey} from './private/key'
import './styles/MapBoxPopup.css'
import MarkerHandler from './MarkerHandler'
import Modal from './components/Modal'
import ts from 'typescript';
import 'mapbox-gl/dist/mapbox-gl.css'

//mapbox with react documentation:
//https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

mapboxgl.accessToken = myKey;

export default function GenerateMap(props) {

  
  const mapContainer = useRef(null);
  const myMap = useRef(null);

  const [mapStyle, setMapStyle] = useState("");
  const [lng, setLng] = useState(-71.418884);
  const [lat, setLat] = useState(41.825226);
  const [zoom, setZoom] = useState(9); 

  // Initialize the map and the geocoder
  useEffect(() => {
    if (myMap.current) return;
   // initialize map only once
    myMap.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [lng, lat],
      zoom: zoom,
      projection: "mercator",
      controls: [],
      doubleClickZoom: false
    });
  });


  // change the style of the map if the theme value chages
  useEffect(() => {
    myMap.current.setStyle((props.theme ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'))
  },[props.theme])

  // handle movement of the map
  useEffect(() => {
    if (!myMap.current) return; // wait for map to initialize
    myMap.current.on('move', () => {
      setLng(myMap.current.getCenter().lng.toFixed(4));
      setLat(myMap.current.getCenter().lat.toFixed(4));
      setZoom(myMap.current.getZoom().toFixed(2));
    });
    let marker = new Marker()
    myMap.current.on('dblclick', (e) => {
      marker.setLngLat(e.lngLat).addTo(myMap.current);
      console.log(e.lngLat)
      props.setEntryLat(e.lngLat.lng)
      props.setEntryLon(e.lngLat.lat)
    })
  })

  // NOTE: mapContainer must be a div of its own for mapbox to work properly
  return (
    <div className="geomap-popup-container">
      <div ref={mapContainer} className="map-popup-container"></div>
    </div>
  );
}
