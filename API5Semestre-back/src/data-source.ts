import { DataSource } from "typeorm";
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: "mongodb",
  url: `mongodb://db:${process.env.PORT}`, // Use "db" as the hostname
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.ts"],
  subscribers: [],
  maxQueryExecutionTime: 2000,
  useUnifiedTopology: true
});

AppDataSource.initialize()
  .then(() => {
    console.log(`Data Source inicializado!`)
  })
  .catch((error) => {
    console.error("Erro na inicialização do Data Source:", error)
  });

export default AppDataSource;
