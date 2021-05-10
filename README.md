# Shoppies by Shopify

---

## Project

**About**:
A webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for
nomination. When they've selected 5 nominees they should be notified they're finished.

**Goals**:

- Search OMDB and display the results (movies only)
- Add a movie from the search results to our nomination list
- View the list of films already nominated
- Remove a nominee from the nomination list

## Tech Stack

- React.js
- Material UI

## Implementation

The decision was made to build the app with React + Material UI. It is a single page app (SPA) so it has no actual navigation,
but in case such would be in demand - a React Router would be chosen. API calls are performed in async functions and utilized by Axios library. OMDB API key was not put into .env file as it is not considered to be sensitive data. Major implementation parts are as following:

**Folder Structure**:
Major folders are:
**/actions** - holding action types and functions;
**/components** - with desktop and mobile components separated;
**/context** - storing 2 separate contexts;
**/img** - storing images;
**/pages** - holding Landing page;
**/reducers** - an actual reducer;
**/themes** - Material UI custom theme;

**State management**:
State managed with React Hooks, in particulat with Context and useReducer. Context separated into 2 separate contexts: 1)API calls and corresponding loading states/errors handling. This context is fully managed by useReducer and dispatch function; 2)UX and other user actions context. Some components are managed locally via useState and useEffect and do not require their state(s) in any other components.

    Nominated movies are as well stored in localStorage so if the page is closed - all the movies nominated previously are kept and will be shown during next page visit.

**Design**:
While prioritizing UX, some UI design was also added. Initial design:
![Initial_Design](https://cdn.glitch.com/4a049e39-a1a0-4bed-b731-e02f4eeb241d%2FDesign1.jpg?v=1620612023611)

    It was decided to change the layout and also add mobile layout. Insipiration taken from: [Imdb](https://imdb.com/), [Nextflix](https://www.netflix.com/), [Kinopoisk.ru](https://www.kinopoisk.ru/) and from [Pinterest User](https://pinterest.com/ksioks/), especial with this design:
    ![Pinterest_Design](https://i.pinimg.com/originals/f9/9c/4b/f99c4bbd6a6121d20732c958836b46c9.jpg)

    Currently application looks like this:
    ![Updated_Design](https://cdn.glitch.com/4a049e39-a1a0-4bed-b731-e02f4eeb241d%2FDesign2.jpg?v=1620612804128)

**Mobile**
Mobile Layout was added and is handled by Material UI built in screen size points and custom components for mobile view.
![Design_Mobile](https://cdn.glitch.com/4a049e39-a1a0-4bed-b731-e02f4eeb241d%2FDesign3.jpg?v=1620612973394)

**Challanges & Solutions**
Since there is no "Search" button, an API call should be done when user inputs a movie title. setTimeout was used to control function call for 2 reasons: 1)to prevent calling dispatch too often (basically at every new letter user types); 2) to prevent API call spaming Omdb resource.

    Movie databases are very often updated (e.g. if we type "Harry Potter" in search bar every hour, it is highly likely that it will give us same results every time). So cache was implemented with React-query. Cache is set for 5 minutes.

## Highlights

- On mobile view a navigation bar is located at the bottom for easier navigation. Plus a badge pops up every time new movie is nominated
- Search bar on mobile view is positioned as "sticky" so it is always in view and user doesn't have to scroll al the way up.
- On desktop version movies upload automatically on scroll event with native JS.
- Small and simple logo was created in Figma.

## Run locally

```sh
$ git clone https://github.com/ruslan-akhm/shoppies.git
$ cd shoppies
$ npm install
$ npm start
```
