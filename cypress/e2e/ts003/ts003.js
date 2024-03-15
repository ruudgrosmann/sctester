import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../common/customParameterTypes';
import '../common/tsc';

before (() => {
	cy.customer_login( "Cypress_LR_GT_Mod", "autotest_account1");
});

