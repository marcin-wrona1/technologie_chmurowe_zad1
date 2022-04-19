import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { check as check_env, get as get_env } from "./env.js";
import { getDateString, getTimezone } from "./date.js";

check_env();

const PORT = get_env("EXPRESS_PORT"),
	AUTHOR = get_env("AUTHOR")
;

const app = express();

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
