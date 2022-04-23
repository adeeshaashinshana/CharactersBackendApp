class Logger {
	static info(...args) {
		console.log(args);
	}

	static error(...args) {
		console.error(args);
	}
}

module.exports = Logger;
