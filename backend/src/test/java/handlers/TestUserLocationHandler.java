package handlers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.Firebase;
import server.handlers.UserLocationHandler;
import spark.Spark;

public class TestUserLocationHandler {
  /** Handles setup before any tests are called. */
  @BeforeAll
  public static void setup_before_everything() {

    // Set the Spark port number. This can only be done once, and has to
    // happen before any route maps are added. Hence using @BeforeClass.
    // Setting port 0 will cause Spark to use an arbitrary available port.
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
  }

  /**
   * Shared state for all tests. We need to be able to mutate it (adding recipes etc.) but never
   * need to replace the reference itself. We clear this state out after every test runs.
   */
  private Map<String, Object> users = new HashMap<>();

  /** Handles setup before each individual test is called. */
  @BeforeEach
  public void setup() {
    // Re-initialize state, etc. for _every_ test method run
    this.users.clear();
  }

  /** Handles teardown after each individual test is run. */
  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("/userLoc");
    Spark.stop();
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /**
   * Helper to start a connection to a specific API endpoint/params
   *
   * @param apiCall the call string, including endpoint (NOTE: this would be better if it had more
   *     structure!)
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  private static HttpURLConnection tryRequest(String apiCall) throws IOException {
    // Configure the connection (but don't actually send the request yet)
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();

    // The default method is "GET", which is what we're using here.
    // If we were using "POST", we'd need to say so.
    // clientConnection.setRequestMethod("GET");

    clientConnection.connect();
    return clientConnection;
  }

  @Test
  public void TestUserLocNoParam() throws IOException {
    Firebase f = new Firebase();
    UserLocationHandler userLocHandle = new UserLocationHandler(f);
    Spark.get("/userLoc", userLocHandle);
    Spark.init();
    Spark.awaitInitialization();

    HttpURLConnection clientConnection = tryRequest("userLoc");
    assertEquals(200, clientConnection.getResponseCode());

    assertEquals(new HashMap<>(), userLocHandle.getUserMap());
  }

  @Test
  public void TestUserLocCorrect() throws IOException {
    Firebase f = new Firebase();
    UserLocationHandler userLocHandle = new UserLocationHandler(f);
    Spark.get("/userLoc", userLocHandle);
    Spark.init();
    Spark.awaitInitialization();

    HttpURLConnection clientConnection = tryRequest("userLoc?location=1.1.21&id=123");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> userMap = new HashMap<>();
    userMap.put("location", "1.1.21");
    userMap.put("id", "123");

    assertEquals(userMap, userLocHandle.getUserMap());
  }

  @Test
  public void TestUserLocMultiple() throws IOException {
    Firebase f = new Firebase();
    UserLocationHandler userLocHandle = new UserLocationHandler(f);
    Spark.get("/userLoc", userLocHandle);
    Spark.init();
    Spark.awaitInitialization();

    HttpURLConnection clientConnection = tryRequest("userLoc?location=1.1.21&id=123");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> userMap = new HashMap<>();
    userMap.put("location", "1.1.21");
    userMap.put("id", "123");

    HttpURLConnection clientConnection2 = tryRequest("userLoc?location=5.3.2&id=456");
    assertEquals(200, clientConnection2.getResponseCode());

    Map<String, Object> userMap2 = new HashMap<>();
    userMap2.put("location", "5.3.2");
    userMap2.put("id", "456");

    assertEquals(userMap, userLocHandle.getUserMap());
  }
}
