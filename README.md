# 🛍️ FusionFootwear E-commerce Store

A modern, full-stack e-commerce store for a fictional footwear brand — **FusionFootwear**. This project is part of my front-end portfolio to showcase my ability to build responsive, scalable, and feature-rich web applications using modern technologies.

> 🎯 Live Demo: [fusionfootwear-store.vercel.app](https://fusionfootwear-store.vercel.app/)  
> 📦 GitHub Repo: [github.com/JaiBh/fusionfootwear-ecommerce-store](https://github.com/JaiBh/fusionfootwear-ecommerce-store)

---

## 🧰 Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Frontend**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Type Safety**: TypeScript
- **Authentication**: [Convex](https://www.convex.dev/)
- **Payments**: [Stripe (Test Mode)](https://stripe.com/)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- **Hosting**: [Vercel](https://vercel.com/)

---

## ✨ Features

- ✅ Fully responsive e-commerce storefront
- 👟 Product catalog with filters by size, category, and price
- 🛒 Add to cart, update quantity, remove items
- 🔐 Secure user authentication (login/signup) with Convex
- 🧾 Fully functional Stripe checkout (test mode — no real charges)
- 🗂️ Admin dashboard integration ready (via separate project)
- 💬 _Coming soon_: AI shopping assistant widget for smarter UX

---

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/JaiBh/fusionfootwear-ecommerce-store.git
cd fusionfootwear-ecommerce-store
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**
   Create a `.env` file using `.env.example` and fill in the required values (Clerk keys, database URL, etc).

4. **Run the dev server:**

```bash
npm run dev
```

---

## 📁 Project Structure

```
/app              # Next.js App Router
/components       # UI and shared components
/actions/         # Server actions
/lib              # Utilities and helpers
/prisma           # Prisma schema and client
/public           # Static assets
```

---

## 🔒 Environment Variables

Create a `.env` file in the root directory and include:

```
NEXT_PUBLIC_API_URL=...
NEXT_PUBLIC_CONVEX_URL=...
CONVEX_DEPLOYMENT=...
```

---

## 🧑‍💻 Author

Built by [**Jai Bhullar**](https://jaibh-portfolio.vercel.app/) – aspiring front-end/full-stack developer based near London.

- 📫 Email: jaibhullar.developer@outlook.com
- 🔗 **LinkedIn:** [linkedin.com/in/jai-bhullar-dev](https://www.linkedin.com/in/jai-bhullar-dev)
- 📄 [View My CV](https://drive.google.com/file/d/1CTHnq0laeat8fFoE7rDsQGtSYJl-ILTk/view?usp=sharing)

---

## 📝 License

MIT License. Feel free to use, modify, or contribute!
