const env_vars = require("./constants/env/vars.json"),
    validators = require("./constants/env/validators.js")
;

let checked = false;

const check = () => {
	for (const [var_name, var_description] of Object.entries(env_vars)) {
		if (!process.env[var_name]) {
			throw new Error(`${var_description} - nie zostało ustawione! Dodaj ${var_name} w '.env'`);
        }
    }

    let err;
	for (const [var_name, validator] of Object.entries(validators)) {
		if (err = validator()) {
            if (typeof err === "string") {
                console.error("env/validator:", err);
            }
            throw new Error(`${env_vars[env_var]} - nie przeszło walidacji! Sprawdź ${var_name} w '.env'`);
        }
    }

    checked = true;
};

const real_get = (var_name) => (
    Object.keys(env_vars).includes(var_name) ? (
        process.env[var_name]
    ) : (
        (
            () => {
                throw new Error(`Próba użycia niesprawdzonej zmiennej środowiskowej - ${var_name}`);
            }
        )()
    )
);

const get = (var_name) => {
    if (!checked)
        check_env();

    return real_get(var_name);
}

module.exports =  {
    check,
    get
};
