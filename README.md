# Nexly - Real-Time Chat App

Welcome to **Nexly**, a modern, sleek, and secure real-time chat application designed for seamless communication. Built using cutting-edge web technologies, Nexly offers a responsive and dynamic user interface that delivers a high-quality user experience. With Firebase integration for secure and efficient back-end functionality, Nexly aims to bring users to the *next level* of real-time chat applications.

## Features

- **Real-Time Messaging**: Experience instant chat updates with no delay, powered by Firebase Firestore for real-time database synchronization.
  
- **Authentication**: Secure user authentication through Firebase Authentication. Sign up, log in, and manage users with ease.
  
- **Responsive UI**: Nexly's responsive design ensures a smooth experience on any device—whether on mobile, tablet, or desktop.

- **User Status Indicator**: See who’s online and available to chat with real-time presence tracking.

- **Typing Indicators**: Know when someone is typing to you with real-time typing status updates.

- **Emojis and Reactions**: Express yourself with a wide range of emojis and message reactions for more interactive conversations.

- **Lightweight & Fast**: Designed to be minimalistic with a focus on performance, ensuring a fast user experience even on slower networks.

## Tech Stack

- **Frontend**: 
  - [React.js](https://reactjs.org/) - Efficient and component-driven UI.
  - Plain old css - For modern and responsive design.
  
- **Backend**: 
  - [Firebase Firestore](https://firebase.google.com/docs/firestore) - Real-time NoSQL database to power chat.
  - [Firebase Authentication](https://firebase.google.com/docs/auth) - Secure user authentication.

## Getting Started

Follow the steps below to set up **Nexly** on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- Firebase account with a configured Firestore database and Firebase Authentication enabled.
- Clone the repository:

  ```bash
  git clone https://github.com/yourusername/nexly-chat-app.git
  cd nexly-chat-app
  ```

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up Firebase**:

   - Create a Firebase project.
   - Enable Firestore and Authentication (Email/Password or Google, depending on your preference).
   

3. **Start the development server**:

   ```bash
   npm start
   ```

   Your app will be available at `http://localhost:5173`.

## How to Use

- **Sign up/Login**: Use the authentication system to create an account or log in to an existing one.
- **Start a Chat**: Once logged in, select a user from the available list or search for them by username to start a conversation.
- **Send Messages**: Type your message and hit send. You’ll see it appear instantly for both users.
- **Enjoy Real-Time Updates**: See when users are online, typing, or sending new messages in real-time.

## Future Features

- **Group Chats**: Create and manage group conversations.
- **Media Sharing**: Share images, videos, and files directly within the chat.
- **Push Notifications**: Real-time notifications for messages, even when the app is closed.
- **Message Search**: Search through past conversations with ease.
- **Voice Notes**: Share audio recordings in real time

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to create an issue if you're planning on adding a major feature, so we can discuss the best approach.



With **Nexly**, real-time communication is taken to the *next level*. Join the conversation and build on top of this feature-rich chat application today!
