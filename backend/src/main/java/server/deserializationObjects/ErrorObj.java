package server.deserializationObjects;

public class ErrorObj {
/*
{
  "error": {
    "status": 400,
    "message": "Only valid bearer authentication supported"
  }
}
 */
  public Error error;

  public static class Error {
    public String status;
    public String message;
  }
}
