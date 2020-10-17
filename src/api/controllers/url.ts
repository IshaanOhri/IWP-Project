import { Request, Response } from 'express';
import { code, message } from '../../config/messages';
import logger from '../../logger/logger-config';
import URL from '../../modals/URL';

const getUrls = async (req: Request, res: Response) => {
	if (!req.query.email) {
		res.status(400).send({
			success: false,
			code: code.wrongParameters,
			message: message.wrongParameters
		});
		return;
	}

	const { email } = req.query;

	try {
		const urls = await URL.find({
			email
		});

		res.send({
			success: true,
			urls
		});
	} catch (err) {
		logger.error(err);
		res.status(500).send({
			success: false,
			code: code.serverError,
			message: message.serverError
		});
	}
};

export { getUrls };
