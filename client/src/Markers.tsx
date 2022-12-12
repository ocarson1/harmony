import React from "react";
import { Marker } from "react-map-gl";
import mockSongs from './mockData/mockSongs.json'
//import { useStateMap } from "../hooks/mapHook";
export const Markers = () => {
    const songdata = mockSongs;
    
    


    

    
  //const { markers } = useStateMap();
  return (
    
      
        <Marker
          latitude={41.8}
          longitude={-71.5}
          
       >

         <img src="https://i.scdn.co/image/ab67616d0000b27304b052e84325a16bc18a4c78" width={40} height={40}/>
        </Marker>
      
    
  )
}