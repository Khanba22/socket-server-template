# Next.js + Node.js + Socket.io Template

## Overview
This project is a template for building real-time applications using Next.js (frontend) and a Node.js backend with Socket.io. A sample demo game is included, allowing users to join rooms and interact in real time. The project is structured to be extended further for various real-time applications.

## Features
- Next.js frontend with a sample game setup
- Node.js backend with Socket.io for real-time communication
- Modular event handling via controllers
- Game context setup for state management (can be removed or extended)
- CRUD API support via Next.js App Router
- Easily extendable for additional features

## Installation

### Prerequisites
- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/next-node-socket-template.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
```
next-node-socket-template/
├── .next/                 # Next.js build output
├── node_modules/          # Installed dependencies
├── public/                # Static assets
│
├── server/                # Node.js backend with Socket.io
│   ├── classes/           # Reusable class-based utilities
│   ├── controllers/       # Socket.io event handlers
│   ├── data/              # Sample data storage (if needed)
│   ├── interfaces/        # TypeScript interfaces for backend
│   ├── utils/             # Utility functions for the backend
│   └── server.ts          # Main server file
│
├── src/                   # Frontend (Next.js)
│   ├── app/               # Next.js App Router (API + Pages)
│   │   ├── api/           # API routes (CRUD operations)
│   │   ├── game/          # Game-related frontend logic
│   │   ├── room/          # Room management logic
│   │   ├── favicon.ico    # Site favicon
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Main page component
│   │
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts (GameContext for demo)
│   ├── interfaces/        # TypeScript interfaces for frontend
│   ├── utils/             # Utility functions for frontend
│
├── .gitignore             # Git ignore file
├── eslint.config.mjs      # ESLint configuration
├── next-env.d.ts          # TypeScript environment configuration
├── next.config.ts         # Next.js configuration
├── package-lock.json      # Dependency lock file
├── package.json           # Project metadata and dependencies
├── postcss.config.mjs     # PostCSS configuration
├── README.md              # Project documentation
├── tsconfig.json          # TypeScript configuration
├── tsconfig.server.json   # TypeScript config for the server
```

## Frontend Details
- A sample game is implemented using React and Next.js.
- The `GameContext` provides shared state management for real-time interactions.
- Users can join rooms and interact through Socket.io.
- The UI can be modified easily by updating the components in `src/components/`.

## Backend Details
- `server.ts` initializes the Socket.io server and listens for events.
- Controllers inside `server/controllers/` handle different Socket.io events.
- Each event has its own dedicated controller function for modularity.
- CRUD operations should be implemented using Next.js App Router in `src/app/api/`.

## Customization
- The sample `GameContext` can be removed if not needed.
- Unused libraries should be cleaned up to optimize performance.
- Additional Socket.io event handlers can be added inside `server/controllers/`.
- API routes can be built using Next.js' App Router for backend logic.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For questions or suggestions, feel free to open an issue or reach out to the maintainer.

