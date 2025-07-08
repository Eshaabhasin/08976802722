# URL Shortener Application

A React-based URL shortener application with Material-UI components that allows users to create shortened URLs and view statistics.

## Features

### URL Shortener Page
- Shorten up to 5 URLs concurrently
- Optional validity period (defaults to 30 minutes)
- Optional custom shortcode
- Client-side validation
- Display results with expiry dates

### Statistics Page
- View all created shortened URLs
- Display creation and expiry dates
- Show click statistics
- Detailed click data with timestamps, source, and location

### URL Redirection
- Automatic redirection when accessing short URLs
- Click tracking
- Error handling for expired/invalid links

## Technical Implementation

- **Framework**: React with Vite
- **UI Library**: Material-UI
- **Routing**: React Router DOM
- **Data Storage**: localStorage (client-side persistence)
- **Port**: http://localhost:3000

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

## Usage

1. **Create Short URLs**: Navigate to the Shortener page, enter URLs with optional validity periods and custom shortcodes
2. **View Statistics**: Check the Statistics page to see all created URLs and their click data
3. **Use Short URLs**: Click on any generated short URL to be redirected to the original URL

## Architecture

- Client-side routing handles short URL redirection
- All data is stored in localStorage for persistence
- Unique shortcode generation with collision detection
- Comprehensive error handling and validation