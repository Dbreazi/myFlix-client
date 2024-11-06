# myFlix Client

## Description
The `myFlix-client` project is a client-side React application designed for movie enthusiasts to browse, view, and manage their favorite films. It interacts with a backend API to provide a wide range of movie data. This app offers responsive, single-page navigation with seamless user interactions for a polished and engaging user experience.

## Features
- **User Authentication**: Users can securely sign up, log in, and log out.
- **Browse Movies**: Browse through a list of movies with a search filter to quickly find specific titles.
- **Detailed Movie View**: Access comprehensive information about each movie, including genre, director, and synopsis.
- **Favorite Movies**: Add or remove movies from your list of favorites.
- **Profile Management**: Update profile details, manage favorites, and deregister if desired.

## Usage
1. **Sign Up or Log In**:
    - New users can create an account, while existing users can log in securely.
2. **Movie Browsing**:
    - Browse the main movie list with search functionality to locate specific movies.
3. **Movie Details**:
    - Select any movie to see additional information, such as genre, director details, and a synopsis.
4. **Manage Favorites**:
    - Add or remove movies to/from your favorite list via the movie details page.
5. **User Profile**:
    - Update account details and view favorite movies directly from your profile.

## Essential Views & Components
- **MainView**: Manages routing and renders views for movie browsing, searching, and filtering.
- **NavigationBar**: Provides navigation links for login, signup, profile, home, and logout.
- **LoginView**: Allows users to log in.
- **SignupView**: Enables new user registration.
- **MovieCard**: Displays a summary of each movie with an image and title.
- **MovieView**: Shows detailed information about a selected movie and includes a favorite toggle option.
- **ProfileView**: Shows user information and favorite movies with options to update or delete the account.

## Tech Stack
- **Frontend**: 
  - **React**: Library for building the user interface.
  - **React Router**: For client-side navigation and routing.
  - **Bootstrap & SCSS**: CSS framework and styling.
  - **JavaScript (ES2015+)**: Language for client-side logic.
- **Backend**:
  - **myFlix API**: A RESTful API providing movie and user data (hosted on Heroku).
- **Build Tool**: 
  - **Parcel**: Efficient bundling for a fast, streamlined build process.

## API Integration
The myFlix app connects to a RESTful API to fetch and modify movie and user data. The backend endpoints used include:

### Endpoints
- **GET** `/movies`: Retrieves all movies.
- **GET** `/movies/:id`: Fetches detailed information for a single movie.
- **POST** `/users`: Registers a new user.
- **POST** `/login`: Authenticates a user.
- **PUT** `/users/:username`: Updates user profile information.
- **POST** `/users/:username/movies/:movieId`: Adds a movie to the user's favorites.
- **DELETE** `/users/:username/movies/:movieId`: Removes a movie from the user's favorites.
- **DELETE** `/users/:username`: Deletes the user account.

## Installation

### Prerequisites
- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **npm**: Comes installed with Node.js.

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dbreazi/myFlix-client.git
   cd myFlix-client
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Application**:
    ```bash
    npm start
    ```
4. **Build for Production**:
   ```bash
   npm run build
   ```

## Contact

- **Author**: Dbreazi
- **Email**: ========
- **Project Repository**: [myFlix-client GitHub Repository](https://github.com/Dbreazi/myFlix-client)




