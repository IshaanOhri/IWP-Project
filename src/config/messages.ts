const code = {
	health: 'health',
	invalidURL: 'invalidURL',
	invalidCustomURL: 'invalidCustomURL',
	welcome: 'welcome',
	shortHandUnavailable: 'shortHandUnavailable',
	invalidDomain: 'invalidDomain',
	alreadyShort: 'alreadyShort',
	dbEntry: 'dbEntry',
	wrongParameters: 'wrongParameters',
	userExists: 'userExists',
	signUpSuccess: 'signUpSuccess',
	serverError: 'serverError',
	invalidUser: 'invalidUser',
	invalidCredentials: 'invalidCredentials'
};

const message = {
	health: 'URL shortner running successfully',
	invalidURL: 'Entered URL is invalid',
	invalidCustomURL: 'Entered custom URL in invalid',
	welcome: 'Hello World :)',
	shortHandUnavailable: 'The selected URL is not available',
	invalidDomain: 'Entered URL is already a shortened URL',
	alreadyShort: 'Entered URL is already shortened',
	dbEntry: 'Database entry failure',
	wrongParameters: 'Entered parameters are incorrect',
	userExists: 'A user is already registered with the email ID',
	signUpSuccess: 'User has been registered successfully',
	serverError: 'An error occurred. Please try again',
	invalidUser: 'No user exists with this email',
	invalidCredentials: 'Invalid credentials. Please try again'
};

export { code, message };
