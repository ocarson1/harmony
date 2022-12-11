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
We use fuzz testing to [INSERT]

## How To...

### Run tests
