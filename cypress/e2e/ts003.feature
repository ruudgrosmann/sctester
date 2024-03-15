@tsc003
@nu
Feature: tsc003: customer "Cypress_LR_GT_Mod", account "autotest_account1"

Background:
	Given I open the home page

Scenario: 3.2 homepagina laadt
	Then  I should see "Dashboard"

Scenario: 3.3 productoverzicht
	When  I open "Overzicht" of menu item "Producten"
	Then  I should see "This module is not enabled for your account"
	And   the URL should contain "module-not-enabled"

Scenario: 3.4 productcollectie
	When  I open "Collecties" of menu item "Producten"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.5 nieuw produkt
	When  I open "Nieuw product" of menu item "Producten"
	Then  I should see "This module is not enabled for your account"

Scenario: 3.6 produkt exporteren 
	When  I open "Exporteren" of menu item "Producten"
	Then  I should see "This module is not enabled for your account"

Scenario: 3.7 leges centraal
	When I open "Leges centraal" of menu item "Producten"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.9 VAC-overzicht
	When I open "Overzicht" of menu item "VAC's"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.10 VAC-collecties
	When I open "Collecties" of menu item "VAC's"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.11 nieuwe VAC
	When I open "Nieuwe VAC" of menu item "VAC's"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.12 VAC's exporteren
	When I open "Exporteren" of menu item "VAC's"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.17 contact-collecties
	When I open "Collecties" of menu item "Contacten"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.18 nieuw contact
	When I open "Nieuw contact" of menu item "Contacten"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.19 contacten exporteren
	When I open "Exporteren" of menu item "Contacten"
	Then  the URL should contain "module-not-enabled"

Scenario: 3.21 linkchecker
	When I click menu item "Linkchecker"
	Then  the URL should contain "module-not-enabled"
