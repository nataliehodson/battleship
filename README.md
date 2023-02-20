# Battleship game

A Battleship game programmed during the Route to Code course in February 2023, using JavaScript, HTML, and CSS.  
To play this game, you can either go to [nataliehodson.github.io/battleship](https://nataliehodson.github.io/battleship/) to access the website, or you can download the JS, HTML, and CSS files from this repository and open up index.html in a browser to play it on your own computer.  
The game has two options, single player and two player, explained below.

## Rules of the game

Each player has a board where they place five ships without showing the other player.  
The five ships are:
- Destroyer, two cells long,
- Submarine, three cells long,
- Cruiser, three cells long,
- Battleship, four cells long,
- Carrier, five cells long.  

Then the players take turns shooting at the others ships, guessing where they are.  
The first player to sink all of their opponents ships wins.

## Single player

Play against your computer.  
Place your ships while the computer places its randomly.  
Then, shoot the computer's ships while it fires randomly at yours.

## Two player

Play against a friend.  
Each player enters their name and then places their ships.  
Then, players take turns firing at the other's ships.


## Possible improvements
- Make website responsive and pleasant to use on all devices.
- Single player - shoot on click of checkbox
- Right now, players can break the rules and shoot multiple times in one go. It would be good to make this impossible.
- In one player mode, tell player which ship they are shooting.
- In two player mode, the ships don't have different colours. Add function to detect what ships the players have placed and colour them accordingly (or not, if I want to keep it like a tradition pen and paper Battleship).
- Computer could shoot more intelligently, shooting close to where it last hit.
- Might be better suited to a React app, instead of hiding/showing divs, I could use React components.
- Create an app using React Native.
