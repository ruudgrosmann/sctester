@develop
Feature: home

Scenario: tabjes
	When I open the home page
	Then I should see "Dashboard"

Scenario: mock van aankondigingen
	When I mock the announcements
	Then I should see "tijdelijk bericht" 

