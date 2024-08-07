// ***********************************************
import homePage from "../PageObjects/HomePage";
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillCells', (side, bars) => 
    {  
        bars.forEach(elem=> {
            homePage.fillCell(side, elem);
        })
    }
)

Cypress.Commands.add('findFake', () => 
    {  
        let result = -1;

        let bars = [0,1,2,3,4,5,6,7];
        let left;
        let right;
        
        // Binary search by 3 times to find the fake bar
        cy.get([1,2,3]).each(round=> {
            cy.then(()=> {
                if (result == 8)
                    return;

                //assign left and right lists
                left = bars.slice(0,bars.length/2);
                right = bars.slice(bars.length/2, bars.length);
                
                cy.log("LEFT = " + left);
                cy.log("RIGHT = " + right);

                cy.fillCells("left", left);
                cy.fillCells("right", right);
                
                homePage.weighButton().click();
                
                //Wait until results appears for the current round
                homePage.roundResults(round);

                //Reset Results
                homePage.resetButton().click();
                
                //Determine left and right based on the current result
                homePage.roundResults(round).invoke('text').then(data=> {
                    // get the sign (<, >, =) for the current round                    
                    const sign = data[data.indexOf("] ")+2];
                    
                    cy.log("SIGN = " + sign);
                    
                    if (sign == ">") {
                        bars = right;
                    } else 
                    if (sign == "<") {
                        bars = left;
                    } else {
                        result = 8;
                        return cy.wrap(false, {log:false})
                    }
                    if (bars.length == 1) {
                        result = bars[0];
                        return cy.wrap(bars, result);    
                    }        
                    return cy.wrap(bars);
                })
            })
            
        }).then(()=> {
            homePage.getCoin(result).click();
        })    
    }
)