# syntax=docker/dockerfile:1
FROM node:latest

# katalog aplikacji w kontenerze
WORKDIR /app
# kopiujemy wszystkie pliki
# używamy pliku '.dockerignore' aby pominąć m.in. 'node_modules'
COPY . .

# instalujemy moduły
RUN npm install --production

# konfiguracja serwera - zmienne środowiskowe
ENV NODE_ENV production
ENV AUTHOR 'Marcin Wrona'
ENV EXPRESS_PORT 80

# ustawienia Docker'a - port kontenera i polecenie do uruchomienia
EXPOSE 80
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
