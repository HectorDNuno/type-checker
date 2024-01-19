# Type-Checkr-App

Welcome trainer! The purpose of this web app is to check which Pokémon belong to which one of the 18 types in the game. 

## Motivation
I wanted to make a web app that let me see which Pokémon had the electric type or which Pokémon had the water type in the video game Pokémon. Other websites do this, but they also have a lot more info I don't care about. I just wanted a quick and simple reference tool to see how many fire types there are, what their names are, and what they look like, without having to scroll through a heap of other information.

## Challenges
Two of the biggest challenges I had were positioning everything on the page and using the [PokéAPI](https://pokeapi.co/). I was having issues with the sidebar and the content to the right of it. Luckily, the position property solved most of my problems. The API I used, [PokéAPI](https://pokeapi.co/), is heavily nested, so I had to make several back-to-back calls to get the information I needed. Another challenge was getting the type names in the defense/offense section to have their background color. The issue was that the types in the sidebar come from a local file but the types in the defense/offense sections come from the PokéAPI. The way I implemented it was pretty simple. I already had a file containing the colors of each type, so I matched the data in my file with the data I received from the API. By using a good old .some() method I was able to match everything up perfectly and return a div with the correct background color.

For the most part, this project is complete. Other than some more styling, this project fulfills its intended purpose. I would like to be able to load the sections that use the API quicker, or at least add some placeholder while the components wait to receive the data. I'd also like to find a way to deal with pokémon entries that don't have an image. Adding a Pokédex section would be cool but that's outside of the project's scope.

You can check out my project [here](https://type-checkr-react.netlify.app/)!

### Dependencies

Axios

```
$ npm install axios
```

### Screenshot

![project screenshot](https://github.com/HectorDNuno/type-checker/blob/main/src/assets/project-screenshot.png?raw=true)
