# Bazar Dor — বাজার দর

Bazar Dor is a Bengali-language product price tracking web application that helps users explore daily essential product prices, compare market prices, and understand price changes over time.

## Features

- **Product Listings:** Browse essential products with Bengali names, current prices, and units.
- **Price Trends:** View products with rising and falling prices.
- **Category Browsing:** Explore products by category and sort them by price.
- **Product Details:** View minimum, maximum, average, and market-wise prices.
- **Authentication:** Sign up and sign in with email and password.
- **GitHub Login:** Sign in using GitHub OAuth.
- **Protected Routes:** Restrict product, category, and profile pages to authenticated users.
- **Profile Management:** Update your profile name and sign out.
- **Responsive UI:** Browse on mobile, tablet, and desktop.
- **Loading and Error States:** Display loading skeletons and a friendly 404 page.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB
- React Hot Toast

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB connection and required authentication environment variables

### Installation

Clone the repository:

    git clone https://github.com/nissumoncode/bazar-dor-project.git
    cd bazar-dor-project

Install dependencies:

    npm install

Create a `.env` file in the project root and configure the required environment variables.

Start the development server:

    npm run dev

Open http://localhost:3000 in your browser.

## Production Build

    npm run build
    npm run start

## Deployment

The application is deployed on Vercel.

## Repository

https://github.com/nissumoncode/bazar-dor-project
