import AppExpress from "./src/appFactory/AppExpress.js";

const app = new AppExpress();
app.init()
app.build()
app.listen()

export default app;
