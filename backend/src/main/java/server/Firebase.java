package server;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Firebase {

  private Firestore db;

  public Firebase() {
    this.initializeFirebase();
  }

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

      //figure out a better way to handle this exception later!
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public void testAdd() {
    HashMap<String, Object> userMap = new HashMap<>();
    userMap.put("name", "Arman");
    userMap.put("location", "Providence, RI");
    userMap.put("song", "Like A Tattoo - Sade");

    this.addUser(userMap);
  }

  // the parameter needs to contain a few dataum: the user's specific ID/name; and the spotify data we want to actually access
  public void addUser(Map<String, Object> user) {
    ///.document("username") needs to be changed to the actual user token (each document name must be unique)
    this.db.collection("users").document("username2").set(user);
  }
}