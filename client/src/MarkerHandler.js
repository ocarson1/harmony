import mapboxgl from "mapbox-gl";
import ts from "typescript";
import songData from './mockData/mockSongs3.json'

// Map docs: https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage

// Layer docs: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-property





export default async function MarkerHandler(map, setModalActivation, setSongSelected, setModalLoc) {
    
    fetch('http://localhost:3232/getCollection?name=songs')
        .then(r => r.json())
        .then(json => {jsonToMarkers(json.data, map, setModalActivation, setSongSelected, setModalLoc)})
}
//jsonToMarkers(songData, map, setModalActivation, setSongSelected, setModalLoc)
//}

function filterJSON(json, criteria) {
    var filtered = Object.values(json).filter(entry => {
        return entry["data"]["track-data"]["release_date"] == criteria
    })
    return filtered
}

function jsonToMarkers(json, map, setModalActivation, setSongSelected, setModalLoc) {
    //console.log(filterJSON(json,'2022'))
    const ids = Object.keys(json);
        for (const id of ids) {

            const data = json[id].data;
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

            if(!map.hasImage(id)) {
            map.loadImage(
                img_url,
                (error, image) => {
                    if (error) throw error;
                    map.addImage(id, image);
                    map.addSource(id, {
                        'type': 'geojson',
                        'data': geojson
                    })
                    map.addLayer({
                        'id':id,
                        'type':'symbol',
                        'source':id,
                        'layout': {
                            'icon-image':id,
                            'icon-anchor':"top",
                            'icon-size':0.1,
                            'icon-allow-overlap':true,  //undecided if i want to keep this or not                          
                        },
                    });
                })

                map.on('click', id, (e) => {
                    var x = e.point.x
                    var y = e.point.y

                    setModalActivation(true)
                    setSongSelected(track_data)
                    setModalLoc([x,y])
                });

                //changes the cursor to a pointer when it enters a marker layer
                map.on('mouseenter',id, () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                //changes the cursor back to its original state after leaving a marker layer
                map.on('mouseleave', id, () => {
                    map.getCanvas().style.cursor ='';
                });
        }
    }
}

