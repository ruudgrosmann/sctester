@ts004
@nu
Feature: testset004: verschillende accounts en gebruikers

Scenario: 4.1 - 4.4 bug UUSDS-6820
	Given I log in as customer "Cypress_LRD_RO" with account "autotest_account1"
	Then  I should see "Dashboard"
	When I open "Leges centraal" of menu item "Producten"
	And  I select collectie "localproduct1_autotestaccount1"
	#bij tabelrij autotest_local_P1_gepubliceerd
	And  I find the entry for product "autotest_local_P1_gepubliceerd"
	#	4.1.5  ok
	Then this product has a eigen product icon
	And  this product has version number "1965155"
	# 4.1.6
	When I change the kosten field of this product
	And  I change the date field of this product to a future date
	# wijzig veld "Kosten" en klik opslaan knop
	# verander de datum naar een toekomstige datum.
	And  I click button "Opslaan"
	And I reload the page
	When  I find the entry for product "autotest_local_P1_gepubliceerd"
	Then this product has a klaar voor eindredactie icon
	And  this product has not version number "1965155"

	# deel twee: verwijderen van tijdelijke versie
	When I log in as customer "AutotestLocalAdmin" with account "autotest_account1"
	And  I open "Leges centraal" of menu item "Producten"
	And  I select collectie "localproduct1_autotestaccount1"
	When I click link "autotest_local_P1_gepubliceerd"
	Then  the URL should not contain "versions/1965155"
	When  I click button "Verwijderen"
	And I open the home page
	And  I open "Leges centraal" of menu item "Producten"
	And  I select collectie "localproduct1_autotestaccount1"
	When  I find the entry for product "autotest_local_P1_gepubliceerd"
	Then this product has a eigen product icon
	And  this product has version number "1965155"

Scenario: 4.5 bug UUSDS-6824
	# deel 1: aanmaken en controleren product
	When I log in as customer "AutotestLocalAdmin" with account "autotest_account1"
	And  I create a publication ready product "p_issue6824" in local collection "cypress_p_collectie1"
	When I open the home page
	And  I open "Collecties" of menu item "Producten"
	And  I click link "cypress_p_collectie1"
	When  I find the entry for product "p_issue6824"
	Then this product has a publicatiegereed icon

	# deel 2: (ongeoorloofd) verwijderen van product
	When I log in as customer "Cypress_LRD_R_MD_ALL" with account "autotest_account1"
	And  I open "Overzicht" of menu item "Producten"
	And  I see the product gereed voor publicatie "p_issue6824"
	And  it is of collection "cypress_p_collectie1"
	When I click link "p_issue6824"
	And  I click button "Verwijderen"
	Then I should see popup message "Tijdelijke versie verwijderd"

Scenario: 4.6: bug UUSDS-6825
	When I log in as customer "Cypress_LRD_R_MD_ALL" with account "autotest_account1"
	Then I should see 'Dashboard'
	When I log in as customer "AutotestLocalAdmin" with account "autotest_account1"
	And  I create a publication ready product "p_issue6825" in local collection "cypress_p_collectie1"
	When I log in as customer "Cypress_LRD_R_MD_ALL" with account "autotest_account1"
	And  I open "Collecties" of menu item "Producten"
	And  I click link "cypress_p_collectie1"
	When I click link "p_issue6825"
	Then I should see 'Publicatiegereed'
	And  button "Opslaan" is not disabled
	When I change the memo field to "hallo"
	And  I click button "Opslaan"
	Then I should see popup message "Product is opgeslagen"
	And  I click button "Verwijderen"
	Then I should see popup message "Tijdelijke versie verwijderd"

