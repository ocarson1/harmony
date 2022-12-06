package server;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class Firebase {

  private Firestore db;

  public Firebase() {
    this.initializeFirebase();
  }
//  public Firebase() {
//
//  }

  /**
   * followed instructions from this video: https://www.youtube.com/watch?v=Mcsp59_2E7E&t=175s
   */
  public void initializeFirebase()  {
    try {
      //get private key
      FileInputStream serviceAccount = new FileInputStream("src/main/java/server/ServiceAccountKey.json");

      FirebaseOptions options = new FirebaseOptions.Builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .build();

      FirebaseApp.initializeApp(options);
      this.db = FirestoreClient.getFirestore();
//      InputStream serviceAccount = new FileInputStream("src/main/java/server/ServiceAccountKey.json");
//      GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
//      FirebaseOptions options = new FirebaseOptions.Builder()
//          .setCredentials(credentials)
//          .build();
//      FirebaseApp.initializeApp(options);
//
//      Firestore db = FirestoreClient.getFirestore();
//      return db;

      //figure out a better way to handle this exception later!
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

//  public void testAdd() {
//    HashMap<String, Object> userMap = new HashMap<>();
//    userMap.put("name", "Arman");
//    userMap.put("location", "Providence, RI");
//    userMap.put("song", "Like A Tattoo - Sade");
//
//    this.addUserInfo("Arman", userMap);
//  }

  // the parameter needs to contain a few dataum: the user's specific ID/name; and the spotify data we want to actually access
  public void addUser(String username) {
    ///.document("username") needs to be changed to the actual user token (each document name must be unique)
    //this.db.collection("users").document("username2").set(user);
    this.db.collection("users").document(username);
  }

  public void addLocation(String username, Map<String, Object> userInfo) {
    this.db.collection("users").document(username).set(userInfo);
  }

  public void addSong(String id, Map<String, Object> songInfo) {
    this.db.collection("songs").document(id).set(songInfo);
  }
}