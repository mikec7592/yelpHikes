# YelpHikes

## Overview

YelpHikes is a full-stack application built to help you find and explore local and distant hiking trails.  Simply visit the app to see trails other users have added or signup and add trails of your own!

### Technologies

- **Node.js**
- **Mongoose**
- **Express**
- **EJS**
- **Bootstrap**
- **MapBox**
- **Cloudinary**

### Features

- **MVC Structure**
- **Full CRUD | 7 RESTful routes**
- **Partials**
- **Geocoding**
- **Sign up / Log in functionality**
- **Password Salt&Hashing**
- **Local image upload**
- **Starred rating system**

### Sample Images
- **images.unsplash.com**

## Server API Requests

### Secure

| HTTP Request  | URL           | Method   |
| ------------- | ------------- | -------- |
| Register form | /register     | `GET`    |
| Create a user | /register     | `POST`   |
| Login form    | /login        | `GET`    |
| Login a user  | /login        | `POST`   |
| Logout a user | /logout       | `GET`    |

- **Sample body for `POST` to `/register`**

```javascript
{
  username: 'sample_Username',
  email: 'Sample@sample.com',
  password: 'samplePassword'
}
```

### Open API Requests

| HTTP Request | URL                | Method   |
| ------------ | ------------------ | -------- |
| Index        | /hikes             | `GET`    |
| New          | /hikess/new        | `GET`    |
| Post New     | /hikes             | `POST`   |
| Edit         | /hikes/:id/edit    | `GET`    |
| Update       | /hikes/:id         | `PUT`    |
| Show         | /hikes/:id         | `GET`    |
| Delete       | /hikes/:id         | `Delete` |

- **Sample body for `POST` to `/hikes`**

```javascript
{
  title: 'Example Hike Body',
  geometry: { type: 'Point', coordinates: [ -122.330062, 47.603832 ] },
  price: 3,
  description: 'This is where the description text would be.',
  location: 'Seattle, Washington',
  reviews: [],
  _id: new ObjectId("64b9d23cd72d2ec308542a0c"),
  images: [
    {
      url: 'https://res.cloudinary.com/dr1j1blc6/image/upload/v1689899579/YelpHikes/ahb56hk4zbcrymuhw1w6.png',
      filename: 'YelpHikes/ahb56hk4zbcrymuhw1w6',
      _id: new ObjectId("64b9d23cd72d2ec308542a0d")
    }
  ],
  author: new ObjectId("647e4cbee114dafb3df3896d"),
  __v: 0
}
```

## Example Hike creation

![New Hike Example](/public/images/create.png)

## Link to APP
- [YelpHikes](https://yelphikes-made-by-mike.onrender.com/)

## Author

- [Made_By_Mike](https://made-by-mike-73.vercel.app/)
