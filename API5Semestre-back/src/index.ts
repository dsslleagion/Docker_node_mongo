import * as express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";


dotenv.config();

const app = express();

app.use(express.json({limit:'100mb'})); 


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);