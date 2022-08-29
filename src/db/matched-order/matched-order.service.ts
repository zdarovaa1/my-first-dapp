
import { Service } from "typedi";
import { Repository } from "typeorm";
import ContractInteract from "../../contract/contract-interact";
import { Order } from "../order/order.entity";
import { myDataSource } from './../server';
import { MatchedOrder } from "./matched-order";

@Service()
export class MatchedOrderService {
	constructor(
		private readonly contractInteract: ContractInteract,
	) {
	}
	async matchOrders() {
		const orders = await myDataSource.getRepository(Order).find({ where: { matched: false } })

		//bad fast solution but can't save relations with typeorm bug https://github.com/typeorm/typeorm/issues/7736
		orders.map(order => order.matched = true)
		await myDataSource.getRepository(Order).save(orders)
		//

		const matchedOrders: MatchedOrder[] = []
		orders.some((orderA: Order) => {
			orders.some((orderB: Order) => {
				if (
					orderA.tokenA === orderB.tokenB &&
					orderA.tokenB === orderB.tokenA &&
					orderA.amountA === orderB.amountB &&
					orderA.amountB === orderB.amountA
				) {
					if (orders.indexOf(orderA)) orders.splice(orders.indexOf(orderA), 1)
					if (orders.indexOf(orderB)) orders.splice(orders.indexOf(orderB), 1)
					const matchedOrder = new MatchedOrder()
					matchedOrder.orderA = orderA
					matchedOrder.orderB = orderB
					matchedOrders.push(matchedOrder)
					return true
				}
			})
		})
		await myDataSource.getRepository(MatchedOrder).save(matchedOrders)
	}

	async getMatchedOrders() {
		return await myDataSource.getRepository(MatchedOrder).find({ relations: ['orderA', 'orderB'] })
	}
}