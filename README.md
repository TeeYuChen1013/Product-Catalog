# Product Catalog

## Overview
A React Native mobile application for browsing products using the DummyJSON API.
The application allows users to browse products, load additional products through pagination, search for products, and view product details.

## Features
- Browse products with product title, thumbnail, and price
- Load more products when scrolling to the bottom of the product list
- Search products with debounce
- View detailed product information, including:
  - Product title
  - Description
  - Price
  - Rating
  - Product image
- Navigate between the product list and product detail screens

## Tech Stack
- React Native
- TypeScript
- React Navigation
- DummyJSON API

## Requirements
- Node.js
- JDK 17
- Android Studio with an Android Virtual Device (AVD)

## Installation
Install the project dependencies:

```sh
npm install
```

## Running the App

The application requires two terminal windows. Each terminal should be opened in the project root folder, such as `C:/your/path/to/ProductCatalog`.

Start the Metro bundler in First terminal(React Native):

```sh
npx react-native start
```
In Second terminal, run the application on an Android emulator(Android Studio):

```sh
npx react-native run-android
```

## API
The application uses the free DummyJSON API to retrieve product data.

### Product List

Used to retrieve products with pagination:

`https://dummyjson.com/products?limit=10&skip={skip}`

### Product Detail

Used to retrieve details for a selected product:

`https://dummyjson.com/products/{id}`

## Architecture
```text
ProductCatalog/
├── App.tsx
├── ProductListScreen.tsx
└── ProductDetailScreen.tsx
```
### App
- App.tsx
  - Configures the application's navigation stack
  - Defines navigation between the product list and product detail screens
  
### Product List 
- ProductListScreen.tsx
  - Retrieves and displays the product list
  - Handles pagination
  - Handles product search
  - Navigates to the product detail screen

### Product Detail
- ProductDetailScreen.tsx
    - Retrieves the selected product using the product ID
    - Displays the product details

## Search Implementation
Product search is implemented using client-side filtering with debounce.

The application filters the currently loaded products based on the product title. A short delay is applied before performing the filtering to avoid triggering the search operation on every keystroke.

Client-side filtering was chosen because the product data is already loaded into the application, making basic title-based searching possible without sending an additional API request for each search input.

## AI Usage
AI assistance was used mainly for guidance and debugging during development.

It was used for:
- Clarifying React Native concepts and API usage
- Understanding component and hook usage
- Debugging syntax and runtime errors
- Clarifying navigation and debounce implementation

The core application logic and implementation were developed by the developer. Project structure and architecture decisions were also made by the developer.

## Unfinished / TODO
The following assessment requirement was not completed within the development time-box:

- Explicit UI states for loading, error, empty, and success conditions

Possible future improvements:
- Pull-to-refresh
- Image loading placeholders and error handling
- Unit tests
- Additional UI/UX improvements

### Known Limitation
- Search currently filters the products that are already loaded in the product list. Rapidly changing the search keyword during the debounce period may cause the new search to be performed against the previously filtered results.
