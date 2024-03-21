## Bazar

### How to Seed the Database?  
- Execute `node seed.js`.

### Getting Started
- In the first terminal, run `npm run db`.
- In the second terminal, run either `npm run dev` or `npm start`.

For the `npm run db` command to work properly, ensure that MongoDB is installed and configured at **c:\mongodb\bin\mongod.exe** with the database path set to **c:\mongodb-data**.

### Požadavky

- Aplikace uživateli umožňuje založit účet a pracovat s uživatelským obsahem. Podle zvoleného tématu se pod uživatelským obsahem rozumí např. položky kalendáře, kontakty, blogové příspěvky, recenze, recepty, inzeráty, a pod.

- Aplikace obsahuje skript pro naplnění databáze ukázkovými daty.

- Uživatelský obsah může být rozdělen na veřejný a privátní, nebo je veškerý obsah pouze privátní.

- Uživatelský účet a privátní uživatelský obsah je vhodně zabezpečen.

- Aplikace umožňuje přihlášenému uživateli vykonávat CRUD operace na uživatelském obsahu.

- Veškerá data o uživatelích a uživatelském obsahu jsou uchovávána v databázi.

- Data jsou uchovávána v kolekcích podle typu, data jsou vytvářena, validována a čištěna podle modelu.

- Uživatelské rozhraní jednotlivých operací aplikace v prohlížeči je sestaveno jako dynamická webová stránka s využitím šablon.

- Přístup ke zdrojům je implementován jako architektura REST.

- Zdrojový kód je přehledný, logicky uspořádaný, vhodně organizovaný do podsložek, smysluplně okomentovaný.

- Webová aplikace je v patičce zřetelně označena jako studentský zápočtový projekt.

- Projekt ani žádná jeho část neporušuje autorská práva a je originálním a výlučným dílem odevzdávajícího studenta.

- Základní optimalizace stylování webové aplikace z hlediska responzivity a uživatelské přístupnosti.

- Použití hotových systémů designu (jako je např. Material Design) či CSS šablon je povoleno.

- Použití frontendových frameworků jako je Bootstrap, React, Vue a pod. je povoleno.

- Předpokládá se použití JavaScriptu, MongoDB, Express, ejs, Mongoose. Použití výrazně jiných technologií je vhodné konzultovat.
