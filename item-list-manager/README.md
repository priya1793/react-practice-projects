# Item List Manager

A dynamic and interactive item management application built with React and TypeScript. This application demonstrates state management, list manipulation, component composition, and modern UI patterns for managing collections of items.

## Overview

This project showcases a practical item list manager that allows users to add, view, and manage items in a clean, intuitive interface. It's perfect for learning React fundamentals, component lifecycle, state management, and user interaction patterns.

## Features

### Core Functionality

- **Add Items** - Easily add new items to the list with the input form
- **View Items** - Display all items in an organized, sortable list
- **Delete Items** - Remove individual items from the list
- **Item Counter** - Track the total number of items in the list
- **Empty State Handling** - User-friendly message when the list is empty
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React** - UI library
- **TypeScript** - Type definitions (optional)
- **Vite** - Fast build tool and development server
- **CSS** - Styling for components
- **ESLint** - Code quality and consistency

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Yarn** - [Installation guide](https://classic.yarnpkg.com/en/docs/install/)
- **Git** - [Download here](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd item-list-manager
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start Development Server

```bash
yarn dev
```

The application will open in your browser at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

- **`yarn dev`** - Starts the development server with hot module replacement (HMR)
- **`yarn build`** - Creates an optimized production build
- **`yarn preview`** - Preview the production build locally
- **`yarn lint`** - Run ESLint to check code quality

## Project Structure

```
src/
├── components/
│   ├── AddItemForm.jsx        # Component for adding new items
│   ├── AddItemForm.css        # Styles for the form
│   ├── ItemList.jsx           # Component for displaying items
│   └── ItemList.css           # Styles for the list
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
├── App.css                    # Global application styles
└── index.css                  # Base styles
```

## Development Notes

### Hot Module Replacement (HMR)

This project uses Vite's HMR for fast refresh during development. Changes to React components will be reflected immediately without losing component state.

### Building for Production

```bash
yarn build
```

This creates an optimized build in the `dist/` folder ready for deployment.
