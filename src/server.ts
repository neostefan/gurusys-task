import App from "./app";
import AuthRoutes from "./routes/auth.route";
import PostRoutes from "./routes/post.route";
import UserRoutes from "./routes/user.route";

const server = new App([ new PostRoutes(), new AuthRoutes(), new UserRoutes() ])

server.startServer();