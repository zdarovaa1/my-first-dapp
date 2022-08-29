import { Service } from "typedi";
import { Repository } from "typeorm";
import ContractInteract from "../../contract/contract-interact";
import { Order } from "./order.entity";
import { myDataSource } from './../server';
import { MatchedOrderService } from "../matched-order/matched-order.service";

@Service()
export class OrderService {
	constructor(
		private readonly contractInteract: ContractInteract,
		private readonly matchedOrderService: MatchedOrderService,
	) {
	}
	async saveNewOrders() {
		console.log('Starting fetching orders')
		const curOrderLength = await myDataSource.getRepository(Order).count()
		const orders = await this.contractInteract.getNewContractOrders(curOrderLength)
		if (orders) {
			console.log('Starting saving orders')
			await myDataSource.getRepository(Order).save(orders)
			await this.matchedOrderService.matchOrders()
			console.log('Orders successfuly saved')
		} else {
			console.warn('New orders not found')
		}
	}
}