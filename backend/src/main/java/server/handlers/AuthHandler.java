//package server.handlers;
//
//import com.squareup.moshi.JsonAdapter;
//import com.squareup.moshi.Moshi;
//import java.net.URI;
//import server.handlers.auth.AuthObj;
//import spark.Request;
//import spark.Response;
//import spark.Route;
//import se.michaelthelin.spotify.SpotifyApi;
//
//public class AuthHandler implements Route {
//
//  private String clientID = "ce58270f079346658ebe132ae27ae27b";
//  private String clientSecret = "8ce08f38b60f474896c4ce17af94d709";
//
//  @Override
//  public Object handle(Request request, Response response) throws Exception {
////    String authURL = "https://accounts.spotify.com/authorize";
////    authURL += "?client_id=" + clientID;
////    authURL += "&response_type=code";
////    authURL += "&redirect_uri=" + "google.com";
////    authURL += "&show_dialog=false";
////    authURL += "&scope=user-read-recently-played user-read-email";
//    URI google = new URI("google.com");
//    SpotifyApi spotifyApi = new SpotifyApi.Builder()
//        .setClientId(this.clientID)
//        .setClientSecret(this.clientSecret)
//        .setRedirectUri(google)
//        .build();
//
//    Moshi moshi = new Moshi.Builder().build();
//    //JsonAdapter<TempObj> tempAdapter = moshiW.adapter(TempObj.class);
//    //TempObj tempVals = tempAdapter.fromJson(weatherResp.body());
//    JsonAdapter<AuthObj> authAdapter = moshi.adapter(AuthObj.class);
//    AuthObj access
//  }
//
//}
