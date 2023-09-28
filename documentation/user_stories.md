# User Stories

## Info

### Users

* **John** - is casual customer.
* **Steve** - works in FlexiCharge customer service.
* **Charlie** - is the FlexiCharge charger manager.
* **Karen** - is an accountant for FlexiCharge.

### Template

As a product owner who is responsible for steering the direction of the project, 
I wrote some user-stories in the who-what-why format.
This is to provide a context dense way to communicate intended product functionality to my team members.
* After the story there are requirements.
* The Requirements list things required for the actor in the story to accomplish what they want.

***
## Network management

### Adding charge posts

Charlies new charger station have been installed. 
Now he wants to open it upp for users to charge from.
To be able to service more users and make more money.
* Add a new charger station.
* Register how many chargers there are.
* Make the station easily findable.
* Set a charging price

### Finding charger

Charlie needs to do specific operations on a charger. 
He needs to find this specific charger in a fast way, so that he can do the operations without wasting billable time.
* List all chargers.
* Find charger by id.
* Find charger station by area.

### Changing charging station price

Charlie monitor this month's electricity prices which have risen.
He now wants to increase the prices att the charging stations, so that the company does not lose money.
* Change charging prices.
* Change prices for many / all chargers.

### Broken charger

A customer has reported a broken charger to Steve.
Steve now wants to register the charger as broken, to give customers and Charlie a heads-up.
* Find charger by id.
* Register a charger in a charging station as disabled.
* Unregister a charger as disabled.
* Make it easy for charlie to find a disabled charger.

### Removing a charger

One of FlexiCharges chargers stations have been removed.
Charlie wants to remove that charger from any customer view.
Because he does not want to trick customers to chargers that no longer exists.
* Mark charger as removed.

***
## Customer Service

### Nullification
The charger charging johns EV short-circuited and gave him an outrageous invoice.
Steve wants to help him be fairly billed.
Therefor Steve sets the charging price for the bad session to 0 sek.
* Steve needs to have the ability to change customer charging costs for a session.
* Steve needs to send out a new updated invoice and invalidate the old one.

***
## User Management

### Find user
Steve needs to apply operations to a user account. 
He now needs to find the user account in a fast way, so that he can do the operations without wasting billable time.
* List all users
* Search by name
* Search by id
* Search by contact information
* filter by charging dates.