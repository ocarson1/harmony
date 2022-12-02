package server;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.IOException;

public class Firebase {

  /**
   * followed instructions from this video: https://www.youtube.com/watch?v=Mcsp59_2E7E&t=175s
   */
  public void initializeFirebase() throws IOException {
    //get private key
    FileInputStream serviceAccount = new FileInputStream("./ServiceAccountKey");

    FirebaseOptions options = new FirebaseOptions.Builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .build();

    FirebaseApp.initializeApp(options);
    Firestore db = FirestoreClient.getFirestore();
  }

}