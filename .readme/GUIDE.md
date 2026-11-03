# Guide du README Seonay Studio

Chaque site client a le même README : un document que le client peut lire, et qui permet à n’importe quel développeur de reprendre le projet. Références : `cafe-bouture` et `coiffure-jodet`.

## Utiliser le modèle

**Nouveau dépôt**

```sh
gh repo create Seonay-STUDIO/nom-du-projet --private --template Seonay-STUDIO/readme-template --clone
```

Sur GitHub, c’est le menu « Repository template » au moment de créer le dépôt.

**Dépôt existant**

```sh
gh repo clone Seonay-STUDIO/readme-template /tmp/readme-template
cp -r /tmp/readme-template/.readme .
cp /tmp/readme-template/README.md README.md   # écrase l’ancien README : le relire avant
```

Ensuite :

1. Remplir chaque `{{…}}`. Ce qui reste : `grep -n "{{" README.md`.
2. Générer les images (voir [Les images](#les-images)).
3. Supprimer le bloc « Modèle de README » tout en haut.
4. Relire avec la [liste de vérification](#liste-de-vérification).

## Le ton

- **En français**, avec la typographie française : apostrophe courbe `’`, guillemets « », espace avant `:` `;` `?` `!`.
- **Phrases courtes, voix active.** « La page s’ouvre sur la salle du café », pas « Une ouverture sur la salle est proposée ».
- **Décrire ce que voit le visiteur**, pas l’implémentation. « Les feuilles s’écartent à l’ouverture », pas « animation GSAP sur `.leaf` ». Le nom des fichiers vient après, dans un lien.
- **Uniquement ce qui est vrai.** Chaque affirmation se vérifie dans le code : pas de « 100 % accessible », pas de chiffre inventé. Les poids viennent d’un build, les fonctions d’accessibilité d’une lecture du code.
- **Les mots du lieu.** Reprendre son vocabulaire (« la serre », « le salon », « la carte ») et son accroche à lui.
- Pas d’emoji dans les titres, pas de titres en majuscules, pas de « → » ajouté aux liens.

## Les sections

| Section | Ce qu’elle doit contenir |
| --- | --- |
| En-tête | Logo, nom, accroche en gras, une ligne de description avec l’adresse, badges de la stack réelle, liens site · Instagram · Seonay Studio |
| Capture d’accueil | L’accueil tel qu’il apparaît, en 1600 px |
| L’idée | Ce qu’est le lieu, puis l’intention du site en une image forte en gras. Palette avec le rôle de chaque couleur, typographie avec la raison du choix |
| Le parcours | Une ligne par section dans l’ordre de la page : contenu et mouvement. Galerie de 4 ou 6 captures, pied de page, assemblage mobile |
| Les détails qui comptent | 4 à 7 paragraphes, du plus propre au lieu au plus général (accessible, référencement, sobre) |
| Démarrer | Version de Node, commandes avec un commentaire chacune, variables d’environnement s’il y en a |
| Structure du projet | Arborescence courte, uniquement les fichiers utiles, avec leur rôle |
| Personnaliser | Les textes, **tous** les endroits où sont écrits les horaires, puis ce qui est propre au projet, avec un exemple de code |
| Référencement | Tableau élément / rôle, avec les vraies valeurs (titre exact, domaine) |
| Mise en ligne | Hébergeur conseillé, et si le site est statique ou demande un serveur |
| Avant la mise en ligne | Cases à cocher : contenus à valider, incohérences repérées, domaine, Google Business Profile, Search Console |
| Crédits | Seonay Studio, le client, polices et librairies avec leur licence |

Une section qui ne s’applique pas (pas de carte, pas d’horaires) s’enlève, avec sa ligne dans le sommaire.

## Les badges

- Fond : la couleur principale de la marque, en hex sans `#`.
- `logoColor` : la couleur claire de la marque.
- Le badge `cookies-aucun` prend une couleur d’accent : vert si c’est vrai, sinon on l’enlève.
- Logos : [simpleicons.org](https://simpleicons.org). Espaces en `%20`, accents encodés (`é` = `%C3%A9`).

## Les images

Tout va dans `docs/` : captures en WebP, palette en SVG. Deux scripts les produisent à partir du site qui tourne en local.

**Une fois par machine**

```sh
npm i -D playwright sharp
npx playwright install chromium
```

**À chaque mise à jour**

1. Copier `.readme/config.example.json` en `.readme/config.json` et l’adapter : adresse locale, sections à capturer, écrans mobiles, couleurs de la palette.
2. Lancer le site (`npm run dev`, ou mieux le build de production).
3. Générer :
   ```sh
   node .readme/captures.mjs    # docs/apercu-*.webp
   node .readme/palette.mjs     # docs/palette.svg
   ```
4. Ouvrir chaque image pour vérifier le cadrage : titre caché par l’en-tête, animation pas finie, carte pas chargée… Ajuster `offset` ou `wait` et relancer.

Réglages utiles dans `config.json` :

| Clé | Effet |
| --- | --- |
| `headerOffset` | Hauteur de l’en-tête collant : le haut de chaque section est placé juste dessous |
| `sections[].offset` | Décalage en pixels après le haut de la section (positif = plus bas) |
| `sections[].wait` | Temps laissé aux animations avant la capture, en millisecondes |
| `mobile.screens[]` | Un écran par entrée : `selector` pour y défiler, `click` pour ouvrir un menu avant la capture |
| `palette.colors[]` | Nom affiché et variable CSS (`--brand`) ou valeur hex directe |

Les textes alternatifs décrivent ce qu’on voit (« Les plantes : planches d’herbier encadrées de colonnes couvertes de lierre »), jamais « capture d’écran ».

## Liste de vérification

- [ ] Plus aucun `{{` dans le README, plus de bloc « Modèle de README ».
- [ ] Toutes les images de `docs/` existent et s’affichent sur GitHub.
- [ ] Les liens vers les fichiers (`src/…`) pointent vers des fichiers qui existent.
- [ ] Les badges correspondent au `package.json`.
- [ ] Les horaires, l’adresse et le téléphone sont les mêmes que sur le site.
- [ ] Chaque affirmation des « détails qui comptent » a été vérifiée dans le code.
- [ ] La section « Avant la mise en ligne » liste les vraies incohérences repérées en écrivant.
