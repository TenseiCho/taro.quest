# Taro Quest

A 3D web application built with SvelteKit and Threlte.

## Project Overview

Taro Quest is a 3D web application that showcases a 3D anime girl model in an interactive environment. The project utilizes SvelteKit for the application framework and Threlte for 3D rendering capabilities.

## Technologies Used

- SvelteKit
- Threlte
- Three.js
- TypeScript

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/taro-quest.git
   cd taro-quest
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Development

To start the development server:
    ```
    npm run dev
    ```

This will start the server and open the app in a new browser tab. The app will automatically reload if you change any of the source files.

### Building for Production

To create a production version of your app:
    ```
    npm run build
    ```

You can preview the production build with:
    ```
    npm run preview
    ```

## Project Structure

- `src/lib/components/`: Contains Svelte components including the main App and Scene components.
- `src/lib/components/models/`: Contains the 3D model components, such as the anime girl.
- `src/routes/`: Contains the SvelteKit routes.
- `src/lib/stores/`: Contains Svelte stores for state management.
- `src/lib/utils/`: Contains utility functions and helpers.
- `static/`: Contains static assets, including 3D model files.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- 3D Anime Girl Model: "Zeze 3d Anime Girl" by DrewBurger (https://sketchfab.com/3d-models/zeze-3d-anime-girl-e35bbebf648f4824b4308bf23718e57e)
- Threlte: https://threlte.xyz/
- SvelteKit: https://kit.svelte.dev/