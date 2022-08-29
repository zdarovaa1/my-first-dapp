import { getOrders, matchOrders } from "../controllers/order.controller";
import express, { NextFunction, Request, Response } from 'express'

module.exports = function (app: express.Application) {
	app.get('/orders', getOrders);
	app.post('/match-orders', matchOrders);

	// middlewares
	app.use(function (err, req: Request, res: Response, next: NextFunction) {
		if (
			err.message &&
			(~err.message.indexOf('not found') ||
				~err.message.indexOf('Cast to ObjectId failed'))
		) {
			return next();
		}
		console.error(err.stack);
		if (err.stack.includes('ValidationError')) {
			res.status(422).send({ error: err.stack });
			return;
		}
		res.status(500).send({ error: err.stack })
	});
	app.use(function (req, res) {
		const payload = {
			url: req.originalUrl,
			error: 'Not found'
		};
		res.status(404).send(payload);
	});
};