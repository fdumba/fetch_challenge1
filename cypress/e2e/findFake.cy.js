/// <reference types= "cypress" /> 
import homePage from "../PageObjects/HomePage";

describe('SDET Challenge', ()=> {
    it('Find Fake Gold', ()=> {
        //Navigate to Home Page
        cy.visit(`${Cypress.env('baseUrl')}`, {timeout: 10000});

        //Call findFake function to find the fake bar
        cy.findFake();
    })
})
