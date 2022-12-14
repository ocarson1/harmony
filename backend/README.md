# FINAL PROJECT README

## Project Details
Project name: Harmony \
Team members: Grace Cantarella (gcantare), Arman Deendar (), Alec Lippman (), Vivian Li (), Owen Carson\
Link to repo:  https://github.com/cs0320-f2022/term-project-adeendar-alippman-gcantare-ocarson1-vli18\
Total time for project: 

## Design Choices
### Backend
Our backend handles requests for data from the frontend. The backend interacts with the Spotify API and its various
endpoints in order to retrieve information about songs, users, artists, etc. 
In the backend, we have a Firebase Firestore database that has three root-level collections: users, songs, and songInfo.
"Users" stores information based on user id number, "songs" stores data based on the access token, and "songInfo" stores info based on
the song's id number. 

## Errors/Bugs
None.

## Tests
### Backend tests
We have multiple types of tests on the backend: unit tests, integration tests, fuzz tests, and tests involving mocks. 
The unit tests were primarily used before we integrated the front end and the backend together, where it was imperative
to use unit tests with mocks to ensure that JSONs containing mock response data from the Spotify API were being 
deserialized correctly based on the classes we had written for each handler.
We use integration testing with Spark to test the error handling of every handler, to make sure that incorrectly formed calls
should be responded to with the correct error response. We also test that successive calls to handlers will not result in
malformed responses as well.
We use fuzz testing to ensure that our handlers will not break the server if they are run many times. Though we don't anticipate
a high amount of traffic on our site, many sites do; and to make sure that our app is scalable, we utilized random testing for this purpose.

## How To...

### Use our backend API
You must run our server before attempting to use any of our handlers. In addition, you must have a 
valid access token, which is retrieved through the frontend authorization process.
1) <b> AddSongAtLocHandler </b>
Associates a specified song (retrieved from song id) to a specific location (retrieved from latitude and longitude).
The information is added to the database. \
Query structure: localhost:3232/addSongAtLoc?token=[token]&lat=[latitude]&lon=[longitude]&id=[song id]
2) <b> AddSongHandler </b>
Associates the user's most recently listened-to song (retrieved through their access token) to a specific location (
retrieved) from latitude and longitude). \
Query structure: localhost:3232/add?token=[token]&lat=[latitude]&lon=[longitude]
3) <b> AddToLikedSongsHandler </b>
Adds a specified song (retrieved from song id) to the user's library of saved songs, or removes 
a saved song from the library, depending on the boolean value of the add parameter. \
Query structure: localhost:3232/addLike?token=[token]&id=[song id]&add=[true or false]
4) <b> GetCollectionHandler </b>
Retrieves all stored data from a specified collection of the database as a serialized map of string to object. \
Query structure: localhost:3232/getCollection?name=[name of collection]
5) <b> GetRecentSongHandler </b>
Retrieves the song id, name, and image url of the user's most recently played song through their access token. \
Query structure: localhost:3232/getRecentSong?token=[token]
6) <b> GetRecommendationHandler </b>
Retrieves a list of song recommendations for the user based on their access token and a list of song ids. 
The recommendation algorithm is utilizing quicksort. \
Query structure: localhost:3232/getRecs?token=[token]&songIds=[id],[id],[id]
7) <b> GetTrackHandler </b>
Gets metadata on a specified track, retrieved through its song id and the user's access token. \
Query structure: localhost:3232/
8) <b> GetUserProfileHandler </b>
Gets information about the user's profile through their token.  \
Query structure: localhost:3232/getUser?token=[token]
9) <b> UserLocationHandler </b>
Places information about the user and their location into the firestore database. \
Query structure: localhost:3232/userLoc?token=[token]&lat=[latitude]&lon=[longitude]

### Run tests
