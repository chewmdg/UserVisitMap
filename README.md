# UserVisitMap
C#/React/MongoDB API. User can save locations they have visited on a map 

. Fork Repository
. Install Node
. run npm install
. dotnet restore
. webpack
. dotnet run

NoSQL MongoDB instance BSON representation:
City{
    _id:
    Name:
    StateID:
    Status:
    Latitude:
    Longitude:
    DateAdded:
    DateTimeAdded:
    LastUpdated:
}

Region{
    _id:
    Name:
    Abbreviation:
    Cities:[{
          Name:
          Status:
          Latitude:
          Longitude:
          DateAdded:
          DateTimeAdded:
          LastUpdated:
    }]
    DateAdded:
    DateTimeAdded:
    LastUpdated:
}

User{
    _id:
    Firstname:
    LastName:
    UserName:
    Password:
    DateAdded:
    DateTimeAdded:
    LastUpdated:
}

UserVisit{
    _id:
    user_id:
    City:
    Region:
    Latitude:
    Longitude:
    DateAdded:
    DateTimeAdded:
    LastUpdated:
}
