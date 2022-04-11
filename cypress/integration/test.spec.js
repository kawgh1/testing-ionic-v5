// made this file up, wasn't included

// Mobile Testing

describe("Mobile Testing", () => {
    beforeEach(() => {
        // make each test have a viewport size of an iphone 5
        cy.viewport("iphone-5");
    });
    it("visits list page", () => {
        cy.visit("/");
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
