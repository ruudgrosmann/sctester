@vac
Feature: vraag/antwoord-combinaties

Scenario: overzicht
	When I open the home page
	And  I open "Overzicht" of menu item "Sdu VAC's"
	Then I should see "VAC's in bewerking"

Scenario: test-vac-collectie is er
	When I open the home page
	And  I open "Collecties" of menu item "Sdu VAC's"
	Then I should see "SDU automatisch testen"

Scenario: controles op test-vac-collectie
	When I open the home page
	And  I open "Collecties" of menu item "Sdu VAC's"
	And  I click VAC collection "SDU automatisch testen"
	And I should see "is er leven op pluto"
	When  I click VAC "hallo is mijn vraag"
	And I select tab "Relaties"
	Then I don't see VAC relation "is er leven op mars"
	And  I see VAC relation "is er leven op pluto"
	And  this VAC relation is uni-directional
	And I don't see product relation "opvang daklozen"
	And I see product relation "Kinderopvang"

@nu
# ignore want de richting van het eerste scenario is momenteel 'uni'
# beter nadenken over testset.
Scenario Outline: richting van relaties
	When I open the home page
	And  I open "Collecties" of menu item "Sdu VAC's"
	And  I click VAC collection "SDU automatisch testen"
	And  I click VAC <vac>
	And I select tab "Relaties"
	Then  I see VAC relation <gerelateerd>
	And  this VAC relation is <richting>-directional

Scenarios:
	| vac					| gerelateerd				| richting	|
	| "hallo is mijn vraag"	| "is er leven op pluto"	| uni	|
	| "hallo mijn vraag"	| "hallo is mijn vraag"		| bi	|

@ignore
# testen zitten ook besloten in de volgende
Scenario: verwijderen van relaties
	When I open the home page
	And  I open "Collecties" of menu item "Sdu VAC's"
	And  I click VAC collection "SDU automatisch testen"
	And  I click VAC "tijdelijke testvraag."
	And  I select tab "Relaties"
	Then I see 2 VAC relations
	When I remove all VAC relations
	Then I see 0 VAC relations

@nu
Scenario: verwijderen en toevoegen van VAC-relaties
	When I open the home page
	And  I open "Collecties" of menu item "Sdu VAC's"
	And  I click VAC collection "SDU automatisch testen"
	And  I click VAC "tijdelijke testvraag."
	And  I select tab "Relaties"
	When I remove all VAC relations
	Then I see 0 VAC relations
	When I add bi-directional VAC relation "is er leven"
	And  I add uni-directional VAC relation "hallo is mijn vraag"
	Then I see 2 VAC relations
	And  I see VAC relation "hallo is mijn vraag"
	And  this VAC relation is uni-directional

@nu
Scenario: verwijderen en toevoegen van product-relaties
	When I open the home page
	And  I open "Collecties" of menu item "Sdu VAC's"
	And  I click VAC collection "SDU automatisch testen"
	And  I click VAC "tijdelijke testvraag."
	And  I select tab "Relaties"
	And  I remove all product relations
	Then I see 0 product relations
	When I add uni-directional product relation "kindertelefoon"
	Then I see 1 product relations
	And  I see product relation "Kindertelefoon"
	And  this product relation is uni-directional
