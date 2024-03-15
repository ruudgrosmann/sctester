@ts007
@nu
Feature: testset007: rechten van redacteur

Scenario: 7.1: creeren testdata
	Given I log in as customer "autotestPVCW"
	When  I create published product "sdu_p8.01" in sdu collection "autotest_sduprodct1" with updatememo "test8.01"
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "autotest_sduprodct1"
	Then  I should see "sdu_p8.01"

Scenario: 7.2: controle als lokale redacteur
	Given I log in as customer "Cypress_LRD_R_MD_ALL" with account "autotest_account"
	# 7.2.1
	When  I open "Overzicht" of menu item "Producten"
	And   I find section "Nieuwe abonnementsproducten"
	Then  this section contains "sdu_p8.01"
	# 7.2.2
	When I click link "sdu_p8.01"
	And  I click the checkbox of collection "autotest_p_abonnement"
	And  I click button "Opslaan"
	Then I should see popup message "Een kopie van dit product"
	And  I open "Overzicht" of menu item "Producten"
	And   I find section "Nieuwe abonnementsproducten"
	Then  this section does not contain "sdu_p8.01"
	When   I find section "Producten in bewerking"
	Then  this section contains "sdu_p8.01"
	When I click link "sdu_p8.01"
	And  I click button "Verwijderen"
	Then I should see popup message "Tijdelijke versie verwijderd"
	
Scenario: 7.3: archiveren van testproduct
	When I log in as customer "autotestPVCW"
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "autotest_sduprodct1"
	And  I click link "sdu_p8.01"
	When I change the status to "Gearchiveerd"
	And  I click button "Opslaan"
	Then button "Opslaan" is disabled
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click link "autotest_sduprodct1"
	Then I should not see product "sdu_p8.01"

Scenario: 7.4: weigeren van produkt
	Given I log in as customer "Cypress_LRD_R_MD_ALL" with account "autotest_account"
	When  I open "Overzicht" of menu item "Producten"
	And   I find section "Nieuwe abonnementsproducten"
	Then  this section contains "sdu_p8.01"
	When  I click the Weigeren button of product "sdu_p8.01"
	And   I open "Overzicht" of menu item "Producten"
	And   I find section "Nieuwe abonnementsproducten"
	Then  this section does not contain "sdu_p8.01"
