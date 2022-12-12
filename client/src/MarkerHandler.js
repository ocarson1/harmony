import mapboxgl from "mapbox-gl";
import songData from './mockData/mockSongs.json'



// change this so that JSON is a parameter instead of imported data


// localhost:3232/getCollection?name=songs


export default function MarkerHandler(map) {
    const tokens = Object.keys(songData);

    for (const token of tokens) {
        console.log("token")
        console.log(token)
        const data = songData[token].data;
        console.log(data)
        const track_data = data["track_data"]
        console.log(track_data)

        const geojson = data["userGeoJSON"]
        console.log("userGeoJson")
        console.log(geojson)

        const img_url = track_data["img_url"]
        console.log(img_url)

        map.loadImage(
            img_url,
            (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker', image);
                map.addSource('point', {
                    'type': 'geojson',
                    'data': geojson

                })
                map.addLayer({
                    'id':'points',
                    'type':'symbol',
                    'source':'point',
                    'layout': {
                        'icon-image':'custom-marker'
                    }
                })
            })

    }
}

