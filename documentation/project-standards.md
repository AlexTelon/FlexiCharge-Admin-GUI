# Project Standards

## Code base and code structure
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

## Testing
* The Admin GUI has a couple of unit tests for the business logic parts and the goal is to cover all testable functionality that exists **within**.
* Tests are performed with the package ```jest``` and can be run from the terminal. To run the tests, stand inside the react-app folder and run the command ```yarn test```
* To define that a file is meant for testing, put ```.test.``` in between the file name and the filetype. For example ```fileName.test.ts```
