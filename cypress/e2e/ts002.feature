@ts002
Feature: tsc002: customer "Cypress_LRD_RO", account "autotest_account1"

Background:
	Given I open the home page
	#When I log in as customer "Cypress_LRD_RO" with account "autotest_account1"

@nu
@f
Scenario: 2.3 overzicht
	When  I open "Overzicht" of menu item "Producten"
	Then  I should see "Productenoverzicht (takenlijst)"
	And   I see the product in bewerking "autotest _titel241823 paspoort of identiteitskaart aanvragen"
	And   it is of collection "jlocalproduct1_autotestaccount1"

@nu
Scenario: 2.4 testcollectie
	When  I open "Collecties" of menu item "Producten"
	Then  I should see collection "localproduct1_autotestaccount1" in "Mijn collecties"

@nu
Scenario: 2.5 nieuw produkt
	When  I open "Nieuw product" of menu item "Producten"
	Then  I should see "Nieuw product"
	And   the "Opslaan" button is disabled

@f
Scenario: 2.6 produkt exporteren 
	When  I open "Exporteren" of menu item "Producten"
	Then  I should see "Producten exporteren"
	And   the collectie dropdown contains "autotest_sduprodct1"
	And   the collectie dropdown contains "localproduct1_autotestaccount1"
	When  I export collectie "autotest_sduprodct1"
	Then  the message contains "Export wordt gedownload"
	And   I find download file "autotest_sduprodct1 - DATE.xlsx"
	When  I export collectie "localproduct1_autotestaccount1"
	Then  the message contains "Export wordt gedownload"
	And   I find download file "localproduct1_autotestaccount1 - DATE.xlsx"

Scenario: 2.7 leges centraal: 1-3
	When I open "Leges centraal" of menu item "Producten"
	Then the URL should contain "products/pricing"
	When I select collectie "localproduct1_autotestaccount1"
	And  I find the entry for product "titel241823 paspoort of identiteit"
	Then its publicatiedatum field is disabled
	And  its kosten field is disabled

Scenario: 2.7 leges centraal: 2.7.4
	When I open "Leges centraal" of menu item "Producten"
	Then the URL should contain "products/pricing"
	When I select collectie "localproduct1_autotestaccount1"
	When I click link "Autotest lokaal_TV_products245915/versions1965149"
	# vergewis je van geladen pagina
	Then I should see "Huidige status"
	And  I should not see button "Verwijderen"

Scenario: 2.7 leges centraal: 2.7.5
	When I open "Leges centraal" of menu item "Producten"
	And  I select collectie "localproduct1_autotestaccount1"
	When I click link "autotest _titel241823"
	# vergewis je van geladen pagina
	Then I should see "Huidige status"
	When  I change the status to "Gepubliceerd"
	And   I should not see button "Opslaan"

Scenario: 2.8.1 produktenoverzicht
	When  I open "Overzicht" of menu item "Producten"
	When  I click product in bewerking "autotest _local product1 status klaar voor eindredactie"
	Then  the URL should contain "products/245958/versions/1965286"
	When  I change the status to "In bewerking"
	And   I should not see button "Opslaan"

Scenario: 2.8.2 produktenoverzicht
	When  I open "Overzicht" of menu item "Producten"
	When  I click product in bewerking "autotest _local product2"
	And   I change the status to "Klaar voor eindredactie"
	And   I should not see button "Opslaan"

Scenario: 2.8.3 produktenoverzicht
	When  I open "Overzicht" of menu item "Producten"
	When  I click product in bewerking "autotest _local product3"
	And   I change the status to "Publicatiegereed"
	And   I should not see button "Opslaan"

Scenario: 2.8.4 produktenoverzicht
	When  I open "Overzicht" of menu item "Producten"
	When  I click product in bewerking "autotest _local product4"
	And   I change the status to "Gepubliceerd"
	And   I should not see button "Opslaan"

Scenario: 2.9 VAC-overzicht
	When I open "Overzicht" of menu item "VAC's"
	Then I should see "VAC-overzicht (takenlijst)"
	And  I should see VAC in bewerking "autotestsdu_qa232395_vraag: wat" from collection "localvac1_autotestaccount1"

Scenario: 2.10 VAC-collecties
	When I open "Collecties" of menu item "VAC's"
	Then I should see "Mijn collecties"
	And  I should see "localvac2_autotestaccount1"
	When I click link "localvac1_autotestaccount1"
	Then I should see "autotestsdu_qa232395_vraag: wat kost"

Scenario: 2.11 nieuwe VAC
	When I open "Nieuwe VAC" of menu item "VAC's"
	Then I should see "Nieuwe VAC"
	And  I should see "In bewerking"
	And  button "Opslaan" is disabled

Scenario: 2.12 VAC's exporteren
	When I open "Exporteren" of menu item "VAC's"
	Then I should see "VAC's exporteren"
	And  the collectie dropdown contains "localvac1_autotestaccount1"
	When I export collectie "autotest_sduvac1"
	Then the message contains "Export wordt gedownload"
	And  I find download file "autotest_sduvac1 - DATE.xlsx"

Scenario: 2.12.3 VAC's exporteren
	When I open "Exporteren" of menu item "VAC's"
	When I export collectie "localvac1_autotestaccount1"
	Then the message contains "Export wordt gedownload"
	And  I find download file "localvac1_autotestaccount1 - DATE.xlsx"

Scenario: 2.13 VAC die klaar is voor eindredactie die niet schrijfbaar is
	When I open "Overzicht" of menu item "VAC's"
	And I click link "autotest_local_qa232395_vraag2_klaarvoor eindredactie"
	Then  the URL should contain "qa/236461/versions/2172527"
	And   I should not see button "Opslaan"
	When  I change the status to "In bewerking"
	Then  I test nothing

Scenario: 2.18.b nieuw contact
	When I open "Nieuw contact" of menu item "Contacten"
	Then I should see "Nieuw contact"

Scenario: 2.19 contacten exporteren
	When I open "Exporteren" of menu item "Contacten"
	Then the collectie dropdown contains "autotest_sducontacten1"
	And  the collectie dropdown contains "localcontact1_autotestaccount1"
	When I select collectie "autotest_sducontacten1"
	Then button "Exporteren" is disabled
	When I select option "Selecteer alles"
	Then button "Exporteren" is not disabled
	When I click button "Exporteren"
	Then  the message contains "Export wordt gedownload"
	And   I find download file "autotest_sducontacten1 - DATE.xlsx"
	When I select collectie "localcontact1_autotestaccount1"
	When I select option "Selecteer alles"
	When I click button "Exporteren"
	And   I find download file "localcontact1_autotestaccount1 - DATE.xlsx"

Scenario: 2.20 contacten-collecties
	When I open "Collecties" of menu item "Contacten"
	Then I should see "Mijn collecties"
	When I click link "localcontact1_autotestaccount1"
	Then the URL should contain "contacts/collections/3766"
	When I click link "autotest_localcontact1"
	Then the URL should contain "contacts/2977"
	Then button "Opslaan" is disabled

Scenario: 2.21 linkchecker
	When I click menu item "Linkchecker"
	Then I should see "geen gepubliceerde collectie" in linkchecker section "Productcollecties"
	Then I should see "geen gepubliceerde collectie" in linkchecker section "VAC-collecties"

