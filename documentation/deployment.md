# Deployment

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

## Deploying a release
* Start off by navigating to the ```react-app folder```. In a terminal, type ```yarn build```. You should now have a ```build folder``` inside the react-app folder
* Still standing in the ```react-app folder```, write ```aws s3 sync build/ s3://*BUCKETNAME*```
* Your files in the build folder should at this point be in the AWS ```bucket```. To open the deployed release, go once again to the ```properties``` header in your ```bucket``` and at the bottom there should be a link that takes you to it!


##### Common issues
* Your build of the program cannot get global variables from your ```.env``` files. Instead you are left with ```undefined``` variables. Avoid this by putting global variables directly in the ```appConfig.ts``` files instead, where they can be read.
* After having done an inital release, your next releases may act weirdly or not work at all as intended. This is most of the time fixed by ```clearing your browser cache``` and redeploying the project.
