# Setup / Deployment

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