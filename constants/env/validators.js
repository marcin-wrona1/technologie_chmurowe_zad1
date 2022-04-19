const validators = {
	"EXPRESS_PORT": () => (
		// musi być liczbą
		isNaN(process.env["EXPRESS_PORT"]) ? (
			"Port musi być liczbą"
		) : (
			false
		)
	)
};

export default validators;
