# UserVisitMap
C#/React/MongoDB API. User can save locations they have visited on a map 

. Install git
. Install .Net SDK (https://www.microsoft.com/net/learn/get-started/windows)
. Fork Repository or (git clone https://github.com/chewmdg/UserVisitMap.git)
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
