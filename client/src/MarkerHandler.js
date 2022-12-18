import mapboxgl from "mapbox-gl";
import ts from "typescript";
import songData from './mockData/mockSongs3.json'

// Map docs: https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage

// Layer docs: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-property



export default async function MarkerHandler(map, setModalActivation, setSongSelected, setModalLoc, setFilterCategories, filter) {
    
    fetch('http://localhost:3232/getCollection?name=songs')
        .then(r => r.json())
        .then(json => {
            if (json.result == "success") {
            console.log("Fetching getCollection"); 
            console.log(json)
            // category and criteria set so that all songs render by default
            jsonToMarkers(json.data, map, setModalActivation, setSongSelected, setModalLoc, setFilterCategories, filter)}
})
}

let years = new Set
let genres = new Set


function jsonToMarkers(json, map, setModalActivation, setSongSelected, setModalLoc, setFilterCategories, filter) {
    
    //console.log(filterJSON(json,'2022'))
    console.log(Object.keys(json))
    const entries = Object.keys(json);

        for (const entry of entries) {

            const entryData = json[entry].data;
            // console.log("data")
            // console.log(data)

            const track_data = entryData["track-data"]
            // console.log("track data")
            // console.log(track_data)

            // console.log(track_data["title"])

            const geojson = entryData["userGeoJSON"]
            // console.log("userGeoJson")
            // console.log(geojson)

            const img_url = track_data["img_url"]
            // console.log("img_url")
            // console.log(img_url)

            //const genres = Array.from(track_data["genres"])
            console.log("GENRES ARRAY "+ genres)

            years.add(track_data["release_date"]);

            genres.forEach((x) => {
            genres.add(x)
            })
            
            if (Object.keys(filter).length != 0) {
                console.log(filter)
            for (let key of Object.keys(filter)) {
                console.log(key + " = " + filter[key])
            }
        }

            console.log(years)
            console.log(genres)

            

            //if (track_data[filter] == criteria) {
            let filterKeys = Object.keys(filter)

            console.log(filterKeys[0])
            console.log(filter[filterKeys[0]])

            //hard coded
            if (track_data[filterKeys[0]] == filter[filterKeys[0]] || genres.has(filter[filterKeys[0]])) {

                console.log("TRUE")
                map.setLayoutProperty(entry, 'visibility', 'visible');


                if(!map.hasImage(entry)) {
                map.loadImage(
                    img_url,
                    (error, image) => {
                        if (error) throw error;
                        map.addImage(entry, image);
                        map.addSource(entry, {
                            'type': 'geojson',
                            'data': geojson
                        })
                        map.addLayer({
                            'id':entry,
                            'type':'symbol',
                            'source':entry,
                            'layout': {
                                'icon-image':entry,
                                'icon-anchor':"top",
                                'icon-size':0.1,
                                'icon-allow-overlap':true,  //undecided if i want to keep this or not                          
                            },
                        });
                    })

                    map.on('click', entry, (e) => {
                        var x = e.point.x
                        var y = e.point.y

                        setModalActivation(true)
                        setSongSelected(track_data)
                        setModalLoc([x,y])
                    });

                    //changes the cursor to a pointer when it enters a marker layer
                    map.on('mouseenter',entry, () => {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    //changes the cursor back to its original state after leaving a marker layer
                    map.on('mouseleave', entry, () => {
                        map.getCanvas().style.cursor ='';
                    });
        }
    }
    else map.setLayoutProperty(entry, 'visibility', 'none');
    }
    setFilterCategories([years, genres])
}

