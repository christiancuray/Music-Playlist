/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       CHRISTIAN DARYL CURAY
 *      Student ID: 122375231
 *      Date:       MARCH 23, 2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

//Initial Display
createSongCard(artists[0]);

function createSongCard(artist) {
  // section in the html where the songs will be displayed
  let container = document.querySelector(".container");
  let selectedArtist = document.querySelector("#selected-artist");

  //clears the table for music and the selected artist
  container.innerHTML = "";
  selectedArtist.innerHTML = "";

  //dynamic display for selected artist and social accounts.
  let header = document.createElement("h2");
  let artName = document.createTextNode(artist.name + " ");
  header.appendChild(artName);

  //dynamic display for social accounts.
  artist.urls.forEach((link) => {
    let tag = document.createElement("a");
    tag.href = link.url;
    tag.target = "_blank";
    let siteName = document.createTextNode(link.name + ",  ");

    tag.appendChild(siteName);
    header.appendChild(tag);
  });
  //return to the caller the selected artist
  selectedArtist.appendChild(header);

  ///filter to show songs that belong to the selected artist
  const allSongs = songs.filter((song) => song.artistId.includes(artist.artistId));
  //filter the songs to show only the songs that are not explicit
  const notFlaggedSongs = allSongs.filter((song) => !song.explicit);

  //loop through the songs and display them in the table
  notFlaggedSongs.forEach((song) => {
    const elem = document.createElement("div");
    // Add the .card class to the <div>
    elem.classList.add("card");

    // Create a song image, use the .card-image class
    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    elem.appendChild(songImg);

    const insideDiv = document.createElement("div");
    insideDiv.classList.add("info");
    const title = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = song.url;
    titleLink.target = "_blank";
    titleLink.textContent = song.title;
    title.appendChild(titleLink);

    let minutes = parseInt(song.duration / 60); // compute minutes
    let seconds = parseInt(song.duration % 60); // compute seconds
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    let duration = document.createTextNode(minutes + ":" + seconds);
    const year = document.createElement("p");
    year.textContent = song.year;

    insideDiv.appendChild(title);
    insideDiv.appendChild(duration);
    insideDiv.appendChild(year);
    elem.appendChild(insideDiv);

    // Return the card’s <div> element to the caller
    container.appendChild(elem);

    elem.addEventListener("click", function () {
      console.log(song.title);
      //open the link in a new tab
      window.open(song.url, "_blank");
    });
  });
}

// Displaying Artist names on menu
function ArtistMenu() {
  let menu = document.querySelector("#menu");

  artists.forEach((artist) => {
    let btn = document.createElement("button");
    let text = document.createTextNode(artist.name);
    btn.appendChild(text);
    menu.appendChild(btn);
    btn.addEventListener("click", function () {
      createSongCard(artist);
    });
  });
}

document.addEventListener("DOMContentLoaded", ArtistMenu);
