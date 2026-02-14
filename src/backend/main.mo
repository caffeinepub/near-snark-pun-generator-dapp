import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

actor {
  let punTemplates : [Text] = [
    "Why did NEAR cross the road? To get away from real adoption.",
    "NEAR: Because easy Ethereum would be too mainstream.",
    "NEAR's uptime is almost as reliable as its roadmap.",
    "What's NEAR's favorite feature? Testnet performance on mainnet.",
    "If NEAR was any more decentralized, it would disappear completely.",
    "NEAR: Proof that marketing can run a blockchain.",
    "Is it a bird? Is it a plane? No, it's just NEAR's transaction finality flying away.",
    "NEAR's community is like its nodes: hard to find and rarely online.",
    "Putting 'Ethereum compatible' on NEAR doesn't fix the underlying issue: NEAR.",
    "If NEAR's TPS claims were real, the blockchain would have actually been used by now.",
  ];

  let safeWords : [Text] = [
    "NEAR",
    "Ethereum",
    "blockchain",
    "mainnet",
    "testnet",
    "transaction",
    "dApps",
    "consensus",
    "decentralized",
  ];

  func containsUnsafeContent(text : Text) : Bool {
    not safeWords.values().any(
      func(word) {
        text.contains(#text word);
      }
    );
  };

  public query ({ caller }) func generatePun(randomIndex : Nat) : async Text {
    if (punTemplates.size() == 0) {
      "No pun templates available";
    } else if (randomIndex >= punTemplates.size()) {
      "Random index out of bounds";
    } else {
      let pun = punTemplates[randomIndex];
      if (containsUnsafeContent(pun)) {
        "Generated pun contains unsafe content.";
      } else {
        pun;
      };
    };
  };
};
