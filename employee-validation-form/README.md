# Employee Validation Form

A modern, feature-rich employee form built with React, TypeScript, and Vite. This application demonstrates best practices in form handling, state management, local storage persistence, and user experience design.

## Overview

This project showcases a professional employee validation form with advanced features including real-time validation, auto-save capabilities, character counting, keyboard shortcuts, and persistent data storage using LocalStorage.

## Features

### Core Features

- **Character Counter** - Shows progress for name field with helpful messages
- **Last Saved Timestamp** - Displays when form was last saved/submitted
- **Auto-Save to LocalStorage** - Saves form data every second after typing
- **Auto-Save Indicator** - Shows "Saving..." and "All changes saved" status
- **Sample Data Button** - One-click fill with test data for quick testing
- **Keyboard Shortcuts** - Ctrl+Enter to submit, Esc to reset
- **Shortcut Hint** - Displays available shortcuts at the bottom
- **Dirty State Tracking** - Only auto-saves when form has changes

### Form Validation

- Input validation for employee details
- Real-time feedback on form validity
- Error states with clear messaging

## Benefits

- **Data Persistence** - Form data survives page refresh through LocalStorage
- **Better UX** - Users know their progress is saved with visual indicators
- **Testing Made Easy** - Sample data button for quick testing and demonstrations
- **Power User Features** - Keyboard shortcuts for increased efficiency
- **Visual Feedback** - Clear indicators for all states (saving, saved, unsaved)

## Tech Stack

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation build tool
- **Styled Components** - CSS-in-JS styling
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
cd employee-validation-form
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
│   ├── EmployeeValidationForm.tsx    # Main form component
│   └── EmployeeValidationForm.styles.ts # Styled components
├── App.tsx                            # Main application component
├── main.tsx                           # Application entry point
├── App.css                            # Global styles
└── index.css                          # Base styles
```

## Development Notes

### Hot Module Replacement (HMR)

This project uses Vite's HMR for fast refresh during development. Changes to React components will be reflected immediately without losing component state.

### Building for Production

```bash
yarn build
```

This creates an optimized build in the `dist/` folder ready for deployment.

## Contributing

1. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request
