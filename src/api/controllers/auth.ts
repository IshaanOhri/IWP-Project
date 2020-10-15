import { Request, Response } from 'express';
import { code, message } from '../../config/messages';
import User from '../../modals/user';
import logger from '../../logger/logger-config';

const signUp = async (req: Request, res: Response) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).send({
			success: false,
			code: code.wrongParameters,
			message: message.wrongParameters
		});
		return;
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) {
			res.status(200).send({
				success: false,
				code: code.userExists,
				message: message.userExists
			});
			return;
		}

		const newUser = new User({
			email,
			password
		});

		await newUser.save();
		res.status(200).send({
			success: true,
			code: code.signUpSuccess,
			message: message.signUpSuccess
		});
		return;
	} catch (err) {
		logger.error(err);
		res.status(500).send({
			success: false,
			code: code.serverError,
			message: message.serverError
		});
	}
};

const login = async (req: Request, res: Response) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).send({
			success: false,
			code: code.wrongParameters,
			message: message.wrongParameters
		});
		return;
	}

	const { email, password } = req.body;

	try {
		const user: any = await User.findOne({
			email
		});

		if (!user) {
			res.status(404).send({
				success: false,
				code: code.invalidUser,
				message: message.invalidUser
			});
			return;
		}

		if (user.password !== password) {
			res.status(403).send({
				success: false,
				code: code.invalidCredentials,
				message: message.invalidCredentials
			});
			return;
		}

		res.send({
			success: true
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

export { signUp, login };
