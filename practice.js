const characters = [
  {
    title: "Ninja",
    emoji: "🥷",
    powers: ["agility", "stealth", "aggression"],
  },
  {
    title: "Sorcerer",
    emoji: "🧙",
    powers: ["magic", "invisibility", "necromancy"],
  },
  {
    title: "Ogre",
    emoji: "👹",
    powers: ["power", "stamina", "shapeshifting"],
  },
  {
    title: "Unicorn",
    emoji: "🦄",
    powers: ["flight", "power", "purity"],
  },
]

// for (let character of characters){
//     console.log(character)
// }

characters.forEach(function (character) {
  console.log(character)
})

const totalCharacters = characters.map(function (character) {
  console.log(character)
  return character
})

console.log(totalCharacters)
