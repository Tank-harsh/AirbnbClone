# 🏠 WanderStay — Airbnb Clone

> A full-stack Airbnb-inspired travel listing platform where users can explore, add, and review journey destinations across the world.

![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat&logo=bootstrap&logoColor=white)
![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat&logo=render&logoColor=white)

---

## 🌐 Live Demo

🔗 **[View Live Site](https://delta-student-gk3j.onrender.com/listings)**

---

## ✨ Features

- 🔍 **Search** destinations by keyword
- 🗂️ **Filter** listings by category — Mountains, Beach, Cafes, Farms, Castles, Hiking & more
- 📝 **Create / Edit / Delete** your own travel listings
- 🖼️ **Image Upload** via Cloudinary CDN
- 🗺️ **Interactive Map** powered by Mapbox GL
- ⭐ **Leave Reviews** with a star rating system
- 🔐 **User Authentication** — Register, Login, Logout (Passport.js)
- 🛡️ **Authorization** — Only listing owners can edit/delete their listings
- 💬 **Flash Messages** for user feedback
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🚀 **Auto-deployed** via Render on every GitHub push

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js v5** | Web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | ODM for MongoDB |
| **Passport.js** | Authentication (Local Strategy) |
| **Multer + Cloudinary** | Image upload & storage |
| **Joi** | Server-side schema validation |
| **connect-mongo** | MongoDB session store |
| **dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| **EJS + EJS-Mate** | Templating engine with layouts |
| **Bootstrap 5.3** | Responsive UI framework |
| **Mapbox GL JS** | Interactive maps |
| **Font Awesome 6** | Icons |
| **Varela Round** | Google Font |
| **Vanilla CSS** | Custom styles |

---

## 📁 Project Structure

```
├── app.js                  # Entry point
├── cloudConfig.js          # Cloudinary configuration
├── middleware.js           # Auth & validation middleware
├── schema.js               # Joi validation schemas
├── .env                    # Environment variables (not committed)
│
├── models/
│   ├── listing.js          # Listing schema
│   ├── review.js           # Review schema
│   └── users.js            # User schema (passport-local-mongoose)
│
├── routes/
│   ├── listing.js          # CRUD routes for listings
│   ├── review.js           # Review routes
│   └── user.js             # Auth routes (login/signup/logout)
│
├── controller/             # Route handler logic
├── views/
│   ├── layouts/            # EJS boilerplate layout
│   ├── includes/           # Navbar, footer, flash partials
│   └── listings/           # Home, Show, New, Edit, Error pages
│
├── public/
│   ├── css/style.css       # Custom styles
│   └── js/                 # Client-side scripts (map, filters)
│
└── init/                   # Database seed data
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Cloudinary (Image Uploads)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# Mapbox (Maps)
MAP_API_TOKEN=your_mapbox_token

# MongoDB Atlas
ATLASDB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net

# Session Secret
SECRET=your_secret_key
```

---

## 🚀 Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Tank-harsh/AirbnbClone.git
cd AirbnbClone

# 2. Install dependencies
npm install

# 3. Create .env file with your credentials (see above)

# 4. Start the development server
nodemon app.js

# 5. Open in browser
# http://localhost:8080
```

---

## 📦 Deployment

This project is deployed on **[Render](https://render.com)** with **Auto-Deploy** enabled.

Every `git push` to the `main` branch automatically triggers a redeployment.

```bash
git add .
git commit -m "your message"
git push         # ← Render auto-deploys from here
```

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">Made with ❤️ by <a href="https://github.com/Tank-harsh">Tank-harsh</a></p>
