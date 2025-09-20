# Mithai Junction - Premium Indian Sweets Website

This project is a modern, responsive website for "Mithai Junction," a fictional premium Indian sweets shop. It features a clean design, user authentication through Firebase, and multiple pages for showcasing products, company information, and online ordering.

## Features

-   **Responsive Design**: The website is fully responsive and works on various devices, including desktops, tablets, and mobile phones.
-   **User Authentication**: Secure login and signup functionality using Firebase Authentication (Email/Password and Google Sign-In).
-   **Dynamic Content**: Pages for Home, Products, About Us, and Contact.
-   **Interactive UI**: Smooth transitions, hover effects, and a user-friendly interface.
-   **Online Ordering**: A dedicated page for customers to place orders online.

## Pages

-   **`index.html`**: The login page for users to access their accounts.
-   **`login.html`**: The signup page for new user registration.
-   **`afterlogin.html`**: The main landing page after a user successfully logs in.
-   **`pages/products.html`**: Displays all the sweet products available.
-   **`pages/about.html`**: Shares the story and values of Mithai Junction.
-   **`pages/contact.html`**: Provides contact information and a form for inquiries.
-   **`pages/order.html`**: A form for users to place their orders.

## Tech Stack

-   **Frontend**: HTML5, CSS3, JavaScript (ES6 Modules)
-   **Backend (BaaS)**: [Firebase](https://firebase.google.com/)
    -   Firebase Authentication for user login and signup.
    -   Firebase Hosting (potential for deployment).
-   **Fonts**: Google Fonts (Playfair Display & Inter)
-   **Icons**: Ionicons

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository or download the files.**
2.  **Firebase Configuration**:
    -   You will need your own Firebase project.
    -   Create a new Firebase project at [firebase.google.com](https://firebase.google.com/).
    -   In your Firebase project settings, get your `firebaseConfig` object.
    -   Replace the placeholder `firebaseConfig` object in the following files with your own:
        -   `index.html`
        -   `login.html`
        -   `main.js`
3.  **Open `index.html` in your browser.**
    -   It's recommended to use a live server extension (like Live Server in VS Code) to handle module imports correctly and avoid CORS issues.

## File Structure

```
/project
|-- /css
|   |-- style.css         # Main stylesheet for the website
|-- /img
|   |-- ...               # Image assets
|-- /js
|   |-- main.js           # Main JavaScript for website interactivity
|-- /pages
|   |-- about.html
|   |-- contact.html
|   |-- order.html
|   |-- products.html
|-- afterlogin.html       # Home page after login
|-- index.html            # Login page
|-- login.html            # Signup page
|-- main.js               # JavaScript for Google Sign-In
|-- style.css             # Stylesheet for login/signup pages
|-- README.md             # This file
```

<img width="1755" height="882" alt="image" src="https://github.com/user-attachments/assets/05a28b00-bf5b-41ee-b18e-95ab08a8075a" />
<img width="1911" height="882" alt="image" src="https://github.com/user-attachments/assets/05ac5838-33a3-4ac1-9599-99f8a3589cb6" />
<img width="1886" height="891" alt="image" src="https://github.com/user-attachments/assets/b5d492c6-a1f0-49a8-b891-88bb31aa29f7" />
<img width="1834" height="843" alt="image" src="https://github.com/user-attachments/assets/258aa478-906a-4451-8115-2afed9fb3c62" />


