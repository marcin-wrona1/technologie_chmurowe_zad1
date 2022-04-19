require("dotenv").config();

const express = require("express");

const { check: check_env, get: get_env } = require("./env.js");
const { getDateString, getTimezone } = require("./date.js");

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
