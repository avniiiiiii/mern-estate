// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vite.dev/config/
// export default defineConfig({
//   // a proxy is defined:
//   //Requests starting with /api are forwarded to http://localhost:5000.
//   //This is useful for local development when your frontend and backend run on different servers.
//   //secure: false ensures the proxy works even if the target server doesn't use HTTPS.
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000",
//         secure: false,
//       },
//     },
//   },

//   plugins: [react()],
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000", // Ensure this is pointing to the correct backend port
    },
  },
  plugins: [react()],
});
