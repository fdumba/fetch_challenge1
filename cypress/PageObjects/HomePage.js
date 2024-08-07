class HomePage {
    //fill specific cell
    static fillCell(side, cell) {
        return cy.get(`input#${side}_${cell}`).type(cell);
    }
    
    static weighButton() {
        return cy.get('#weigh');
    }
    
    static resetButton() {
        return cy.contains("Reset");
    }

    static roundResults(round) {
        return cy.get(`.game-info ol li:nth-child(${round})`);
    }

    static getCoin(result) {
        return cy.get(`#coin_${result}`);
    }
}

export default HomePage;