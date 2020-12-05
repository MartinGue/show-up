As design patterns implented in this contracts:

-circuit-breaker: this is a modifier called contractIsActive. This modifier can be toggled with toggleCircuitBreaker to switch isActive on or off, just in case the contract needs to be halted and resarted at any point in time.

-restricting access : 1.to the circuitbreaker and 2.mortal functions is done via the onlyAdmin modifier.
I am aware that this has a risk of centralization of the decision to hald or terminate the contracts, if required this can be build out to use a multisig wallet to there are a minimum of certain decisionmakers required to execute the action that is now done by onlyAdmin.

-design pattern mortal : to make sure the contract can only be terminated by the contract-deployer, the owner.
