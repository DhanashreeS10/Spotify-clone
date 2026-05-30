import card1 from "../assets/card1img.jpeg";
import card2 from "../assets/card2img.jpeg";
import card3 from "../assets/card3img.jpeg";
import card4 from "../assets/card4img.jpeg";
import raja from "./songs/Raja shivaji anthem by Ajay atul.mpeg";
import bairan from "./songs/Bairan by sumit and anuj.mpeg";
import cruelSummer from "./songs/Cruel summer by Taylor swift.mpeg";
import faded from "./songs/Faded by alan Walker.mpeg";

const songs = [
  {
    id: 1,
    title: "Raja Shivaji Anthem",
    artist: "Ajay Atul",
    info: "Most played songs",
    image: card1,
    audio: raja,
  },

  {
    id: 2,
    title: "Bairan",
    artist: "sumit and anuj",
    info: "Trending songs",
    image: card2,
    audio: bairan,
  },
  {
    id: 3,
    title: "cruel summer",
    artist: "Taylor Swift",
    info: "Latest tracks",
    image: card3,
    audio: cruelSummer,
  },
  {
    id: 4,
    title: "Faded",
    artist: "Alan Walker",
    info: "Relaxing tunes",
    image: card4,
    audio: faded,
  },
];

export default songs;
