/* eslint-disable no-loop-func */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import validator from 'validator';
import { code, message } from '../../config/messages';
import URL from '../../modals/URL';
import logger from '../../logger/logger-config';
import { getAsync, redisClient } from '../../app';

const cryptoRandomString = require('crypto-random-string');

const shortenURL = async (req: Request, res: Response) => {
	if (!req.body.url || !req.body.shortHand || !req.body.email) {
		res.status(400).send({
			success: false,
			code: code.wrongParameters,
			message: message.wrongParameters
		});
		return;
	}

	let { url, shortHand, custom, email }: { url: string; shortHand: string; custom: boolean; email: string } = req.body;

	if (!validator.isURL(url)) {
		res.status(200).send({
			success: false,
			code: code.invalidURL,
			message: message.invalidURL
		});
		return;
	}

	if (url.includes(String(process.env.DOMAIN))) {
		res.status(200).send({
			success: false,
			code: code.alreadyShort,
			message: message.alreadyShort
		});
		return;
	}

	if (!custom) {
		let available: boolean = false;
		while (!available) {
			shortHand = cryptoRandomString({ length: 5, type: 'url-safe' });
			// eslint-disable-next-line no-await-in-loop
			if ((await getAsync(shortHand)) === null) {
				available = true;
			}
		}
	} else if (custom && !shortHand.match(/^([a-zA-Z0-9]+[-.~]?)+$/gm)) {
		res.status(200).send({
			success: false,
			code: code.invalidCustomURL,
			message: message.invalidCustomURL
		});
		return;
	}

	await redisClient.setnx(shortHand, url, async (err, reply) => {
		if (reply === 0) {
			res.status(200).send({
				success: false,
				code: code.shortHandUnavailable,
				message: message.shortHandUnavailable
			});
		} else {
			const urlDB = new URL({
				url,
				shortHand,
				email
			});
			try {
				await urlDB.save();

				res.status(201).send({
					success: true,
					url,
					shortHand: `${process.env.DOMAIN}/${shortHand}`
				});
			} catch (err2) {
				logger.error(err2);
				res.status(500).send({
					success: false,
					code: code.serverError,
					message: message.serverError
				});
			}
		}
	});
};

const redirect = async (req: Request, res: Response) => {
	const site = await getAsync(req.params.id);
	if (site !== null) {
		res.redirect(site);
	} else {
		res.redirect('/');
	}
};

export { shortenURL, redirect };
