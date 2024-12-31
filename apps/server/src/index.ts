import dotenv from "dotenv";
dotenv.config();
import authRoute from "./routes/auth.route";
import utilRoute from "./routes/utils.route";
import tagsRoute from "./routes/tags.route";
import resourceRoute from "./routes/resource.route";
import profileRoute from "./routes/profile.route";
import usersRoute from "./routes/users.route";
import upvotesRoute from "./routes/upvotes.route";
import ResourceCollectionRoute from "./routes/resource-collection.route";
import express from "express";
import cors from "cors";
import { dbConnection } from "./db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://resourcle.vercel.app", "http://localhost:3000  "],
    credentials: true,
  }),
);

// Route for the home page
app.get("/", (req, res) => {
  res.send("You are hacked");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/utils", utilRoute);
app.use("/api/v1/tags", tagsRoute);
app.use("/api/v1/resource", resourceRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/upvotes", upvotesRoute);
app.use("/api/v1/resoruceCollection", ResourceCollectionRoute);

try {
  // Ensure the database connection is established before starting the server
  console.log(process.env)
  await dbConnection();
  app.listen(PORT, () => {
      console.log(`Primary server is running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Failed to start the server:", err);
  console.error("Stack trace:", err);
  process.exit(1); // Exit with a failure code
}