/**
 * Edit passwords and letter text here.
 * Passwords are checked in the browser only (fine for a personal surprise site).
 */
const SITE_CONFIG = {
  passwords: {
    1: "sweetumardal",
    2: "date",
    3: "surprise",
  },

  /** Page 1 — letter revealed when the envelope is opened */
  letterPage1: `Hi myyy Sweeeetuuuu mardall🥹🥹🤭

I really reallyy wanted to come to hyd this weekend….kaaaniii kudarleduuu raa😭😭😭😭

 Andukee ordered thiss small gift for  youu……hope you like it🥹🥹🤞🤞

Kalavaalanii undiii ra😭😭😭 

I misss youuuu soooo muchh😭😭😭😭`,

  /** Page 2 — letter in the envelope */
  letterPage2: `Wanna spend thiss weekend together???🥹🥹🥹

Sweeeeetuuuuluuuu……Even before u asked to plan a date…I planned to come raa🥹🥹🤭🤭🤭

I actuallyyyy mean the song I sang for youu🤭🤭 — Kaaki tho kaburu pampina kaadanakundaa vachii vaalanaa —

Vaalipoya raa😩😩😩🤭🤭

I lovee youuuu soooo muchh 🥹🥹🥹😭😭😭😭❤️❤️`,

  /** Page 3 — guessing game (answer unlocks the envelope) */
  guessChapter3: {
    riddle:
      "Guess where we would be going tomorrow!! If you guess it correctly, then you can choose whether or not to go. If you cannot, sorry you dont have an option :( ",
    answer: "wonderla",
    hints: [
      "You liked reels about it",
      "You mentioned u wanted to go there from a long time",
      "We even thought of going there sometime",
    ],
    wrongMessage: "Not quite — take another guess, detective.",
    successMessage: "You guessed it! Your surprise is waiting below.",
  },

  /** Page 3 — letter in the envelope */
  letterPage3: `Yayyyyy!!!

I wanted to go to wonderla with youuu so I booked the tickets🥹🥹🤭🤭🫣 excited?? 👀👀`,

  pageTitles: {
    1: "A Morning For You",
    2: "Next??",
    3: "The Final Surprise",
  },

  /** /date — letter in the envelope (edit when you have the words) */
  letterDate: `Date ki veldam ankunnam kadaaaaa.....wanted to ask you like this😩😩😩🤭🤭🤭

          You remember you liked a reel? 
           - Dressed up in heels
           - Flowers in hand
           - Reservations already made
           - Icecream at the end (nen kudaaa thintaaaa😌😌😌)

          Idk...wanted to go this friday before our engagement......Lesss gooo ??? 🥹🥹🥹

          Rareism frock veskoo🥹🤭🤭`,
};
