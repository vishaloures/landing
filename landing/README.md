# Trade API Landing Page & Documentation

This project is a responsive landing page for the Trade API, built using React, TypeScript, and Vite. It features a dynamic API documentation browser that is automatically generated from Protobuf (`.proto`) definition files.

## Features

-   **React + TypeScript:** A modern, type-safe frontend stack.
-   **Vite:** Fast development server and build tool.
-   **Bootstrap & React-Bootstrap:** For responsive UI components.
-   **Automatic API Spec Generation:** A script parses `.proto` files to generate a JSON specification, which is then used to render the API documentation.
-   **ESLint:** For code quality and consistency.

## Getting Started

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm

### Installation

1.  Clone the repository.
2.  Navigate to the `landing` directory:
    ```bash
    cd landing
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Available Scripts

In the `landing` directory, you can run the following commands:

### `npm run dev`

Starts the development server on `http://localhost:5173` (or the next available port). It automatically watches for file changes and updates the application using Hot Module Replacement (HMR).

This command first runs `npm run generate-api` to ensure the API documentation is up-to-date before starting the server.

### `npm run build`

Builds the application for production. The output is placed in the `dist` directory. This command also ensures the API specification is generated before building.

### `npm run lint`

Lints the project files using ESLint to check for code quality and style issues.

### `npm run preview`

Starts a local server to preview the production build from the `dist` directory.

### `npm run generate-api`

Manually runs the script to generate the `src/api-spec.json` file from the `.proto` definitions. The script's configuration can be found in `scripts/generate-api-spec.cjs`.

## API Documentation Generation

The core feature of this application is its ability to display API documentation sourced from `.proto` files.

-   **Source:** The `.proto` files are expected to be located in a specific directory outside of this project (see `scripts/generate-api-spec.cjs` for the exact path configuration).
-   **Process:** The `scripts/generate-api-spec.cjs` script uses `protobufjs` to parse the service, message, and enum definitions from the `.proto` files.
-   **Output:** The script generates a structured JSON file at `src/api-spec.json`.
-   **Rendering:** The React application reads `src/api-spec.json` and dynamically renders the documentation, including services, methods, request/response types, and descriptions.

**Note:** Do not edit `src/api-spec.json` manually, as it will be overwritten the next time the generation script runs.