import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import IconProps from '../common/icons';
import '../common/customParameterTypes';
import '../common/tsc';

before (() => {
});

When ('I close the popup', () => {
    cy.get(`.p-toast-icon-close`).click();
});

When ('I click the checkbox of collection {string}', (naam) => {
    cy.get(`div.actions-block-item h3:contains("Collecties")`)
                        .parent().within( () => {
                            cy.get( `label:contains(${naam})`)
                            .parent().click();
                        });
});

When ('I click the Weigeren button of product {string}', (naam) => {
    cy.get(`.p-datatable-tbody a:contains("${naam}")`)
                        .parent().parent().find('p-button').click();
});

