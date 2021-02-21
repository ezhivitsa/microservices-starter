# Saga API reference

### step()

Create new step in sequence of saga steps. Returns saga instance.

### invokeParticipant(action)

Set action to step.

#### Arguments

- `action` - *((meta) => Promise)* saga action which will be called on the step

### withCompensation(action)

#### Arguments

- `action` - *((meta) => Promise)* saga compensation action which cancels result of the action

### build()

Build all steps and returns list of result steps.

### start()

Start execution of saga steps. Method returns promise.
