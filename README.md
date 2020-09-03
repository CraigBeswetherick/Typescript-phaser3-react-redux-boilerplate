This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs all dependencies required to run the project and populates a node_modules folder. Packages used can be found in package.json

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## The Problem

This project aims to emulate the successful game Adventure Capatalist. The game itself is a simulation of running multiple businesses, and can be played on many devices.

Adventure Capatalist allows players to purchase businesses, earn capital and hire managers. On top of this, players can continue to earn money while away from the game which will automatically be applied to their account.

This game follows many of the concepts mentioned in, yet does omit some of them due to time constraints. However, the core concepts have been explored.

## The Solution

The game provided here has several functions that mimic what can be found in Adventure Capatalist. This project only focuses on the front end development however there have been considerations for the backend. These features are mentioned below:

### Buying a business

Users are able to purchase a business using the funds they have availible. The businesses they buy earn a set amount of money each week, deposited on Fridays. A business can also be upgraded for a fee, which increases the amount of money generated each week. Up to 6 businesses can be purchased.

### Buying a Manager

Players are also able to purchase a manager to help run their business empire. Unfortunatly there was not enough time to fully implement this feature. Users will have to purchase at least 1 business before they can purchase a manager, which should increase the output of the selected business. Due to time constraints this feature was not implemented fully and users can only purchase a manager, their output is not implemented and they cannot be applied to a business.

### Earning Money

As previously stated, players earn money over time due to the amount of businesses they own. Money is deposited every Friday into the players account. Upgrading a business will increase the funds availible.

## Technical Considerations

The project has been developed using Create React App, Phaser, and Redux. Redux was used as a central repository to track player progress, and reducers have been implemented to control the application of values and act on events created by the user. Redux was also chosen due to the ability for future integration with a server - it could easily be swapped out for many different options such as a NodeJS API with a Mongo backend, or Firebase storage.

Phaser was chosen as it is a game development framework support by Facebook and contains an extensive API making integration with Facebook easier. Scenes have been implemented to enable the display of screens the user needs to use, as well as other features such as particle physics.

Create-React-App was chosen due to features such as code splitting, minifictation, and being able to bind values from Redux to the DOM. This is important to reduce draw calls, which can hamper performance. Player information such as the current date and funds are rendered in the DOM to reduce the amount of work the GPU has to do each frame.

In terms of scaling, the project only supports a landscape view. Custom scaling was implemented to ensure the project renders well on mobile, tablet and desktop and a rotate overlay was added to make sure the game is only played in this orientation.

Texture Atlases have been used to improve GPU rendering speed and improve loading times by reducing HTTP requests for assets. The .tps file is included in the project.

## Code Guidelines

To ensure a quality codebase, features such as Prettier have been added to ensure linting is done upon every save. This will be applied automatically if a developer uses the Prettier plugin with a IDE such as VSCode.

## Problems and Issues

Due to time constraints focus was plased on the front end. Firebase was explored due to the ability to easily created timed functions to enable gameplay when the player was not at their computer, load balancing, real time database and API deployment. This could then be integrated with a Facebook release.

Managers being assigned to a business was also omitted for time constraint reasons.

Generally the code base is stable, managable and runs fast. The worst part would be the rotate overlay. This should have been written as a DOM element running above the game rather than being implemented on a scene by scene basis.

## Future steps

To improve this game in future, there are several opportunities. Apart from the previously mentioned issues, features such as natural disasters could be added, as well as balancing the values already included. Staff members could become unhappy and require higher wages, suppliers could become disgruntled and consumer opinion could be affected. Additionaly, instructions and advice popups as these events happen could guide the player to make good desicions to solve them.
