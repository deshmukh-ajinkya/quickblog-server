import cors from 'cors'; // Import CORS

export const corsConfig = cors({
  origin: 'http://localhost:3000', // Set the correct frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow required HTTP methods
  credentials: true, // Allow cookies to be sent with the request
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
});
