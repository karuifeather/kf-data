# A Browser-Based Note Management App

Welcome to **Notebook**! This project is a modern, browser-based web application designed to help users manage their notebooks and notes. The app allows for the creation, editing, and organization of notes entirely in the browser, utilizing client-side technologies and local storage for data persistence.

## **Architecture Overview**

### **Frontend (React Application)**

The frontend of Notebook is built using React, TypeScript, and Material-UI, offering a smooth and responsive user experience.

- **Framework**: Built with **React** and **TypeScript**, ensuring type safety and maintainability, along with **Material-UI** for a consistent and user-friendly interface.
- **Hosting**:
  - Hosted on **Vercel** as a static site, offering efficient deployment and fast access from anywhere.
  - **Route 53** is used for DNS management, routing traffic to `notebook.karuifeather.com`.
- **Functionality**:
  - **Local Storage**: All user data (notebooks, notes, tags) are stored directly in the browser using the **Web Storage API**. This allows data persistence across sessions, meaning users can pick up where they left off without needing a backend.
- **Build and Deployment**:
  - The app is built using **Webpack** and **Babel** for optimal performance and compatibility.
  - Vercel automates the deployment and hosting process whenever new commits are pushed to the `main` branch.

### **Deployment Process**

- Every commit pushed to the `main` branch is automatically deployed by **Vercel**, making it easy to keep the app up-to-date.

## **Current Features**

- **Frontend**:
  - **User Interface**: Clean, responsive UI built with **Material-UI** that enables users to easily create, edit, and organize their notes.
  - **Local Storage**: The app uses **local storage** to store notebooks, notes, and tags, ensuring all data is saved directly in the browser with no need for server-side storage.
  - **Offline Support**: Since data is stored locally, users can work offline, and their changes are automatically saved and synced when they come online.

## **How It All Comes Together in Production**

- **Frontend (Client)**:
  - Users can access the app at `https://notebook.karuifeather.com`, where it is served directly from **AWS S3** and distributed globally through **CloudFront** for fast loading times.
  - All data (such as notebooks and notes) is stored locally in the browser, ensuring fast access, persistence, and offline functionality.
  - No backend server is required, making the app entirely client-side, with real-time updates happening in the browser.
  
- **Local Storage**:
  - All notebooks, notes, and tags are saved in the browser’s local storage, meaning users don't rely on external servers. This makes the app lightweight, fast, and capable of offline functionality.
  - Any changes are automatically saved, and synchronization happens when the user is online.

---

## **Conclusion**

The **Notebook** app is a showcase of the power of client-side web development, combining modern technologies like React, TypeScript, and Material-UI with the simplicity of local storage for seamless data management. The app is designed to offer users a fast, simple, and accessible note-taking experience without the need for server infrastructure, ensuring real-time updates, offline support, and a smooth user experience.

Visit [notebook.karuifeather.com](https://notebook.karuifeather.com) to try it out and manage your notes directly in the browser!
