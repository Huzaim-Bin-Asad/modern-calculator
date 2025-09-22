# Modern Multi-Mode Calculator

A powerful desktop calculator application built with React and Electron, inspired by Windows Calculator.

## Features

- **🧮 Standard Calculator**: Basic operations with memory functions
- **🔬 Scientific Calculator**: Trigonometry, logs, exponents, constants
- **📈 Graphing Mode**: Interactive function plotting with Chart.js
- **💻 Programmer Mode**: Number base conversions and bitwise operations
- **📅 Date Calculator**: Date arithmetic and calculations
- **🔄 Unit Converters**: Length, Volume, Weight, Temperature, Energy, Area, Speed, Time, Power
- **🌙 Dark/Light Theme**: Toggle between themes
- **📱 Responsive Design**: Works on all screen sizes

## Installation

### Development
```bash
npm install
npm run electron-dev
```

### Production Build
```bash
npm run electron-pack
```

## Usage

The app runs as a native desktop application with:
- Native window controls
- Menu bar with standard options
- Keyboard shortcuts
- System integration

## Building

To create distributable packages:
```bash
npm run electron-pack
```

This will create installers for Windows, macOS, and Linux in the `dist` folder.

## Technology Stack

- React 18
- Electron
- Bootstrap 5
- Chart.js
- Math.js
- date-fns