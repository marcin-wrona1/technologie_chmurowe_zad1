# Zadanie 1

## Punkt 3.
Zakładamy, że wszystkie polecenia zostaną wywołane w katalogu głównym repozytorium, np.
```sh
[/tmp]:$ git clone https://github.com/[...].git repo
Cloning into 'repo'...
remote: Enumerating objects: 107, done.
remote: Counting objects: 100% (21/21), done.
remote: Compressing objects: 100% (19/19), done.
remote: Total 107 (delta 10), reused 1 (delta 1), pack-reused 86
Receiving objects: 100% (107/107), 55.61 KiB | 6.18 MiB/s, done.
Resolving deltas: 100% (35/35), done.
[/tmp]:$ cd repo
[repo]:$ ls
Dockerfile
packege.json
zadanie1.md
[...]
```
a. Budujemy obraz, przydzielając mu nazwę tagu `tc-lab-zad1`:
```sh
[repo]:$ docker build -t tc-lab-zad1 .
```
b. Tworzymy kontener; od razu podajemy port do przekierowania, aby Docker go zapamiętał - dzięki temu nie musimy go podawać przy uruchamianiu. Przydzielamy nazwę kontenera `tc-lab-zad1-c1`. Podajemy nazwę taga z poprzedniego kroku (`tc-lab-zad1`):
```sh
[repo]:$ docker create -p 8080:80 --name tc-lab-zad1-c1 tc-lab-zad1
```
c. Używamy polecenia `docker logs` i nazwy (lub ID) kontenera - z poprzedniego kroku (`tc-lab-zad1-c1`)

```sh
[repo]:$ docker logs tc-lab-zad1-c1

> tc-lab-zad1@1.0.0 start
> node main.js

(node:20) ExperimentalWarning: Importing JSON modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Serwer uruchomiony

Laboratorium Technologie chmurowe - zadanie 1
Data uruchomienia: 2022-04-24 13:18:11.331 GMT+0000
Autor: Marcin Wrona
Port: 80
[repo]:$
```

Możemy również skorzystać z graficznego interfejsu, jeśli jest on dostępny w wersji oprogramowania Docker na używanym systemie operacyjnym. Np. na macOS:
![Zrzut ekranu - graficzny Docker na macOS - lista kontenerów](./Docs/images/docker_macos_gui_container_list.png)

Wybieramy kontener z listy i sprawdzamy zakładkę `LOGS`:
![Zrzut ekranu - graficzny Docker na macOS - logi kontenera](./Docs/images/docker_macos_gui_container_log.png)

d. Korzystamy z polecenia `docker history`, podajemy nazwę tagu z kroku `a.` - `tc-lab-zad1`:
```sh
[repo]:$ docker history tc-lab-zad1
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
eec15a0107b3   41 minutes ago   CMD ["start"]                                   0B        buildkit.dockerfile.v0
<missing>      41 minutes ago   ENTRYPOINT ["npm"]                              0B        buildkit.dockerfile.v0
<missing>      41 minutes ago   EXPOSE map[80/tcp:{}]                           0B        buildkit.dockerfile.v0
<missing>      41 minutes ago   ENV EXPRESS_PORT=80                             0B        buildkit.dockerfile.v0
<missing>      41 minutes ago   ENV AUTHOR=Marcin Wrona                         0B        buildkit.dockerfile.v0
<missing>      41 minutes ago   ENV NODE_ENV=production                         0B        buildkit.dockerfile.v0
<missing>      41 minutes ago   RUN /bin/sh -c npm install --production # bu…   206MB     buildkit.dockerfile.v0
<missing>      41 minutes ago   COPY . . # buildkit                             454kB     buildkit.dockerfile.v0
<missing>      51 minutes ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      3 days ago       /bin/sh -c #(nop)  CMD ["node"]                 0B
<missing>      3 days ago       /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B
<missing>      3 days ago       /bin/sh -c #(nop) COPY file:4d192565a7220e13…   388B
<missing>      3 days ago       /bin/sh -c set -ex   && for key in     6A010…   7.6MB
<missing>      3 days ago       /bin/sh -c #(nop)  ENV YARN_VERSION=1.22.18     0B
<missing>      3 days ago       /bin/sh -c ARCH= && dpkgArch="$(dpkg --print…   153MB
<missing>      3 days ago       /bin/sh -c #(nop)  ENV NODE_VERSION=18.0.0      0B
<missing>      4 days ago       /bin/sh -c groupadd --gid 1000 node   && use…   334kB
<missing>      4 days ago       /bin/sh -c set -ex;  apt-get update;  apt-ge…   529MB
<missing>      4 days ago       /bin/sh -c apt-get update && apt-get install…   152MB
<missing>      4 days ago       /bin/sh -c set -ex;  if ! command -v gpg > /…   19MB
<missing>      4 days ago       /bin/sh -c set -eux;  apt-get update;  apt-g…   10.7MB
<missing>      4 days ago       /bin/sh -c #(nop)  CMD ["bash"]                 0B
<missing>      4 days ago       /bin/sh -c #(nop) ADD file:3a81c181c66f226bd…   124MB
[repo]:$
```
