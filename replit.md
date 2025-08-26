# Overview

This is a location-based web application for Zelenogorsk city that displays points of interest on an interactive map. The application is built as a Telegram WebApp that provides users with the ability to view, explore, and interact with various locations around the city including shopping centers, parks, and community facilities. Users can click on map markers to view detailed information about each location and access sharing and navigation features.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Map Integration**: Leaflet.js for interactive mapping functionality with OpenStreetMap tiles

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with proper error handling and logging middleware
- **Data Storage**: In-memory storage implementation with sample data initialization
- **Schema Validation**: Zod for runtime type checking and validation

## Database Schema
- **Users Table**: Stores user credentials with UUID primary keys
- **Locations Table**: Contains location data with title, address, type, status, description, and coordinates
- **ORM**: Drizzle ORM configured for PostgreSQL with migration support
- **Database Provider**: Neon Database (serverless PostgreSQL)

## Telegram WebApp Integration
- **Platform**: Built specifically for Telegram WebApp environment
- **Features**: Native sharing, theme integration, viewport management
- **Fallback**: Graceful degradation when running outside Telegram

## Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **Type Checking**: TypeScript with strict configuration
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Development Features**: Hot module replacement, source maps, and development banners

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle Kit**: Database migrations and schema management

## Map Services
- **OpenStreetMap**: Tile provider for map rendering
- **Leaflet**: Open-source mapping library for interactive map functionality

## UI Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework

## Development Tools
- **Replit**: Development environment with cartographer plugin for enhanced debugging
- **ESBuild**: Fast JavaScript bundler for production builds

## External APIs
- **Google Maps**: Used for navigation directions (opens external links)
- **Telegram WebApp API**: For native mobile app integration and sharing features

## Fonts and Assets
- **Google Fonts**: SF Pro Display, Roboto, and other typography resources
- **Leaflet CSS**: Styling for map components and markers