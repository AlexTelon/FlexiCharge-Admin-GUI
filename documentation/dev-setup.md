
# Development setup

## Requirements
* Docker and its version should be at least 18.09 or later
* ```.env``` file in root of project

## Setting everything up
* Make sure you have Docker installed on your device
* If installed simply launch it and leave it as is. Do not do anything with it!
* Clone or fork the GitHub repository into a directory of choice on your device.
* If you decided to clone the project, clone it into your directory of choice using ```git clone```.
* Open the project in your IDE (Integrated Development Environment) of choice.
* Create a ```.env``` file in the root of the project. The ```.env``` file should contain the following information:
```
    APP_NAME=name_of_app
    REACT_APP_DEV_PORT=port_number
    REACT_APP_FLEXICHARGE_API_URL=api_url
```
* You have to get the api_url from the backend team.

* Upon successful cloning of the project, change directory to the react-app folder.
* Standing inside said folder, run ```yarn install```. Do not run ```npm install``` anywhere in the project since ```yarn install``` does this for you. This may hurt the whole project and cause problems with all the installed packages.
* After the above, run ```docker compose up --build```.
  (Note: If you are using an older version of docker you may need to run ```docker-compose up --build```).
  Note: The flag ```--build``` only needs to be present on the first time build.
* This build may take some time and you may feel like something went wrong. Be patient and wait it out.
* After you have run docker compose up ```--build``` the first time you only need to run ```docker compose up``` (or ```docker-compose``` up depending on the Docker version) henceforth.
* The Admin GUI for FlexiCharge should now be running on port ```localhost:8080```.

## For Developers
* The following is needed for the development process:
1. NodeJS stable
2. Yarn
3. Docker version 18.09 or later
4. ```.env``` file in root of project
5. Git
* Since the Admin GUI is dependent on the implementations of several other squads, its data-fetching structure is constructed in such a way that the program can fetch both ```remote data``` (dynamic data from the HTTP squad) or ```mock data``` that we created and that exist within the Admin GUI program.
* During the initial state and early development of this product many squads will not have their dynamic data and requests ready for the Admin squad. Since the Admin squad is dependent on provided requests from other squads it may be a good idea to work with mock data in order to get an idea of how the Admin GUI works.
* To swiftly ```toggle``` between mock and dynamic, visit the ```dependencyContainer.ts``` file. From there toggle between mockdata or remote.

* Note that in the initial state of the development it is most likely that the HTTP and Database squad may not have a remote server with a remote account accessible for the Admin squad. In order to, despite all this, access the Admin GUI, change the remote in ```AuthenticationProvider``` to ```mock``` and save and compile the program.
* Contact the program manager for the login credentials!
* Later on the HTTP squad should have created an admin account for the Admin squad to make use of. The username and password will of course be set to something else depending on what the HTTP squad decided of course. You ought to keep close contact with the HTTP squad regarding this matter.
* Note that there exists mock data for almost everything in the Admin GUI; all the different ```Collections``` (collections of data) can be switched out for mock (mockdata) instead of remote if all the remote requests are not yet implemented/malfunctioning. This is a good way to maintain a continuous development despite having to wait for other squads implementations.

## Working with Git branches
* The Admin GUI has a ```main``` branch and a ```dev``` branch. The ```main``` branch is the branch that is deployed to the web and the ```dev``` branch is the branch that is used for development.
* There is a ```feature``` branch. This branch is used for development of new features. When a feature is done, it is merged into the ```dev``` branch.
* There is a ```bugfix``` branch. This branch is used for fixing bugs. When a bug is fixed, it is merged into the ```dev``` branch.

* When pull requests are made, they need to be reviewed by at least one other person before they can be merged into the ```dev``` branch.
* The pull request triggers a ```GitHub Action``` that runs the unit tests and lint. If the unit tests fail, the pull request cannot be merged into the ```dev``` branch.
* The developer who made the pull request is responsible for fixing any merge conflicts that may occur. If they need help, they need to comment on the pull request and ask for help.
