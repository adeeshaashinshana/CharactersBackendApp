Clone the project

# yarn install

# yarn run start

# Connect with the MongoDB database

You can connect with database with MongoDB compass with following URL

# mongodb+srv://CharacterAppAdmin:IbQH3p3V26iIiDNH@charactersdb.q1da0.mongodb.net/CharacterDB

# Bit explanation about how this working

When starting the server, it'll fetching all data from the API & store in MongoDB.
There for nothing worry if requesting data is very costly. Users can directly engage with the backend server & MongoDB database.
It'll help to reduce request cost from API & users can request number of times without thinking about that.

But server will refetch the data from API & update the database time to time automatically.
(For now I setup the refetch time as 12 hours.)
