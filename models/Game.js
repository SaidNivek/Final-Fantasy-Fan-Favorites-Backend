const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Games must be named"]
      },
        logo: {
            type: String,
            required: [true, "Games must have an image"]
        },
        summary: {
            type: String,
            required: [true, "Games must have a summary"]
        },
        likes: {
            type: number,
            default: 0
          },
        release_system: {
            type: String,
            required: [true, "Games must have a release system"]
        },
        release_date: {
            type: String,
            required: [true, "Games must have a release date"]
          },
        heroes: {
            type: Array,
            name: ["array of hero names"], // If doing stretch, will need to update this to hero objects
            required: [true, "Games must have heroes"]
            },
        villains: {
            type: Array,
            name: ["array of villain names"],
            required: [true, "Games must have villains"]
              }
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;