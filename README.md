# Burger Builder App

A React-based web application for building and ordering custom burgers. This project demonstrates fundamental React concepts, Redux for state management, React Router for navigation, and Firebase for backend services.

## Features

*   **Custom Burger Creation**: Users can add and remove various ingredients (salad, bacon, cheese, meat) to build their custom burger.
*   **Dynamic Price Calculation**: The total price of the burger updates dynamically based on the added ingredients.
*   **Order Checkout**: After building a burger, users can proceed to a checkout page to finalize their order.
*   **Authentication**: User registration and login functionality using Firebase. Authenticated users can place orders and view their order history.
*   **Order History**: Users can view a list of all their past orders.
*   **Form Validation**: Input validation for order and authentication forms.
*   **Lazy Loading**: Components are lazy-loaded for improved application performance.
*   **Responsive Design**: The application is designed to be responsive across different screen sizes.

## Technologies Used

*   **React.js**: A JavaScript library for building user interfaces.
*   **Redux**: A predictable state container for JavaScript apps.
*   **React Router**: Declarative routing for React.
*   **Axios**: Promise-based HTTP client for making API requests.
*   **Firebase**: Backend services (Authentication and Realtime Database) for storing orders and user data.
*   **CSS Modules**: For scoped and modular styling.
*   **JavaScript ES6+**: Modern JavaScript features.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/burger-builder.git
    cd burger-builder
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Set up Firebase:
    *   Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    *   Enable Email/Password authentication.
    *   Set up a Realtime Database.
    *   Copy your Firebase project's web configuration into a file (e.g., `src/firebase-config.js` or directly in `src/axios-orders.js` if it's already configured there).

### Available Scripts

In the project directory, you can run:

*   `npm start` or `yarn start`: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
*   `npm test` or `yarn test`: Launches the test runner in the interactive watch mode.
*   `npm run build` or `yarn build`: Builds the app for production to the `build` folder.

## Deployment

The application can be deployed to platforms like Firebase Hosting, Netlify, Vercel, etc.

## Contributing

Feel free to fork the repository, create a new branch, and submit a pull request with your improvements.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
