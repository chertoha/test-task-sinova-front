# Test task for Sinova

## Clone repository

```bash
git clone https://github.com/chertoha/test-task-sinova-front.git
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables. Adjust the values according to your environment:
This project is a frontend application built with [Next.js](https://nextjs.org/). It uses environment variables to connect to an API and can be run locally for development.

```bash
API_URL=your_api_url_here (server )
NEXT_PUBLIC_API_URL=your_public_api_url_here
```

API_URL: Used for server-side requests within Next.js.

NEXT_PUBLIC_API_URL: Used for client-side requests and exposed to the browser.

## Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Overview

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
