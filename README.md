# FlexiCharge-Admin-GUI

## To Run

### Requirements
* Docker version 18.09 or later
* ```.env``` file in root of project

### Execution
1. Enter the root of the project
2. Copy the `example.env` to `.env`
  - - Note: The Environtment Variables need to be altered 
3. Run the command `docker compose up --build`
  - - Note: If you are using an older version of docker you may need to run `docker-compose up --build`
  - - Note: The flag `--build` only needs to be present on __first time__ build
4. After several minutes the process should be ready
  - - Assuming default setttings the port should be `8080`
  - - Build process is quite lengthy on __first time__ builds


## Development

### Requirements
* NodeJS stable
* Yarn
* Docker version 18.09 or later
*  ```.env``` file in root of project
