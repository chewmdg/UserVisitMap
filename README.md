# UserVisitMap
C#/React/MongoDB API. User can save locations they have visited on a map. 

View this readme as RAW for proper formatting.

- Install git
- Install .Net 2.0 SDK (https://www.microsoft.com/net/learn/get-started/windows)
- Fork Repository or (git clone https://github.com/chewmdg/UserVisitMap.git)
- Install Node
- in terminal run dotnet restore inside UserVisitMaps
- in terminal run npm install from inside UserVisitMaps/ReactComponents
- webpack (may need to npm install webpack --global)
- dotnet run from UserVisitMaps directory
- Open Localhost:5000
- Login as HenryHarrison PW: 12345

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
