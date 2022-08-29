import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";

@Entity()
export class MatchedOrder extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => Order)
	@JoinColumn()
	orderA: Order

	@OneToOne(() => Order)
	@JoinColumn()
	orderB: Order
}