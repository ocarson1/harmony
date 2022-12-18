/**
 * MapBox is the class in charge of rendering the map portion of the webapp interface. Because of this, it handles
 * most of the reactive map functionality from Mapbox Gl JS, including view changing, setting the style, and determining
 * map interaction.
 */
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import {myKey} from './private/key'
import './styles/MapBox.css'
import MarkerHandler from './MarkerHandler'
import Modal from './components/Modal'
import ts from 'typescript';



mapboxgl.accessToken = myKey;

export default function GenerateMap(props) {
  const mapContainer = useRef(null);
  const myMap = useRef(null);

  const [lng, setLng] = useState(-71.4025);
  const [lat, setLat] = useState(41.8268);
  const [zoom, setZoom] = useState(15); 

  const [modalActivation, setModalActivation] = useState(false)
  const [songSelected, setSongSelected] = useState(new Map)
  const [modalLoc, setModalLoc] = useState([0,0])

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
    myMap.current.addControl(geocoder);
    geocoder.addTo('#geocoder-container')

  });

  // change the style of the map if the theme value chages
  useEffect(() => {
    myMap.current.setStyle((props.theme ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'))
  },[props.theme])

  // layout the markers
  useEffect(()=> {
    if (!myMap.current) return; // wait for map to initialize
    MarkerHandler(myMap.current, setModalActivation, setSongSelected, setModalLoc, props.setFilterCategories, props.filter)
  }, [props.theme, props.filter])

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
      <div ref={mapContainer} className="map-container"> 
      <div id="geocoder-container"></div>
  </div>
      <Modal isActivated={modalActivation} setActivation={setModalActivation} songData={songSelected} location={modalLoc} token={props.token}>
        {/* <button className="modal-button" onClick={setModalActivation(false)}>CLOSE</button> */}
      </Modal>
    </div>
  );
}
