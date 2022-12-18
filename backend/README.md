# FINAL PROJECT README

## Project Details
Project name: Harmony \
Team members: Grace Cantarella (gcantare), Arman Deendar (adeendar), Alec Lippman (alippman), Vivian Li (vli18), Owen Carson (ocarson1) \
Link to repo:  https://github.com/cs0320-f2022/term-project-adeendar-alippman-gcantare-ocarson1-vli18\
Total time for project: ~90 hours

## Design Choices
### Backend
Our backend handles requests for data from the frontend. The backend interacts with the Spotify API and its various
endpoints in order to retrieve information about songs, users, artists, etc. 
In the backend, we have a Firebase Firestore database that has three root-level collections: users, songs, and songInfo.
"Users" stores information based on user id number, "songs" stores data based on the access token, and "songInfo" stores info based on
the song's id number. Our multiple endpoints allow the frontend to retrieve information about users (ex: user profile), songs (ex: getTrack),
and interactions between the users and songs (ex: add song, add liked song, get recommendation). 
The backend also deals with the algorithmic complexity component of our project, which comes through the quicksort algorithm. This is implemented
as part of our playlist recommendation functionality, which recommends songs to users based on the songs located in a specific geographic
area. The use of quicksort allows us to design the way we want to do the recommendation, and since an initial goal of our project was to promote
lesser-known artists and songs, the sorting is done based on the popularity value of songs related to songs that are on the map.

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
Also, as we are using a Firestore database, you will not be able to run the server unless you have the Service Account Key
information, which is a JSON file in our gitignore as the information needs to stay private and not be included in our github.
Please let one of us know if you would need access to this file. 
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
Query structure: localhost:3232/getTrack?token=[token]
8) <b> GetUserProfileHandler </b>
Gets information about the user's profile through their token.  \
Query structure: localhost:3232/getUser?token=[token]
9) <b> UserLocationHandler </b>
Places information about the user and their location into the firestore database. \
Query structure: localhost:3232/userLoc?token=[token]&lat=[latitude]&lon=[longitude]

### Run tests
Because of the structure of our tests, where in some classes each individual test takes in
a new instance of Firebase as it is required as an instance variables, tests that should pass will
fail if multiple tests are run at once. If a handler class takes in Firebase as a parameter, then
we suggest running each test individually through IntelliJ, or through running a single test with mvn.
To run a single test with mvn, use "mvn -Dtest=NameOfTestClass#nameOfTest test" where NameOfTestClass is the
name of a test class and nameOfTest is the name of a test within that class. Make sure you have run mvn
package before that.

If you want to run all tests, run mvn package. Be aware that certain tests may fail, that should not.
