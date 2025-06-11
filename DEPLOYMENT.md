# Deployment Procedure

## Hosting Platform
This project is hosted on **Vercel** (https://vercel.com/) for the frontend and **Render** (https://render.com/) for the backend API. Vercel provides seamless integration with GitHub for frontend deployments, while Render is used to deploy and manage the backend API service.

## Frontend Deployment (Vercel)

1. **Connect to GitHub**
   - Sign in to Vercel and import the project directly from your GitHub repository.
   - Grant Vercel access to the repository you want to deploy.

2. **Configure Project Settings**
   - Set the root directory to the project folder if needed (e.g., `/` for this project).
   - Ensure the build command is set to `pnpm run build` or `npm run build`.
   - Set the output/public directory to `dist` (the default for Vite projects).

3. **Environment Variables**
   - If your project requires environment variables, add them in the Vercel dashboard under the project settings.

4. **Automatic Deployment**
   - Every push to the main branch (or any selected branch) triggers an automatic deployment.
   - Vercel builds the project and hosts the latest version at your assigned Vercel URL (e.g., `https://your-project-name.vercel.app`).

5. **Custom Domain (Optional)**
   - You can add a custom domain in the Vercel dashboard and point your DNS records to Vercel.

## Backend API Deployment (Render)

1. **Create a Render Account**
   - Go to [https://render.com/](https://render.com/) and sign up or log in.

2. **Connect to GitHub**
   - In the Render dashboard, click "New Web Service" and connect your GitHub repository containing the backend API code (see `backend.txt` for backend details).

3. **Configure Service**
   - Choose the branch to deploy (usually `main` or `master`).
   - Set the build command (e.g., `npm install && npm run build` or as required by your backend).
   - Set the start command (e.g., `npm start` or `node server.js`).
   - Specify the environment (Node, Python, etc.) and any required environment variables.

4. **Deploy**
   - Click "Create Web Service". Render will build and deploy your API.
   - After deployment, Render provides a public URL for your API .
   - Update frontend API calls to use URL provided by vercel

5. **Automatic Redeployment**
   - Any push to the selected branch will trigger an automatic redeployment of the API.

## Useful Links
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Render Documentation](https://render.com/docs)
- [Render Dashboard](https://dashboard.render.com/)

## Summary
- The frontend is continuously deployed via Vercel from the GitHub repository.
- The backend API is deployed and managed on Render, also connected to GitHub for automatic redeployment.
- No manual deployment steps are required after initial setup—just push to GitHub and both Vercel and Render handle the rest.

---

For more details or troubleshooting, visit the Vercel and Render documentation or your project dashboards.
