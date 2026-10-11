<div align="center">

# 🛒 বাজার দর (BazarDor)

**আজকের বাজারের দাম এক নজরে**

Track today's essential grocery prices across Bangladesh — rice, lentils, oil, vegetables, fish, meat, eggs-dairy and spices — with market-wise comparison and daily price changes.

[Live Demo](#) · [Report a Bug](#) · [Request a Feature](#)

</div>

---

## 📖 About

**বাজার দর (BazarDor)** is a responsive, Bangla-first web app that shows the latest prices of everyday products.
Visitors can browse prices by category, see which items got more expensive or cheaper today, and — after signing in —
open a product to compare minimum, maximum and average prices across different markets and divisions.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js** | Build the UI |
| **App Router (Next.js)** | Handle page navigation and dynamic routes (`/category/[slug]`, `/product/[slug]`) |
| **Tailwind CSS + DaisyUI** | Styling and responsiveness |
| **TypeScript** | Type-safe code |
| **Better Auth** | Email/password, Google and GitHub authentication |
| **MongoDB** | Stores users and sessions |
| **react-toastify** | Toast notifications for auth and errors |
| **Noto Serif Bengali** | Bangla typography via `next/font` |

## ✨ Key Features

1. **📈 Live price ticker** — an infinitely scrolling strip under the navbar showing emoji, product name, price per unit and ▲/▼ change.
2. **🔺🔻 Daily movers** — the top 6 products whose prices rose and the top 6 whose prices fell today, plus a full product grid.
3. **🗂️ Category pages with sorting** — skeleton loading, sort by default / price low→high / price high→low (numeric, not text), and a friendly 404 state.
4. **🔒 Protected product details** — login-only page with min, max and average prices and a market-by-market price table.
5. **🔐 Complete authentication** — Email/Password, Google and GitHub sign-in with Better Auth, a profile page, name update, and toast feedback everywhere.

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

OAuth callback URLs: `/api/auth/callback/google` and `/api/auth/callback/github`.

## 📡 API

Data comes from `https://openapi.programming-hero.com/api/bazardor`:

`/products` · `/products?category=chal` · `/products/1` · `/categories` · `/categories/chal`

## ☁️ Deployment

Deploy on Vercel, add the same environment variables, set `BETTER_AUTH_URL` to your live domain, and add that
domain's callback URLs in your Google and GitHub OAuth apps.

---

<div align="center">Made with 💚 for Bangladesh's bazaars</div>
