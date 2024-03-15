@product
Feature: product

Scenario: overzicht
	When I open the home page
	And  I open "Overzicht" of menu item "Sdu-producten"
	Then I should see "Producten gereed voor publicatie"

Scenario: test-collectie is er
	When I open the home page
	And  I open "Collecties" of menu item "Sdu-producten"
	Then I should see "SDU automatisch testen PC"

@nu
Scenario: controles op testprodukt
	When I open the home page
	And  I open "Collecties" of menu item "Sdu-producten"
	And  I click product collection "SDU automatisch testen PC"
	And  I click product "test1_2810"
	Then it should have status "In bewerking"
	When I select tab "Relaties"
	Then I don't see VAC relation "is er leven op mars"
	And  I see VAC relation "Hoe registreer ik mijn kinderopvangvoorziening?"
	And  this VAC relation is bi-directional
	And  I see VAC relation "hallo is mijn vraag"
	And  this VAC relation is uni-directional
	And  I don't see product relation "bestaat niet"
	And  I see product relation "kinderbijslag"
	And  this product relation is bi-directional

