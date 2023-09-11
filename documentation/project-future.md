

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

