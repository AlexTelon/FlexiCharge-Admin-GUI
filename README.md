# FlexiCharge-Admin-GUI

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
    
* Upon successful cloning of the project, change directory to the react-app folder.
* Standing inside said folder, run ```yarn install```. Do not run ```npm install``` anywhere in the project since ```yarn install``` does this for you. This may hurt the whole project and cause problems with all the installed packages.
* After the above, run ```docker compose up --build```.
(Note: If you are using an older version of docker you may need to run ```docker-compose up --build```).
Note: The flag ```--build``` only needs to be present on the first time build.
* This build may take some time and you may feel like something went wrong. Be patient and wait it out.
* After you have run docker compose up ```--build``` the first time you only need to run ```docker compose up``` (or ```docker-compose``` up depending on the Docker version) henceforth.
* The Admin GUI for FlexiCharge should now be running on port ```localhost:8080```.

## For development
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

### Testing
* The Admin GUI has a couple of unit tests for the business logic parts and the goal is to cover all testable functionality that exists **within**.
* Tests are performed with the package ```jest``` and can be run from the terminal. To run the tests, stand inside the react-app folder and run the command ```yarn test```
* To define that a file is meant for testing, put ```.test.``` in between the file name and the filetype. For example ```fileName.test.ts```

## Technical debt & where the project left off
### Unusual pitfalls
* There have, during the previous years, been instances of an recurring error when attempting to run ```docker compose up --build```. The error displays an error with the ```Collection.parse``` in the ```cracorc.js``` file. If this happens to you, switch to the ```main``` branch, run a new ```docker compose up --build``` command from there, then switch back to your desired branch. You should never run the ```--build``` flag more than once. Keep an eye out for running it more times than necessary.
* Numerous unsuccessful attempts at resolving this issue has been made. Hopefully the next squad can identify this error and remedy it. If fixed, please consider editing this documentation file for future squads.
* If none of the above helps, save, commit and push your changes and remove the whole project, re-clone the whole project again.
* If the problem still exists, create a new branch from main and start over.
### Continuation point
* The future contributors of this repository should continue the work from where the previous year's contributor left off (if the team at KnowIT has not decided anything else). This includes work with:
1. ```Generating invoices for several users```
2. ```Generating user specific invoices```
3. ```Auto-create a serial number for a charger``` (preferably connect the serial number to the its charger station ID, e.g.: every charger belonging to charger station with ```charger station ID 44``` should have their serial number starting with 44.... ```(e.g. 4415782)``` maybe).
* Regarding ```generating invoices``` for both several and specific users. The HTTP squad and the Database team should be almost done with their side of this implementation. The Admin GUI squad are prepared and ready to connect the API-calls the HTTP squad will provide. The Admin GUI uses mock data at the moment to simulate users with invoices.
* Regarding ```auto-creating a serial number for a charger```, no work or progress has been made due to the lack of time. Feel free to find and come up with the most optimal solution to this problem (right now an Admin has to type in their own serial number when creating a charger for a charger station).
* The list now displaying invoices for a specific year and month does ```not``` show anything unless the admin filters after year and month ```first```. ```The list should display the current year and month's invoices```. The admin should be able to filter by from there if ```desired```. Note: Keep close contact and a dialog with the HTTP and Database squad.
* When ```searching for a specific user and their invoices```, the ```whole``` email has to be entered correctly in order to trigger a successful search for that user. This should ```not``` be the case. It should be enough to only enter a ```fragment/part``` of a user's email to trigger a search meaning if the first the letters of a user's email is correct and this person does in fact have active invoices, a successful search should be triggered and the user should be displayed on the page.

## Web URL and deployment
### Web URL
* http://flexicharge-admin-gui.s3-website-eu-west-1.amazonaws.com/login
### How to deploy the latest version of the program
#### First time setup
* It is recommended that you deploy the program as a ```bucket``` through the Amazon web service (AWS) ``S3``. Make sure that this is done through the Knowit AWS account and that you have access to your ```access key``` & ```secret key```
* Start of by configuring the ```AWS Command Line Interface``` by opening any terminal and
    * write ```aws configure```
    * Write your ```access key```
    * Write your ```secret key```
    * Write the region name, for example ```eu-west-1```
    * Write your prefered output format, for example json
* Create an AWS ```bucket``` by navigating to the ```S3 service``` from the AWS console and clicking ```Create bucket```. Give it an approriate name and set its region to the correct one. Uncheck the box ```Block all public access``` if you want to make it fully public. **This step can be ignored if a bucket already exists**
* In the ```bucket```, navigate to the ```Properties``` header and at the bottom of the page, enable the Static website hosting & fill the form ```Index document``` with ```index.html```. **This step can be ignored if a bucket already exists**
* In the ```bucket```, navigate to the ```permissions``` header and edit the Bucket policy. Paste the policy below but swap the text Bucket name with the actual bucket name. **this step can be ignored if a bucket already exists**
``` 
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::Bucket name/*"
            }
        ]
    }
 ```

#### Deploying a release
* Start off by navigating to the ```react-app folder```. In a terminal, type ```yarn build```. You should now have a ```build folder``` inside the react-app folder
* Still standing in the ```react-app folder```, write ```aws s3 sync build/ s3://*BUCKETNAME*```
* Your files in the build folder should at this point be in the AWS ```bucket```. To open the deployed release, go once again to the ```properties``` header in your ```bucket``` and at the bottom there should be a link that takes you to it!

##### Common issues
* Your build of the program cannot get global variables from your ```.env``` files. Instead you are left with ```undefined``` variables. Avoid this by putting global variables directly in the ```appConfig.ts``` files instead, where they can be read.
* After having done an inital release, your next releases may act weirdly or not work at all as intended. This is most of the time fixed by ```clearing your browser cache``` and redeploying the project.
