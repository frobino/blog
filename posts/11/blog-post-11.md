---
title: MongoDB intro
description: How to interact with MongoDB
date: 2023-11-30
tags:
- mongo
- golang
layout: "layouts/post.njk"
---

# MongoDB

MongoDB stores data records as *documents* (specifically BSON documents) which are gathered together in *collections*.
A *database* stores one or more *collections* of *documents*.

MongoDB stores documents in collections.
Collections are analogous to tables in relational databases.

## Create documents and collections

If a collection does not exist, MongoDB creates the collection when you first store data for that collection.
```
db.myNewCollection2.insertOne( { x: 1 } )
db.myNewCollection3.createIndex( { y: 1 } )
```
Both the insertOne() and the createIndex() operations create their respective collection if they do not already exist.

```
db.collection.deleteOne(
    <filter>,
    {
      writeConcern: <document>,
      collation: <document>,
      hint: <document|string>        // Available starting in MongoDB 4.4
    }
)
```

## Delete documents and collections

Drop a Collection Using Default Write Concern

The following operation drops the students collection in the current database.

```
db.students.drop()
```

The orders collection has documents with the following structure:

```
{
   _id: ObjectId("563237a41a4d68582c2509da"),
   stock: "Brent Crude Futures",
   qty: 250,
   type: "buy-limit",
   limit: 48.90,
   creationts: ISODate("2015-11-01T12:30:15Z"),
   expiryts: ISODate("2015-11-01T12:35:15Z"),
   client: "Crude Traders Inc."
}
```

The following operation deletes the order with _id: ObjectId("563237a41a4d68582c2509da") :

```
try {
   db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );
} catch (e) {
   print(e);
}
```

The operation returns:

```
{ "acknowledged" : true, "deletedCount" : 1 }
```

## List  documents and collections

Get collections present in the db

```
db.getCollectionNames()
```
