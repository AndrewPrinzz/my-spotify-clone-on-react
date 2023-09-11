# Spotify Clone 🎵

A Spotify Clone created with my design. I created this clone to gain experience working with a vast API like Spotify's.

## ⚡ Technologies

### App:

- `React.js`
- `Emotion (core, css, react, styled)`
- `Axios`
- `Bootstrap`
- `React Error Boundary`
- `React Query`
- `React Router DOM`
- `Spotify Web API Node`

### Server:

- `Express.js`
- `Body`
- `CORS`
- `dotenv`
- `Parser`
- `Spotify Web API Node`

## 🚀 Features

- **Log In With Spotify:** Connect with your Spotify account to access tracks, albums, and playlists.
- **Caching:** Enhanced user experience with caching mechanisms, enabling swift navigation between pages without the need to reload previously fetched data, ensuring quick response times.
- **Recommendation:** Using the power of Spotify's recommendation engine, implemented song and playlist suggestions based on the user's music tastes and listening history.
- **Searching:** Search for, tracks, and albums within Spotify's music library, making discovery and playback a breeze.

## 💭 Process

### 1. Backend ⚙️

- `Linking Spotify API to my Backend and Frontend:` I began by connecting the backend and frontend of my application. The goal was to retrieve some data from my Spotify Account.

### 2. Frontend ⚙️

- `Design Implementation:` Transformed my Figma designs into a live application.
- `Login Functionality:` Create login page for authentication via Spotify credentials.
- `Main page:` Showcases personalized recommendation list and the most popular albums on Spotify.
- `Music Player Integration:` Toggle between tracks and save to the user library.
- `Music Search Page:` Explore the vast collection of tracks and albums in Spotify's repository.
- `Your Library Page:` View your saved music.
- `Data Caching:` Managed data across different pages, reducing server requests. For instance, a track saved on the **main page** instantly reflects in the **Your Library** page.
- `All screens support.` Responsive design that aligns perfectly across different screen sizes and resolutions.

### 3. Install the application on a VPS server ⚙️

1. **Library Setup:**
   - `git`: Control system used for tracking changes.
   - `node.js`: The environment that allows the execution of JavaScript code server-side.
   - `pm2`: A production process manager for Node.js applications that ensures the app stays alive and can be used to facilitate its deployment.
   - `nginx`: I used it to host files of my React application. It also acts as a reverse proxy to handle requests to the backend server.
2. **Domain Association:** Linked the deployed application on the VPS to my custom domain.
3. **Security Enhancement:** Secured the connection using an SSL certificate.

## 🤔 How can it be improved?

We can begin by adding a light theme. Then, we can introduce user settings, more advanced search, and a refined design. In other words, make the application closely resemble Spotify.

## 🎥 Demo/Preview

[You can see the preview with an explanation on YouTube](https://www.youtube.com/watch?v=kDyNOnRvHlU)

## 🚦 Running the Project

You can run the application by visiting my website at [https://spotify-clone.andrew-dev.com/](https://spotify-clone.andrew-dev.com/)
