import mapboxgl from "mapbox-gl";
import ts from "typescript";
import songData from './mockData/mockSongs3.json'



// INTEGRATION TODO: change this so that JSON is a parameter instead of imported data
// localhost:3232/getCollection?name=songs

// Map docs: https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage

// Layer docs: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-property



export default async function MarkerHandler(map, setModalActivation, setSongSelected) {
    //fetch songdata

    fetch('http://localhost:3232/getCollection?name=songs')
        .then(r => r.json())
        .then(json => {handleJSON(json.data, map, setModalActivation, setSongSelected)})

//         .then(json => {console.log("Backend gave us" + JSON.parse(json));
//             handleJSON(json, map, setModalActivation, setSongSelected)})
// }
}

function handleJSON(json, map, setModalActivation, setSongSelected) {
    const tokens = Object.keys(json);
        let count = 0;
        for (const token of tokens) {
            console.log("token")
            console.log(token)

            const data = json[token].data;
            // console.log("data")
            // console.log(data)

            const track_data = data["track-data"]
            // console.log("track data")
            // console.log(track_data)

            // console.log(track_data["title"])

            const geojson = data["userGeoJSON"]
            // console.log("userGeoJson")
            // console.log(geojson)

            const img_url = track_data["img_url"]
            // console.log("img_url")
            // console.log(img_url)

            map.loadImage(
                img_url,
                (error, image) => {
                    if (error) throw error;
                    console.log(1)
                    map.addImage(token, image);
                    console.log("2 adding an image")
                    map.addSource(token, {
                        'type': 'geojson',
                        'data': geojson
                    })
                    map.addLayer({
                        'id':token,
                        'type':'symbol',
                        'source':token,
                        'layout': {
                            'icon-image':token,
                            'icon-size':0.1,
                            'icon-allow-overlap':true,  //undecided if i want to keep this or not
                            'icon-offset':[0,-50] //not working
                            
                        },
                        'paint': {
                            'icon-halo-blur':1,
                            'icon-halo-width':10
                        }

                    });
                })
                console.log("Image Count:" + count)
                count++
                //centers the map on the coordinates of a clicked marker
                map.on('click', token, (e) => {
                    console.log(token)
                    console.log(e.features[0].geometry.coordinates)
                    map.flyTo({
                        center: e.features[0].geometry.coordinates
                    });
                    setModalActivation(true)
                    setSongSelected(track_data)
                    console.log("mh" + track_data)



                });
                //changes the cursor to a pointer when it enters a marker layer
                map.on('mouseenter',token, () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                //changes the cursor back to its original state after leaving a marker layer
                map.on('mouseleave', token, () => {
                    
                });


        }
    }

