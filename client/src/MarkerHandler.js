import mapboxgl from "mapbox-gl";
import songData from './mockData/mockSongs3.json'



// change this so that JSON is a parameter instead of imported data


// localhost:3232/getCollection?name=songs

// Map docs: https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage


export default async function MarkerHandler(map) {
    const tokens = Object.keys(songData);
    let count = 0;
    for (const token of tokens) {
        console.log("token")
        console.log(token)

        const data = songData[token].data;
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
                        'icon-allow-overlap':true  //undecided if i want to keep this or not
                    },
                    'paint': {
                        'icon-halo-blur':1,
                        'icon-halo-width':10
                    }

                });
            })
            console.log("Image Count:" + count)
            count++
            map.on('click', token, (e) => {
                console.log(token)
                
            })

    }

}

