import HDWalletProvider from "@truffle/hdwallet-provider";
import { Service } from "typedi";
import Web3 from "web3";
import { AbiItem, toBN } from "web3-utils";
import { Order } from "../db/order/order.entity";

@Service()
export default class OrderInteract {
	constructor() { }

	private getContract() {
		const provider = new HDWalletProvider(process.env.MNEMONIC as string, process.env.NODE_API_URL)
		const web3 = new Web3(provider);
		const contractAbi = [{ "inputs": [{ "internalType": "uint256", "name": "fee", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldFeeRate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newFeeRate", "type": "uint256" }], "name": "FeeRateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "OrderCancelled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountB", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "tokenA", "type": "address" }, { "indexed": false, "internalType": "address", "name": "tokenB", "type": "address" }, { "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isMarket", "type": "bool" }], "name": "OrderCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "matchedId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountReceived", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountPaid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountLeftToFill", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "feeRate", "type": "uint256" }], "name": "OrderMatched", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "cancelOrder", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "name": "createOrder", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "getAccumulatedFeeBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getOrderId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOrderIdLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "getOrderInfo", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "from", "type": "uint256" }, { "internalType": "uint256", "name": "length", "type": "uint256" }], "name": "getUserOrderIds", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUserOrderIdsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "matchedOrderIds", "type": "uint256[]" }, { "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }, { "internalType": "bool", "name": "isMarket", "type": "bool" }], "name": "matchOrders", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newFeeRate", "type": "uint256" }], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "withdrawFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
		return new web3.eth.Contract(contractAbi as unknown as AbiItem, process.env.CONTRACT_ADDRESS);
	}
	async getNewContractOrders(curOrderLength): Promise<Order[] | null> {
		const ordersCount = await this.getContract().methods.getOrderIdLength().call()
		let startNumber = 1
		if (Number(ordersCount) === curOrderLength + 1) {
			return null
		} else {
			startNumber = curOrderLength
		}
		const result: Order[] = []
		for (startNumber; startNumber < ordersCount; startNumber++) {
			const id = await this.getContract().methods.getOrderId(startNumber).call()
			const order = await this.getContract().methods.getOrderInfo(id).call()
			result.push(order)
		}
		return result.map((order: Order) => this.convertOrder(order))
	}

	private convertOrder(order): Order {
		const valSafety = (key) => {
			return order[key].length ? order[key] : null
		}
		return order = {
			orderId: valSafety(0),
			amountA: valSafety(1),
			amountB: valSafety(2),
			amountLeftToFill: valSafety(3),
			fees: valSafety(4),
			tokenA: valSafety(5),
			tokenB: valSafety(6),
			user: valSafety(7),
			isCancelled: order['8'],
		} as Order
	}

	async matchOrder(order) {
		//TODO match orders returns error every time i try to match something
		console.log(await this.getContract().methods.getOrderInfo(70680076766221491091059241507556687703575712922042205023201236550047196109582n).call())
		//returns 
		// 	return (
		// 		order.id,
		// 		order.amountA,
		// 		order.amountB,
		// 		order.amountLeftToFill,
		// 		order.fees,
		// 		order.tokenA,
		// 		order.tokenB,
		// 		order.user,
		// 		order.isCancelled
		// );
		// Result {
		// 	'0': '70680076766221491091059241507556687703575712922042205023201236550047196109582',
		// 	'1': '100000000', -- amountA
		// 	'2': '100000000', -- amountB
		// 	'3': '0',
		// 	'4': '250000',
		// 	'5': '0x577D296678535e4903D59A4C929B718e1D575e0A', -- tokenA
		// 	'6': '0x4e1e0c0E95Ce552087e603626a85EF0D8E73340d', -- tokenB
		// 	'7': '0x417be28dae3eb3b386610e361FC92668f2eB77cF',
		// 	'8': false
		// }
		await this.getContract().methods.matchOrders([toBN('7181952227660538453789453724418936149304539458848712260673099420716450752984')], '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735', '0x577D296678535e4903D59A4C929B718e1D575e0A', toBN('1000000000000000000'), toBN('100000000'), false).call()
		// function matchOrders(
		// 	uint256[] calldata matchedOrderIds,
		// 	address tokenA,
		// 	address tokenB,
		// 	uint256 amountA,
		// 	uint256 amountB,
		// 	bool isMarket)
		return
	}
}
