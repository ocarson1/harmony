import mapboxgl from "mapbox-gl";
import ts from "typescript";
import songData from './mockData/mockSongs3.json'

// Map docs: https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage

// Layer docs: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-property





export default async function MarkerHandler(map, setModalActivation, setSongSelected, setModalLoc) {
    
    //fetch song data
    fetch('http://localhost:3232/getCollection?name=songs')
        .then(r => r.json())
        .then(json => {handleJSON(json.data, map, setModalActivation, setSongSelected, setModalLoc)})
}

function filterJSON(json, criteria) {
    var filtered = Object.values(json).filter(entry => {
        return entry["data"]["track-data"]["release_date"] == criteria
    })
    return filtered
}


function handleJSON(json, map, setModalActivation, setSongSelected, setModalLoc) {
    console.log(filterJSON(json,'2022'))
    const tokens = Object.keys(json);
        let count = 0;
        for (const token of tokens) {

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

            if(!map.hasImage(token)) {
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
                            'icon-anchor':"top",
                            'icon-size':0.1,
                            'icon-allow-overlap':true,  //undecided if i want to keep this or not                          
                        },
                        'paint': {
                        }

                    });
                })
                console.log("Image Count:" + count)
                count++
                //centers the map on the coordinates of a clicked marker

                // click docs: https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent#point
                
                
                map.on('click', token, (e) => {

                    var x = e.point.x
                    var y = e.point.y

                    // map.flyTo({
                    //     center: e.features[0].geometry.coordinates
                    // });

                    setModalActivation(true)
                    setSongSelected(track_data)
                    setModalLoc([x,y])

                    console.log("mh" + track_data)
                    console.log("mouse" +  e.point.x)

                });


                // map.on('click', (e) => {
                //     setModalActivation(false)
                // })
                //changes the cursor to a pointer when it enters a marker layer
                map.on('mouseenter',token, () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                //changes the cursor back to its original state after leaving a marker layer
                map.on('mouseleave', token, () => {
                    map.getCanvas().style.cursor ='';
                });
        }
    }
}

