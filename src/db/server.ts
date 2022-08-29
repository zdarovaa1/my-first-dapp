import { DataSource } from "typeorm"
import { Order } from "./order/order.entity"
import dotenv from "dotenv";
import { MatchedOrder } from "./matched-order/matched-order";
dotenv.config();

export const myDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [Order, MatchedOrder],
	logging: true,
	synchronize: true,
})