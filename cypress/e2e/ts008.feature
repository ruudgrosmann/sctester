@ts008
Feature: testset008: sdu-produkten

Scenario: 8.1: creeren testdata
	When I log in as customer "autotestPVCW"
	# 8.1.1
	When I create published product "sdu_p8.02" in sdu collection "autotest_sduprodct1" with updatememo "test8.02"
	# 8.1.2
	And I open "Collecties" of menu item "Sdu-producten"
	And I click link "autotest_sduprodct1"
	And I should see "sdu_p8.02"

Scenario: 8.2: maak lokale versie als lokale eindredacteur
	Given I log in as customer "Cypress_LRD_ER_MD_ALL" with account "autotest_account"
	# 8.2.1
	When I open "Overzicht" of menu item "Producten"
	And  I find section "Nieuwe abonnementsproducten"
	And  this section contains "sdu_p8.02"
	# 8.2.2
	When I click link "sdu_p8.02"
	And  I click the checkbox of collection "autotest_p_abonnement"
	And  I click button "Opslaan"
	Then I should see popup message "Een kopie van dit product"
	And  I open "Overzicht" of menu item "Producten"
	And  I find section "Nieuwe abonnementsproducten"
	Then this section does not contain "sdu_p8.02"
	When I find section "Producten in bewerking"
	Then this section contains "sdu_p8.02"

Scenario: 8.2.3: status veranderen als lokale redacteur
	When I log in as customer "Cypress_LRD_R_MD_ALL" with account "autotest_account"
	When I open "Overzicht" of menu item "Producten"
	And  I find section "Producten in bewerking"
	And  this section contains "sdu_p8.02"
	When I click link "sdu_p8.02"
	Then the status selector contains "In bewerking"
	And  the status selector does not contain "Publicatiegereed"
	And  the status selector does not contain "Gepubliceerd"
	When I change the status to "Klaar voor eindredactie"
	And  I click button "Opslaan"

Scenario: 8.2.4: verdere controles
	When I log in as customer "Cypress_LRD_R_MD_ALL" with account "autotest_account"
	When I open "Overzicht" of menu item "Producten"
	And  I find section "Producten in bewerking"
	And  in this section I select "Klaar voor eindredactie" in filter "Filter op status"
	When I reload the page
	Then this section contains "sdu_p8.02"

Scenario: 8.3.1: update van Sdu-product
	When I log in as customer "autotestPVCW"
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "autotest_sduprodct1"
	When I click link "sdu_p8.02"
	And  I click button "Bewerken"
	And  I change the title to the version number with prefix "sdu_u8.02"
	And  I change the status to "Gepubliceerd"
	And  I change the updatememo to "update van titel"
	And  I click button "Opslaan"
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "autotest_sduprodct1"
	And  I should see "sdu_u8.02"

Scenario: 8.3.2: redacteur accepteert wijziging
	When I log in as customer "Cypress_LRD_R_MD_ALL" with account "autotest_account"
	When I open "Overzicht" of menu item "Producten"
	And  I find section "Producten in bewerking"
	Then this section contains "sdu_p8.02"
	And  I click link "sdu_p8.02" in this section
	When I find the "Titel" field of the product
	And  this field has a changed icon
	When I click on this field
	Then switch "Toon abonnement" of this field is off
	When I click on switch "Toon abonnement" of this field
	Then the input of this field starts with "sdu_p8.02"
	And  this field contains "sdu_u8.02"
	When I click on switch "Gebruik abonnement" of this field
	And  I click button "Nee, bewaar mijn tekst" in the dialog
	Then switch "Gebruik abonnement" of this field is off
	When I click on switch "Gebruik abonnement" of this field
	And  I click button "Ja" in the dialog
	Then switch "Toon abonnement" of this field is off
	And  the input of this field starts with "sdu_u8.02"
	And  I click button "Opslaan"

Scenario: 8.4.1: controle update-produkt
	When I open "Overzicht" of menu item "Producten"
	And  I find section "Producten in bewerking"
	Then this section contains "sdu_u8.02"
	When I click link "sdu_u8.02" in this section
	And  I click button "Verwijderen"
	Then I should see popup message "Tijdelijke versie verwijderd"
	When I open "Overzicht" of menu item "Producten"
	And  I find section "Nieuwe abonnementsproducten"
	Then this section contains "sdu_u8.02"
	When I find section "Producten in bewerking"
	Then this section does not contain "sdu_u8.02"

Scenario: 8.4.2: beheerder archiveert sdu-produkt
	When I log in as customer "autotestPVCW"
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "autotest_sduprodct1"
	And  I click link "sdu_u8.02"
	Then the product has status "Gepubliceerd"
	When I change the status to "Gearchiveerd"
	And  I click button "Opslaan"
	Then the product has status "Gearchiveerd"
	And  button "Opslaan" is disabled
	When I open "Collecties" of menu item "Sdu-producten"
	And  I click link "Gearchiveerde producten" 
	Then I should see "Archive"
	When I search for "sdu_"
	# And  I go to the last result page
	And  I set the number of filter results to max
	Then I should see a sdu product with the version name
	When I open "Collecties" of menu item "Sdu-producten"
	And  I click link "autotest_sduprodct1"
	Then I should not see a sdu product with the version name

Scenario: 8.4.3: eindredacteur weigert update
	Given I log in as customer "Cypress_LRD_ER_MD_ALL" with account "autotest_account"
	When I open "Overzicht" of menu item "Producten"
	And  I find section "Nieuwe abonnementsproducten"
	And  I find product "sdu_u8.02" in this section
	And  I click the Weigeren button of this product
	Then this product contains text "Geweigerd"
	When I open "Overzicht" of menu item "Producten"
	Then I should not see link "sdu_u8.02"

@ignore
Scenario: 8.x.test: versietesten
	When I log in as customer "autotestPVCW"
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "P_collectie1"
	And  I click link "ruudtest2"
	And  I click button "Bewerken"
	And  I change the title to the version number with prefix "sdu_u8.02"
	And  I click button "Opslaan"
@ignore
Scenario: 8.x.testb: versietesten
	When  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "P_collectie1"
	Then I should see a product with the new title
@ignore
Scenario: 8.x.test: timestamptesten
	When I log in as customer "autotestPVCW"
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "P_collectie1"
	And  I click link "ruudtest0"
	And  I click button "Bewerken"
	And  I change the title to the timestamp with prefix "sdu_u8.02"
	And  I click button "Opslaan"
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "P_collectie1"
	Then I should see a product with the new title
