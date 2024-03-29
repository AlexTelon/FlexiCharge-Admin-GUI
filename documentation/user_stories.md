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

Charlies new charge-point have been installed. 
Now he wants to open it upp for users to charge from.
To be able to service more users and make more money.
* Add a new charge-point.
* Register how many chargers there are.
* Make the point easily findable.
* Set a charging price

### Finding charger

Charlie needs to do specific operations on a charger. 
He needs to find this specific charger in a fast way, so that he can do the operations without wasting billable time.
* List all chargers.
* Find charger by id.
* Find charge-point by area.

### Changing charging Charge-point price

Charlie monitor this month's electricity prices which have risen.
He now wants to increase the prices att the charging points, so that the company does not lose money.
* Change charging prices.
* Change prices for many / all chargers.

### Broken charger

A customer has reported a broken charger to Steve.
Steve now wants to register the charger as broken, to give customers and Charlie a heads-up.
* Find charger by id.
* Register a charger in a charging point as disabled.
* Unregister a charger as disabled.
* Make it easy for charlie to find a disabled charger.

### Removing a charger

One of FlexiCharges chargers points have been removed.
Charlie wants to remove that charger from any customer view.
Because he does not want to trick customers to chargers that no longer exists.
* Mark charger as inactive.

***
## Customer Service

### Find invoices
Steve needs to manage a selection of invoices.
He needs to find the invoices, so that he can apply operations to them.
* List all database invoice entries.
* Filter invoices on user ids.
* filter on transaction ids.
* Filter on whether they were auto-generated.

### Nullification
The charger charging johns EV short-circuited and gave him an outrageous invoice.
Steve wants to help him be fairly billed.
Therefor Steve sets the charging price for the bad session to 0 sek.
* Change customer charging costs for a session.
* Invalidate a invoice.

### New Invoice
Steve has deleted an invoice and wants to add a new one.
So that we can get paid even in exceptional cases.
* Create a new invoice from a selection of charging sessions.

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

### Reset user password
Steve is helping a user who lost his password.
He now needs to help reset the users' password, so the user can remain a customer.