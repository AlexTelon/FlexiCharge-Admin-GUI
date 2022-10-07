# FlexiCharge-Admin-GUI

## Requirements
* Docker and its version should be at least 18.09 or later
* ```.env``` file in root of project

## Setting everything up
* Make sure you have Docker installed on your device
* If installed simply launch it and leave it as is. Do not do anything with it!
* Clone or fork the GitHub repository into a directory of choice on your device.
* If you decided to clone the project, clone it into your directory of choice using git clone.
* Open the project in your IDE (Integrated Development Environment) of choice.
* Create a .env file in the root of the project. The .env file should contain the following information:
    
* Upon successful cloning of the project, change directory to the react-app folder.
* Standing inside said folder, run ```yarn install```. Do not run npm install anywhere in the project since yarn install does this for you. This may hurt the whole project and cause problems with all the installed packages.
* After the above, run ```docker compose up --build```.
(Note: If you are using an older version of docker you may need to run docker-compose up --build).
Note: The flag --build only needs to be present on the first time build.
* This build may take some time and you may feel like something went wrong. Be patient and wait it out.
* After you have run docker compose up --build the first time you only need to run docker compose up (or ```docker-compose``` up depending on the Docker version) henceforth.
* The Admin GUI for FlexiCharge should now be running on port ```localhost:8080```.

## For development
* The following is needed for the development process:
1. NodeJS stable
2. Yarn
3. Docker version 18.09 or later
4. .env file in root of project
5. Git
* Since the Admin GUI is dependent on the implementations of several other squads, its data-fetching structure is constructed in such a way that the program can fetch both ```remote data``` (dynamic data from the HTTP squad) or ```mock data``` that we created and that exist within the Admin GUI program.
* During the initial state and early development of this product many squads will not have their dynamic data and requests ready for the Admin squad. Since the Admin squad is dependent on provided requests from other squads it may be a good idea to work with mock data in order to get an idea of how the Admin GUI works.
* To swiftly ```toggle``` between mock and dynamic, visit the ```dependencyContainer.ts``` file. From there toggle between mockdata or remote.

* Note that in the initial state of the development it is most likely that the HTTP and Database squad may not have a remote server with a remote account accessible for the Admin squad. In order to, despite all this, access the Admin GUI, change the remote in ```AuthenticationProvider``` to ```mock``` and save and compile the program.
* Contact the program manager for the login credentials!
* Later on the HTTP squad should have created an admin account for the Admin squad to make use of. The username and password will of course be set to something else depending on what the HTTP squad decided of course. You ought to keep close contact with the HTTP squad regarding this matter.
* Note that there exists mock data for almost everything in the Admin GUI; all the different ```Collections``` (collections of data) can be switched out for mock (mockdata) instead of remote if all the remote requests are not yet implemented/malfunctioning. This is a good way to maintain a continuous development despite having to wait for other squads implementations.

### Code base and code structure
* The Admin GUI is constructed of so-called ```Components```. Each main page throughout the application has a ```Parent Component``` which holds ```Child Components```. These Child Components can then hold their own “children”.
* This whole construct can be compared to a “tree” or a “pyramid”.
* Each section of the page has its own folder. Within that folder an ```index file``` is present. This index file is responsible for rendering that ```whole page```. Into that index file, Parent Components are included. These Parent Components have their own files (still within this folder). These Parent Components can then have other Components included in them which makes them the children of that component/within that file.
* Note that there can be ```several``` index files, they have the same name but are responsible for completely different things. Keep an eye on which folder you are standing in since every folder has its own index file. Some folders do not have their index files named as “index”.

* The ```chargers``` folder has its index file which holds all the parent components. For instance, the ```ChargerTable``` file is included into the index file. Within the ChargerTable the ```ChargerRow``` file is included (since a table consists of several rows). The ChargerRow has in turn the ```ChargerEditPanel``` included. As can be observed, this creates a tree-like structure. The whole Admin GUI follows this pattern.

* A React file consists of
1. Imports of files, components etc. at the top.
2. Instantiation of CSS and other desired styles.
3. Functions (TypeScript/JavaScript code).
4. React code with HTML syntax in order to display what should be shown on the web.

## Unusual pitfalls
* There have, during the previous years, instances of an recurring error when attempting to run ```docker compose up --build```. The error displays an error with the ```Collection.parse``` in the ```cracorc.js``` file. If this happens to you, switch to the main branch, run a new docker compose up --build command from there, then switch back to your desired branch. You should never run the  --build flag more than once. Keep an eye out for running it more times than necessary.
* Numerous unsuccessful attempts at resolving this issue has been made. Hopefully the next squad can identify this error and remedy it. If fixed, please consider editing this documentation file for future squads.
* If none of the above helps, save, commit and push your changes and remove the whole project, re-clone the whole project again.
* If the problem still exists, create a new branch from main and start over.

