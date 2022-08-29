import 'reflect-metadata';
import express from 'express'
import Container from 'typedi'
import { OrderService } from './db/order/order.service'
import { myDataSource } from './db/server'
import dotenv from "dotenv";
import { Order } from './db/order/order.entity';
import { MatchedOrderService } from './db/matched-order/matched-order.service';
const app = express()
dotenv.config();


async function bootstrap() {
	try {
		await myDataSource.initialize()
		const orders = await myDataSource.getRepository(Order).count()
		if (!orders) {
			console.log('Please wait until orders fetch')
			await Container.get(OrderService).saveNewOrders();
		}
		app.use(express.json())
		require('./routes/routes')(app);
		app.listen(process.env.APP_PORT || 3000)
		console.log('Express app started on port ', process.env.APP_PORT || 3000)
	} catch (e) {
		console.log(e.message);
	}
}
bootstrap()


// https://rinkeby.etherscan.io/address/0xc7dd7d4730d95aae47f27c32ebb85b04fc78769e