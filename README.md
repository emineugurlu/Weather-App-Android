# 📱 MobileCore: Cross-Platform Native Architecture

> **"A high-performance mobile application foundation built with React Native, leveraging native modules, Metro bundling, and Fast Refresh cycles for a seamless dual-OS experience."**

![Repo Size](https://img.shields.io/github/(https://github.com/emineugurlu/Weather-App-Android)color=blueviolet&style=flat-square)
![Framework](https://img.shields.io/badge/Framework-React--Native-61dafb?style=flat-square&logo=react)
![Platform](https://img.shields.io/badge/Platform-Android--iOS-success?style=flat-square)

Mobile development requires a deep understanding of hardware-software synergy. This project is a technical implementation of a **Cross-Platform Native Bridge**, utilizing the `@react-native-community/cli` to orchestrate a unified codebase for both Android and iOS. The focus was on mastering the **Metro Bundler** lifecycle, native dependency management via CocoaPods, and high-velocity iteration through Fast Refresh logic.

---

## 🚀 Engineering Mindset

This project serves as a showcase for **Mobile System Design**:

*   **Native Bridge Orchestration:** Utilizing React Native to communicate between JavaScript logic and native C++/Java/Swift modules for high-fidelity performance.
*   **Dependency Management:** Managing complex native environments, including **CocoaPods** for iOS and **Gradle** for Android, ensuring consistent builds across different OS architectures.
*   **Metro Build Optimization:** Configuring the Metro development server as a specialized JavaScript bundler for mobile, ensuring rapid asset delivery and debugging.
*   **Stateful Fast Refresh:** Leveraging React Native's hot-reloading capabilities to maintain application state during UI/UX iteration cycles.
*   **Environment Parity:** Ensuring the codebase remains performant across the Android Emulator, iOS Simulator, and physical hardware devices.

## 🌟 Key Features

*   **Dual-Platform Deployment:** A single JavaScript codebase targeting both Android and iOS with native components.
*   **Integrated Debugging:** Advanced developer menu integration for real-time state resets and performance monitoring.
*   **TypeScript-Ready Architecture:** Robust type-checking for scalable mobile application logic (via `App.tsx`).
*   **Modular Asset Pipeline:** Optimized handling of fonts, images, and native assets for mobile distribution.

## 🔧 Technical Stack

*   **Core:** React Native, JavaScript/TypeScript.
*   **Build Tools:** Metro Bundler, Ruby Bundler (for CocoaPods).
*   **Native Tools:** Android Studio (Gradle), Xcode (CocoaPods).

---

## 🛠️ Installation & Execution

### Step 1: Start Metro
Initialize the JavaScript build tool:
```sh
npm start
````
###Step 2: Build & Run
For Android:
````sh
npm run android
````
For iOS:
Install native dependencies first:
````sh
bundle install
bundle exec pod install
````
Run application:
````sh
npm run ios
````
Developed by Emine Uğurlu - Computer Engineer.
