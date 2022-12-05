package server.handlers;

import java.util.List;

/*
class BlackjackHand {
  public final Card hidden_card;
  public final List<Card> visible_cards;
  ...
}

class Card {
  public final char rank;
  public final Suit suit;
  ...
}
 */
public class RecommendationObj {
  List<ID> tracks;

  public static class ID {
    String id;
  }
}
