import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import {myKey} from './private/key'
import './styles/MapBox.css'
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
  const [lng, setLng] = useState(-71);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9); 

  const [modalActivation, setModalActivation] = useState(false)
  const [songSelected, setSongSelected] = useState(new Map)
  const [modalLoc, setModalLoc] = useState([0,0])
  const geocoder = new MapboxGeocoder({
    accessToken: myKey,
    mapboxgl: mapboxgl,
  });

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
    });

    var geocoder = new MapboxGeocoder({
      accessToken: myKey,
      mapboxgl: mapboxgl,
    });
    geocoder.addTo('#geocoder-container')
    myMap.current.addControl(geocoder);
  });


  // change the style of the map if the theme value chages
  useEffect(() => {
    myMap.current.setStyle((props.theme ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'))
  },[props.theme])

  // layout the markers
  useEffect(()=> {
    if (!myMap.current) return; // wait for map to initialize
    MarkerHandler(myMap.current, setModalActivation, setSongSelected, setModalLoc)
  })

  // handle movement of the map
  useEffect(() => {
    if (!myMap.current) return; // wait for map to initialize
    myMap.current.on('move', () => {
      setLng(myMap.current.getCenter().lng.toFixed(4));
      setLat(myMap.current.getCenter().lat.toFixed(4));
      setZoom(myMap.current.getZoom().toFixed(2));
      setModalActivation(false)
    });
  })

  // NOTE: mapContainer must be a div of its own for mapbox to work properly
  return (
    <div className="geomap-container">
      <div ref={mapContainer} className="map-container"></div>
      <div id="geocoder-container"></div>
      <Modal isActivated={modalActivation} songData={songSelected} location={modalLoc}>
        {/* <button className="modal-button" onClick={setModalActivation(false)}>CLOSE</button> */}
      </Modal>
    </div>
  );
}