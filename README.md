README.md — MovieLib
# 🎬 MovieLib  
A full‑stack social platform for movie lovers — built with **Angular**, **Node.js**, **Express**, and **MongoDB**.

MovieLib allows users to discover movies, subscribe to themes, create posts, comment, and interact with a growing movie community.  
The project is designed with a clean UI, modular architecture, and modern development practices.

---
### Install backend dependencies
  * npm install
  * npm start

### Install frontend dependencies
  * npm install
  * ng serve /or/ npm start


###  Movies
- Create new movie themes  
- Upload poster image (URL)  
- View movie details  
- Subscribe / Unsubscribe  
- Author‑only edit options  

### Posts
- Create posts inside a movie theme  
- View all posts for a movie   
- Clean and modern UI for post cards  

### Comments
- Add comments under posts  
- Real‑time UI updates  
- Author avatar and username display  

### Users
- Register / Login  
- JWT authentication with HttpOnly cookies  
- User profile page  
- Avatar support  

---

## Project Structure

MovieLib/
│
├── client/                     # Angular 17 Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Services, guards, interceptors
│   │   │   ├── shared/         # Reusable components & UI elements
│   │   │   ├── features/
│   │   │   │   ├── movies/     # Movie list, movie-content, new-movie
│   │   │   │   ├── posts/      # Post list, post-item, new-post
│   │   │   │   ├── auth/       # Login, Register
│   │   │   │   └── profile/    # User profile
│   │   │   ├── app.routes.ts
│   │   │   └── app.component.ts
│   │   └── assets/
│   └── angular.json
│
├── server/                     # Node.js Backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Movie.js
│   │   └── Post.js
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
│
└── README.md

