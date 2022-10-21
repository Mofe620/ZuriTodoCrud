const express = require("express");
const app = express();

const PORT = 7000;
const todoRouter = require("./routes/todoRoutes");

app.use(express.json());
app.use("/todo", todoRouter);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
