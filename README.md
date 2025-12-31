# Cart2  🏎 - CartClaude

A retro-style mini cart game

## 📖 Overview

Cart2 (CartClaude) is a browser-based retro game built with WebAssembly (Rust) and JavaScript. Players control a cart to reach the goal.

[Play in browser](https://myurioka.github.io/cart2)

## 🚀 Tech Stack

- **Rust** - Game logic and engine
- **WebAssembly (wasm-pack)** - Run Rust code in browser
- **JavaScript** - Frontend and browser APIs
- **Vite** - Development server and build tool
- **HTML5 Canvas** - Game rendering

## 🎯 Game Features

- Real-time cart controls
- Realistic physics simulation
- Retro-style graphics
- Sound effects and background music
- High score tracking
- Game over/clear conditions

## 🛠️ Development Setup

### Prerequisites

- Node.js (v14+)
- Rust (latest stable)
- wasm-pack

### Installation

```bash
# Install dependencies
npm install

# Or using pnpm
pnpm install
```

## 🚀 Running the Game

### Development Mode

```bash
npm run dev
```

Open http://localhost:5173 in your browser

### Build

```bash
# Build WebAssembly and frontend
npm run build

# Build WebAssembly only
npm run build-wasm
```

### Preview

```bash
npm run preview
```

## 🎮 Controls

- **Arrow Keys**: Move cart
- **Space Key**: Brake/Action
- **Enter Key**: Start game/Restart

## 📁 Project Structure

```
cart2/
├── src/wasm/           # Rust game engine
│   ├── src/
│   │   ├── game/       # Game logic
│   │   ├── engine.rs   # Game engine
│   │   ├── browser.rs  # Browser APIs
│   │   └── lib.rs      # Main entry point
│   └── Cargo.toml      # Rust dependencies
├── js/                 # Generated WebAssembly
├── static/             # Static assets
│   ├── main.css        # Stylesheet
│   └── FFFFORWA.ttf    # Font
├── index.html          # Main HTML file
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## 🔧 Development

### Rebuilding WebAssembly

After changing Rust code:

```bash
npm run build-wasm
```

### Debugging

Use browser developer tools to check console logs.

## 📄 License

MIT License
