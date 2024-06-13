# MARVEL COMICS REACTJS WEB APP

### START THE PROJECT ON LOCALHOST:
- Install Axios for making HTTP requests and React Router for handling routing:
    npm install axios react-router-dom md5
- Run the application: npm start

## TASK:
1. Instantiate a new React project and push it to a github repo
2. Use the Marvel API https://developer.marvel.com/ to get a list of comics and display them on page, cards with at least an image, title and description (you need to create account and obtain API Key)
3. Details route - When you click on a card it should take you to a new route with that cards details
4. Add search functionality
5. Add pagination, go to next or previous page
6. Deploy it
- Website should be responsive, cover mobile, tablet, laptop
- You can use all the tools available and libraries

## MARVEL DEVELOPER PORTAL:
- go to My developer account to fetch private and public api keys
- go to Your authorized referrers. List any domains that can make calls to the Marvel Comics API using your API key here: localhost, IP address, *, developer.marvel.com, localhost
- click: UPDATE

## HOW TO INITIATE PROJECT:
1) open terminal and change directory to location where you want your project to be positioned
2) ensure you have Node.js and npm installed on your system.
3) Create a new React project using create-react-app:
      npx create-react-app marvel-comics
      cd marvel-comics
4) Install Axios for HTTP Requests:
      npm install axios
5) Create Environment Variables: Create a .env file in the root of your project to store your Marvel API keys securely. Also, don't forget to add .env file to .gitignore file (you want to keep your private key private!)
      REACT_APP_MARVEL_PUBLIC_KEY=your_public_key
      REACT_APP_MARVEL_PRIVATE_KEY=your_private_key
6) Create a Utility File for Hashing:
First, you need to install the md5 library, which will help us generate the required hash.
      npm install md5

Marvel API requires a hash to authenticate requests, which includes a timestamp, private key, and public key. Create a utils directory with a hash.js file:

      // src/utils/hash.js
      import md5 from 'md5';
      
      export const getMarvelHash = (ts, privateKey, publicKey) => {
        return md5(ts + privateKey + publicKey);
      };

7) Create the main component: src/App.js
   
   Also, add css for styling: src/App.css

8)  If you haven't already, install React Router, which is a popular routing library for React applications: npm install react-router-dom

9) START YOUR REACT APPLICATION BY RUNNING FOLLOWING COMMANDS:
     - npm install
     - npm start //this command opens project on localhost


____________________________________________________________________________
       
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

