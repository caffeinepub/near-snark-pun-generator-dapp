import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Template = {
    Setup : Text;
    Punchline : Text;
    Focus : [Text];
  };

  let handWrittenNICPComparisonPuns : [Text] = [
    "NEAR promises mainstream adoption, but it's still searching for the exit ramp. ICP? Already took it.",
    "NEAR claims to bridge the blockchain gap, but it can't cross its own chasm. ICP fell in years ago.",
    "IC admits it can't keep up with NEAR's velocity – but hey, that's a good thing.",
    "NEAR's vision is clear, but its execution remains far away, like a healthy ICP price.",
    "NEAR's block times are so fast, even ICP's developers can't catch them.",
    "NEAR excels at partnerships, while ICP excels at burning cash through them.",
    "NEAR's coin will soon be flipping ICP's in unintended ways.",
    "Trying to be serious but with NEAR and ICP, it's like comedy JS.",
    "NEAR could learn a thing or two from ICP's failures – just kidding, those lessons aren't worth learning.",
    "NEAR and ICP: the blockchain version of a balanced comedy routine.",
  ];

  let handWrittenOtherProtocolComparisonPuns : [Text] = [
    "If Solana is the Ferrari of blockchains, then NEAR is like a Tesla stuck in traffic.",
    "NEAR's mainnet hasn't crashed nearly as often as Solana's.",
    "Polkadot dreamed while NEAR delivered – well, almost.",
    "Cardano set the playbook. NEAR is just reading it out loud.",
    "Binance tried copy-paste; NEAR tried original and got… 'unique' results.",
    "Ethereum lost its edge, while NEAR struggles to find one.",
    "Cosmos has an ecosystem; NEAR has potential… somewhere.",
    "One day NEAR hopes to avoid Layer 2 disasters like Arbitrum.",
    "Avalanche scales with hype – NEAR scales with… ambition.",
    "Algorand works well in academia, NEAR in marketing.",
    "Polygon makes headlines with partnerships; NEAR aims for headlines with bug fixes.",
    "Harmony promised harmony, NEAR delivered… 'something else'.",
  ];

  let safetyKeywords : [Text] = [
    "NEAR",
    "ICP",
    "blockchain",
    "Solana",
    "Polkadot",
    "Cardano",
    "Binance",
    "Ethereum",
    "Cosmos",
    "Arbitrum",
    "Avalanche",
    "Algorand",
    "Polygon",
    "Harmony",
    "commitment",
    "technology",
    "development",
    "network",
    "consensus",
    "protocol",
  ];

  func buildTemplate(setup : Text, punchline : Text, focus : [Text]) : Template {
    { Setup = setup; Punchline = punchline; Focus = focus };
  };

  let templates : [Template] = [
    buildTemplate(
      "They say blocks should be fast.",
      "But it won't improve a protocol built on empty promises.",
      ["NEAR", "ICP", "blockchain"]
    ),
    buildTemplate(
      "What do you call encrypted error messages?",
      "A consensus protocol mystery.",
      ["NEAR", "blockchain", "setup"]
    ),
    buildTemplate(
      "Why do some ledgers have few entries?",
      "Because they're supported by wishful thinking.",
      ["ICP", "NEAR", "testnet"]
    ),
  ];

  func containsUnsafeContent(text : Text) : Bool {
    not safetyKeywords.values().any(
      func(word) {
        text.contains(#text word);
      }
    );
  };

  func createSlotTemplate(setup : Text, punchline : Text, focusOptions : [Text]) : (Text, Text, Text) {
    let focus = if (focusOptions.size() > 0) { focusOptions[0] } else { "" };
    (setup, punchline, focus);
  };

  func assemblePun(slotContent : (Text, Text, Text)) : Text {
    let (setup, punchline, _focus) = slotContent;
    setup # " " # punchline;
  };

  public query ({ caller }) func generatePun(randomIndex : Nat, _randomFocusIndex : Nat) : async Text {
    let totalPuns = handWrittenNICPComparisonPuns.size()
      + handWrittenOtherProtocolComparisonPuns.size()
      + templates.size();

    let repeatedTotalPuns = totalPuns * 5; // Repeat content five times.
    let expandedIndex = if (repeatedTotalPuns > 0) { randomIndex % repeatedTotalPuns } else { 0 };
    let repeatCycle = repeatedTotalPuns / totalPuns;
    let innerIndex = if (repeatCycle > 0) { expandedIndex % repeatCycle } else { 0 };

    if (handWrittenNICPComparisonPuns.size() > 0 and expandedIndex < handWrittenNICPComparisonPuns.size() * 5) {
      let index = if (handWrittenNICPComparisonPuns.size() > 0) {
        try { expandedIndex % handWrittenNICPComparisonPuns.size() } catch (_) { 0 };
      } else { 0 };
      handWrittenNICPComparisonPuns[index];
    } else if (expandedIndex < (handWrittenNICPComparisonPuns.size() + handWrittenOtherProtocolComparisonPuns.size()) * 5) {
      let adjustedIndex = expandedIndex - handWrittenNICPComparisonPuns.size() * 5;
      let index = if (handWrittenOtherProtocolComparisonPuns.size() > 0) {
        try { adjustedIndex % handWrittenOtherProtocolComparisonPuns.size() } catch (_) { 0 };
      } else { 0 };
      handWrittenOtherProtocolComparisonPuns[index];
    } else if (expandedIndex < totalPuns * 5) {
      let adjustedIndex = expandedIndex - (handWrittenNICPComparisonPuns.size() + handWrittenOtherProtocolComparisonPuns.size()) * 5;
      if (templates.size() > 0) {
        let templateIndex = try {
          let index = adjustedIndex % templates.size();
          if (index < templates.size()) { index } else { 0 };
        } catch (_) { 0 };
        let template = templates[templateIndex];

        if (containsUnsafeContent(template.Punchline)) {
          "Template contains unsafe content, please try another one.";
        } else {
          let slotContent = createSlotTemplate(template.Setup, template.Punchline, template.Focus);
          let pun = assemblePun(slotContent);
          if (containsUnsafeContent(pun)) {
            "Generated pun from template contains unsafe content.";
          } else {
            pun;
          };
        };
      } else {
        "No templates available, please try again with different input.";
      };
    } else {
      "Index out of bounds, please try again with a small randomIndex value. ";
    };
  };
};
