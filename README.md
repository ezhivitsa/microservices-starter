# Microservices-starter

# ToDo list:
1) add tests (for now i don't know how simulate requests from kafka)
2) add saga on registration (if fail create user in users service, than we have to revert register in auth service)
3) save ids of handled commands and events and check new commands and events (do this with middleware)
4) add /ping for backend services
5) add event sourcing to one backend service
