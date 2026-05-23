# invitation

A cute, romantic static site — three sequential chapters, each behind a secret word.

## Local preview

```bash
cd /Users/akhil.kumar/personal
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080)

## Edit content & passwords

All copy and passwords live in **`js/config.js`**:

- `passwords` — secret word for each chapter (`1`, `2`, `3`)
- `letterPage1`, `letterPage2`, `letterPage3` — letter text for each envelope
- `guessChapter3` — riddle, `answer`, `hints`, and messages for chapter 3

Default passwords (change these):

| Chapter | Default password |
|---------|------------------|
| 1 | `sunrise` |
| 2 | `chapter-two` |
| 3 | `chapter-three` |

## GitHub Pages

1. Push this repo to `akhilkumar-sys/invitation` on GitHub.
2. Repo **Settings → Pages → Build and deployment**
3. Source: **Deploy from a branch**
4. Branch: `main` · Folder: **`/ (root)`**
5. Save. Site URL: `https://akhilkumar-sys.github.io/invitation/`

## Structure

```
index.html          → landing
unlock.html?p=1|2|3 → password gate per chapter
pages/morning.html  → chapter 1 (sunrise garden + envelope)
pages/chapter-2.html → chapter 2 (romantic evening + envelope)
pages/chapter-3.html → chapter 3 (guess game + envelope surprise)
js/config.js        → letters, `guessChapter3` (riddle/answer), passwords
css/main.css
```

Chapters must be opened in order; each gate checks the password for that chapter only.
