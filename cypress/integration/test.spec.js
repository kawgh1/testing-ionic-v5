// made this file up, wasn't included

// Mobile Testing

describe("Mobile Testing", () => {
    beforeEach(() => {
        // make each test have a viewport size of an iphone 5
        cy.viewport("iphone-5");
    });
    it("visits list page", () => {
        cy.visit("/");
        // look for this text on page, set to fail
        // cy.contains("Whatever");
        cy.get("ion-title").contains("List");
    });

    it("visits home page", () => {
        cy.visit("/home");
        // look for this text on page, set to fail
        // cy.contains("Whatever");
        cy.get("ion-title").contains("Home");
    });

    it("visits list page shows a card and no list as default", () => {
        cy.visit("/");
        // look for this text on page, set to fail
        // cy.contains("Whatever");
        cy.get("ion-card").should("exist");
        cy.get("[data-cy=add-btn]").should("exist");
        cy.get("ion-list").should("not.exist");
    });

    // functionality testing

    // test add todo
    it("click add adds a todo", () => {
        cy.visit("/");
        cy.get("ion-list").should("not.exist");
        cy.get("ion-card").should("exist");
        // dont use ion-input, use regular input
        cy.get("input").click().type("My first todo");
        cy.get("[data-cy=add-btn]").click();
        // once todo added, todo list should now exist
        cy.get("ion-list").should("exist");
        // and ion-card should not exist
        cy.get("ion-card").should("not.exist");
    });

    // test add todo and click it
    it("click add adds a todo", () => {
        cy.visit("/");
        // dont use ion-input, use regular input
        cy.get("input").click().type("My first todo");
        // add todo
        cy.get("[data-cy=add-btn]").click();
        // then we click the todo we just created
        cy.get("ion-item-sliding ion-item").first().click();
        // should now be on the home page, check if 'home' in title
        cy.get("ion-title").contains("Home");
    });

    //////// cypress/support/commands.js

    it("has todos", () => {
        cy.clearTodos();
        cy.initTodos();
        cy.get("ion-item-sliding").should("have.length", "3");
    });

    /////// test CSS Properties - click 'dark' mode

    it("enables dark mode", () => {
        cy.visit("/");
        // note rgba(0, 0, 0, 0) is transparent
        cy.get("ion-content").should(
            "have.css",
            "background-color",
            "rgba(0, 0, 0, 0)"
        );
        cy.get("[data-cy=dark-toggle]").click();
        // fail
        // cy.get("ion-content").should("have.css", "color", "rgb(123, 123, 123)");
        // watch out for spacing between rgb values,
        // it will fail the test if they dont match
        cy.get("ion-content").should(
            "have.css",
            "background-color",
            "rgb(0, 0, 0)"
        );
        // click again, check light mode

        cy.get("[data-cy=dark-toggle]").click();
        cy.get("ion-content").should(
            "have.css",
            "background-color",
            "rgba(0, 0, 0, 0)"
        );
    });
});

//

// Desktop Testing

// describe("Desktop Testing", () => {
//     // no viewport constraints === full size window browser
//     it("visits list page", () => {
//         cy.visit("/");
//     });
// });
