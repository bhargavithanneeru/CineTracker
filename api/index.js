import express  from "express";
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express()

import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import favoritesRoutes from "./routes/favorites.js"
import postsRoutes from "./routes/posts.js"
import watchlistRoutes from "./routes/watchlist.js"
import searchRoutes from "./routes/search.js"



//middlewares 
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
});
app.use(express.json())
app.use(
    cors({
            origin: "http://localhost:3000",
        }
        )
)
app.use(cookieparser())

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/favorites",favoritesRoutes);
app.use("/api/posts",postsRoutes);
app.use("/api/watchlist",watchlistRoutes);
app.use("/api/search",searchRoutes);


app.listen(8800, ()=>{
    console.log("API Working!");
})