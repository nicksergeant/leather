use Mix.Config

alias Dogma.Rule

config :dogma,
  rule_set: Dogma.RuleSet.All,
  exclude: [~r(\Aassets/node_modules/)],
  override: [
    %Rule.LineLength{enabled: false},
    %Rule.PipelineStart{enabled: false}
  ]
