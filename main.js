import dotenv from "dotenv";
dotenv.config();

import express from "express";
import geoip from "fast-geoip";
import clm from "country-locale-map";

import { check as check_env, get as get_env } from "./env.js";
import { getDateString, getTimezone } from "./date.js";
import { getPublicIp } from "./ip.js";

check_env();

const PORT = get_env("EXPRESS_PORT"),
	AUTHOR = get_env("AUTHOR")
;

const app = express();

app.get(
	"/",
	async (req, res) => {
		const ip = await getPublicIp(req.ip),
			{ timezone, country: country_code } = await geoip.lookup(ip),
			locale = clm.getCountryByAlpha2(country_code).default_locale.replaceAll('_', '-')
		;

		res.send(`
			<p>Twoje IP: ${ip}</p>
			<p>Twoja strefa czasowa: ${timezone}</p>
			<p>Data i godzina: ${new Date().toLocaleString(locale, { timeZone: timezone })}</p>
		`);
	}
);

app.listen(
	PORT, 
	() => {
		const [date, timezone] = (
			(
				(date) => [
					getDateString(date),
					getTimezone(date)
				]
			)(new Date())
		);

		console.log(
`Serwer uruchomiony

Laboratorium Technologie chmurowe - zadanie 1
Data uruchomienia: ${date} ${timezone}
Autor: ${AUTHOR}
Port: ${PORT}`
		);
	}
);
