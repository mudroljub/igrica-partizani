[![](screen.png)](https://mudroljub.github.io/igrica-partizani/)

# Igrica partizani

Male igrice o Nemcima i partizanima.

Razvojna verzija je ovde: [mudroljub.github.io/igrica-partizani](https://mudroljub.github.io/igrica-partizani/)

## Instalacija

Prvo instaliraj [node.js](https://nodejs.org), noviju verziju. Nakon toga kloniraj repo i instaliraj zavisnosti:

```
npm install
git submodule init
git submodule update
```

Da pokreneš igru u razvojnom modu ukucaj:
```
npm start
```

Browser će se automatski osvežavati svaki put kada sačuvaš izmenu.

P.S. ako izbacuje grešku proveri jel već pokrenut webpack-dev-server.

## TODO:

- zameni tipke sa keyboard
- BUG: nekad ne učita slike
    - da prvo učita sve slike pre nego što scena krene
- BUG: pojavljuje se vertikalni skrol na rovovima, videti i drugde
- prebaciti Input manager iz create 3D worlds
- otkriti zašto Zgrada neće da koristi prirodnu veličinu slike?
- prebaciti engine u src?
- na esc napuštati nivo
- refaktor Pozadina da nasleđuje Slika, ne Predmet

### Faza 1: refaktor i sredjivanje
- Avionce: promeniti zvuk motora
- spojiti ranjenike
- preimenovati u ranjenici na sutjesci
- spojiti tenkic dva igraca i tenkic protiv kompa, jedina razlika je mrdaNasumicno
- spojiti 2d-odozgo/Oblak i 2d-bocno/Oblak?
- spojiti savo-dan i savo-noc
- TenkBocnoIgrac: odvojiti klasu Granata
- TenkOdozgo: spojiti sa TenkIgracOdozgo
- camac: popraviti odbijanje
- da svi ispaljuju više projektila (radi na Avionce.js)
- Humel: dodati sliku gori

### Faza 3: 3D
- dodati predmetima z osu (default 0)
- spojiti predmete razlicitih perpsektiva u jedan predmet (bocno, odozgo, prvolice..) sa više prikaza
- srediti 3D koliziju
- napraviti jednu mapu sa tri prikaza
