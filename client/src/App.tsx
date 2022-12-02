// import React, { useEffect, useState, useRef } from 'react'
// import Map, {    
//   ViewState, ViewStateChangeEvent,
//   MapLayerMouseEvent,
//   Source, Layer, PointLike, MapRef, MapboxGeoJSONFeature } from 'react-map-gl' 
// import 'mapbox-gl/dist/mapbox-gl.css'
// import './App.css';
// import {overlayData, geoLayer, isFeatureCollection} from './overlays'
// import Redlining from './Redlining'
// import {myKey} from './private/key'


// // global variables representing the state, city, and name of location last clicked on
// let requestedState: string = "";
// let requestedCity: string = "";
// let requestedName: string = "";

// /**
//  * App function that contains and sets up the React Components: Map and Redlining.
//  * This also contains the functionality of handling a click event on the map and updating
//  * the redlining properties.
//  * @returns App function 
//  */
// function App() {
//   const mapRef = useRef<MapRef>(null) // need types on this

//   const [viewState, setViewState] = useState<ViewState>({
//     longitude: -71.4129,
//     latitude: 41.8245,
//     zoom: 10,
//     bearing: 0,
//     pitch: 0,
//     padding: {top: 1, bottom: 20, left: 1, right: 1}
//   })

//   const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(undefined)

//   // handles the clicking event on a certain area of the map
//   const handleSubmit = (ev: MapLayerMouseEvent) => {
//     console.log(ev.point.x + " " + ev.point.y)
//     const bbox: [PointLike, PointLike] = [
//       [ev.point.x - 5, ev.point.y - 5],
//       [ev.point.x + 5, ev.point.y + 5]
//      ]

//      if (mapRef != null && mapRef.current != null) {
//        const selectedFeatures: MapboxGeoJSONFeature[] = mapRef.current.queryRenderedFeatures(bbox, {})
//        const fips = selectedFeatures.map((feature) => feature.properties)

//        if (fips[0] != null) {
//          console.log(fips[0].state)
//          console.log(fips[0].city)
//          console.log(fips[0].name)

//          if(fips[0].state != null && fips[0].state != null) {
//            requestedState = fips[0].state
//            requestedCity = fips[0].city
//            requestedName = fips[0].name
//          }
//          else {
//            requestedState = "Not a redlining area"
//            requestedCity = "Not a redlining area"
//            requestedName = "Not a redlining area"
//          }
//        }
//      }
//    }

//   // Run this _once_, and never refresh (empty dependency list)
//   useEffect(() => {
//     overlayData().then(data => {
//       setOverlay(() => {
//         if (isFeatureCollection(data)) {
//           return data
//         }

//         return undefined
//       })
//     })
//   }, [])

//   // returning the HTML of the Map and Redlining React components
//   return (
//     <div className="App">
//       <Map
//          ref={mapRef}
//          mapboxAccessToken={myKey}
//          latitude={viewState.latitude}
//          longitude={viewState.longitude}
//          zoom={viewState.zoom}
//          pitch={viewState.pitch}
//          bearing={viewState.bearing}
//          padding={viewState.padding}
//          onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)} 
//          onClick={handleSubmit}

//          style={{width:'auto', height:3*(window.innerHeight/4), margin: 'auto'}}
//          mapStyle={'mapbox://styles/mapbox/streets-v11'}>

//           <Source id="geo_data" type="geojson" data={overlay}>
//             <Layer {...geoLayer} />
//           </Source>
//         </Map>  
//         <Redlining state={requestedState} city={requestedCity} name={requestedName}/>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState, useRef } from 'react'
// import {Routes, Route, useNavigate} from 'react-router-dom'
import Map, {    
  ViewState, ViewStateChangeEvent,
  MapLayerMouseEvent,
  Source, Layer, PointLike, MapRef, MapboxGeoJSONFeature } from 'react-map-gl' 
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css';
import LogIn from './react-components/LogIn';

function App() {
  // const navigate = useNavigate();

  // const navigateLogin = () => {
  //   // 👇️ navigate to /login
  //   navigate('/login');
  // };

  // const navigateWebapp = () => {
  //   // 👇️ navigate to /webapp
  //   navigate('/webapp');
  // };

  // const openLogIn = () => {
  //   return (
  //     <div className="App">
  //     <div className="web-container">
  //       <img className="" src="./images/mapboxbackground.jpg"></img>
  //       <LogIn></LogIn>
  //     </div>
  //   </div>
  //   )
  // }
  // basic framework of first page
//   return (
//     <div className="App">
//       <div className="web-container">
//         <img className="" src="./images/mapboxbackground.jpg"></img>
//         <button onClick={navigateLogin}>Log In</button>
//         <button onClick={navigateWebapp}>Webapp</button>

//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Webapp />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

return (
  <div className="App">
    <div className="web-container">
      <img className="" src="./images/mapboxbackground.jpg"></img>
      <LogIn></LogIn>
    </div>
  </div>
);
}

// function Login() {
//   return <LogIn></LogIn>
// }

// function Webapp() {
//   return <h2>Contacts</h2>;
// }

export default App;