# @lucaspl3tti/ts-helpers

A lightweight, type-safe collection of utility functions to speed up your TypeScript and JavaScript development.

![NPM Version](https://img.shields.io/npm/v/@lucaspl3tti/ts-helpers?style=flat-square)
![License](https://img.shields.io/npm/l/@lucaspl3tti/ts-helpers?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square)

## ✨ Features

This library provides helper methods across several classes:

- **Utilities**: Your Swiss Army knife for common tasks like vdelays, debouncing, iteration, and random generation.
- **DOM**: Easily handle element manipulation like changing classes and styles or create entire elements from scratch.
- **Color**: Advanced conversion (Hex, RGB, HSL) and contrast calculation.
- **Formatting**: Helpers for manipulating strings, dates, and numbers.
- **DeviceAccess & ViewportAccess**: Check device types and viewport dimensions reliably and listen to Viewport Changes.
- **ArrayAccess & ObjectAccess**: Safe accessors and manipulation tools.
- **Event Emitter**: A simple typed event emitter implementation.

## 📦 Installation

Install the package via npm:

```bash
npm install @lucaspl3tti/ts-helpers
```

## 🚀 Usage

You can import specific helpers to keep your bundle size small (tree-shaking supported), or import grouped modules.

### Basic Example

```js
import { DOM } from '@lucaspl3tti/ts-helpers';

Dom.addClass(element, 'my-custom-class');
```

## 📄 License
MIT License © 2026 Jan-Luca Splettößer
