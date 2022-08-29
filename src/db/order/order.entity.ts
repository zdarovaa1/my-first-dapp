import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Order extends BaseEntity {
	@PrimaryColumn()
	orderId: string;
	@Column()
	amountA: string;
	@Column()
	amountB: string;
	@Column()
	amountLeftToFill: string;
	@Column()
	fees: string;
	@Column()
	tokenA: string;
	@Column()
	tokenB: string;
	@Column()
	user: string;
	@Column()
	isCancelled: boolean;
	@Column({ default: false })
	matched: boolean;
}