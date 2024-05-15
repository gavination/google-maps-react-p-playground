This is a sample PoC project working with React/NextJS and the Google Maps React Component library. So far, we can validate the following works:
- Capturing the user's location using lat/long values and feeding it to the Map component
- Building a route between 2 points, with the origin point being the fetched location
- Map resizes based on browser size for responsive design
- Pins and markers can be set

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

