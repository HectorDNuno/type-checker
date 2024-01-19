# Type-Checkr-App

Welcome trainer! The purpose of this web app is to check which Pokémon belong to which one of the 18 types in the game. 

## Motivation
I wanted to build a quick and easy reference tool to see how many Pokémon there are in a given type. For example, I wanted to know how many Pokémon there are in the fire type, what their names are, and what they look like, without having to scroll through a heap of other information. Other websites do this, but they also have a lot more info I don't care about.

## Challenges
Two of the biggest challenges I had were positioning everything on the page and using the [PokéAPI](https://pokeapi.co/). I was having issues with the sidebar and the content to the right of it. Luckily, the position property solved most of my problems. The API I used, [PokéAPI](https://pokeapi.co/), is heavily nested, so I had to make several back-to-back calls to get the information I needed. 

You can check out my project [here](https://type-checkr-react.netlify.app/)!

### Dependencies

Axios

```
$ npm install axios
```

### Screenshot

![project screenshot](https://github.com/HectorDNuno/type-checker/blob/main/src/assets/project-screenshot.png?raw=true)
