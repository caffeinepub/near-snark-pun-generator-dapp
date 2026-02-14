module {
  type OldActor = {
    handWrittenNEARPuns : [Text];
    handWrittenICPPuns : [Text];
  };

  type NewActor = {};

  public func run(_old : OldActor) : NewActor {
    {};
  };
};
