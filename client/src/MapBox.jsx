import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import {myKey} from './private/key'
import './styles/MapBox.css'
import MarkerHandler from './MarkerHandler'
import Modal from './components/Modal'
import ts from 'typescript';

//mapbox with react documentation:
//https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

mapboxgl.accessToken = myKey;

export default function GenerateMap(props) {
  const mapContainer = useRef(null);
  const myMap = useRef(null);

  const [lng, setLng] = useState(-71.418884);
  const [lat, setLat] = useState(41.825226);
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
  }, [props.theme])

  // handle movement of the map
  useEffect(() => {
    if (!myMap.current) return; // wait for map to initialize
    myMap.current.on('move', () => {
      setLng(myMap.current.getCenter().lng.toFixed(4));
      setLat(myMap.current.getCenter().lat.toFixed(4));
      setZoom(myMap.current.getZoom().toFixed(2));

      //disable any open modals
      setModalActivation(false)

      // change the bounds for the geoplaylist to use
      props.setBounds(myMap.current.getBounds())
    });
  })

  // NOTE: mapContainer must be a div of its own for mapbox to work properly
  return (
    <div>
      <div ref={mapContainer} className="map-container"></div>
      <div id="geocoder-container"></div>
      <Modal isActivated={modalActivation} songData={songSelected} location={modalLoc}>
        {/* <button className="modal-button" onClick={setModalActivation(false)}>CLOSE</button> */}
      </Modal>
    </div>
  );
}
