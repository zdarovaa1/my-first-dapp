import { Request, Response } from "express";
import Container from "typedi";
import OrderInteract from "../contract/contract-interact";
import { MatchedOrderService } from "../db/matched-order/matched-order.service";

export async function getOrders(req: Request, res: Response) {
	const orders = await Container.get(MatchedOrderService).getMatchedOrders()
	res.send(orders)
}

export async function matchOrders(req: Request, res: Response) {
	const matchingOrders = req.body
	const test = {
		orderA: {
			orderId: [75517625418193282505198283461573701398187294720007493028567991258991658110426n],
			tokenA: '0x4e1e0c0E95Ce552087e603626a85EF0D8E73340d',
			tokenB: '0x577D296678535e4903D59A4C929B718e1D575e0A',
			amountA: '100000000',
			amountB: '100000000',
		}
	}
	res.send(await Container.get(OrderInteract).matchOrder(test))
}