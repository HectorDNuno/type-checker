### Type-Checkr-App
![project screenshot](https://github.com/HectorDNuno/type-checker/blob/main/public/project-screenshot.png?raw=true)

## Description

Welcome trainer! This app is actually the same project as my [Pokémon-Types-App](https://github.com/HectorDNuno/pokemon-types-app) except I built this app using React and without a Ruby backend. The purpose of this app is the same as the previous one: to be a reference tool for the video game Pokémon. There's a big UI difference with this version as opposed to the Vue version. I made it simpler to navigate, and it's overall more organized. I still use the [PokéAPI](https://pokeapi.co/) for the defense, offense, and moves with type sections. As for the pokémon with type section, I decided to use a JSON file instead. I did this just to make that section load the quickest on the page. The PokéAPI is great but getting all the data I needed for the pokémon section took several HTTP requests which made it load slowly on the page. I got the JSON file with every pokémon from an open source project that you can check out here: [pkmn.help](https://github.com/wavebeem/pkmn.help). I was inspired to match the type names to their colors from that same project as well.

One of the biggest challenges I had was positioning everything on the page. I was having issues with the sidebar and the content to the right of it. Lukcily, the position property solved most of my problems. Another challenge was getting the type names in the defense/offense section to have their background color. Like I said previously, I got this idea from the pkmn.help project. The issue was that the types in the sidebar come from a local file but the types in the defense/offense sections come from the PokéAPI. The way I impleneted it was pretty simple. I already had a file that contained the colors of each type, so I matched the data in my file with the data I was receiving from the API. By using a good old .some() method I was able to match everything up perfectly and return a div with the correct background color.

For the most part, this project is complete. Other than some more styling, this project fufills its intended purpose. I would like to be able to load the sections that use the API quicker, or at least add some placeholder while the components wait to receive the data. I'd also like to find a way to deal with pokémon enteries that don't have an image. Adding a Pokédex section would be cool but that's outside of the project's scope.

That's all trainer!

### Dependencies

Axios

```
$ npm install axios
```
