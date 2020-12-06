As design patterns implented in this contracts:

-circuit-breaker: this is a modifier called contractIsActive. This modifier can be toggled with toggleCircuitBreaker to switch isActive on or off, just in case the contract needs to be halted and resarted at any point in time.

-restricting access via the onlyAdmin modifier : 1.to the circuitbreaker and 2.mortal designpatterns.

(I am aware that this has a risk of centralization of the decision to halt or terminate the contracts, if required this can be build out to use a multisig wallet, so there are a minimum of certain decisionmakers required to execute the action that is now done by onlyAdmin.)

-design pattern mortal :definitive disabling of the contract in case of serious issues (economical of political) to make sure the contract can be terminated by the contract-deployer, the owner.
