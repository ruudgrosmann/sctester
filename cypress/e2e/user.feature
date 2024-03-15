@develop
@user
Feature: users

Scenario: switchen
	When I open the home page
	Then I should see menu item "Sdu-producten"
	When I switch to account "Account Automatisch testen"
	Then I should see menu item "Producten"
	When I close the current account
	Then I should see menu item "Sdu-producten"

Scenario: collecties
	When I open the home page
	And  I switch to account "Account Automatisch testen"
	And  I open "Collecties" of menu item "Producten"
	Then I should see collection "t1" in "Mijn collecties"
	And  this collection has status "Gepubliceerd"
	And  this collection has a gepubliceerd icon
	Then I should see collection "t2" in "Mijn collecties"
	And  this collection has not a gepubliceerd icon
	Then I should see collection "SDU automatisch testen PC" in "Abonnementen"
	And  this collection has not a gepubliceerd icon

@nu
Scenario: sdu-collecties
	When I open the home page
	And  I open "Collecties" of menu item "Sdu-producten"
	Then I should see sdu collection "SDU automatisch testen PC"
	When I click this collection
	Then I should see sdu product "relatietest"
	And  this product has a in bewerking icon
