// ***********************************************
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

import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

// initialize 3 Todos before each test
Cypress.Commands.add("initTodos", () => {
    cy.visit("/", {
        onBeforeLoad() {
            const arr = ["First Todo", "Second Todo", "Third Todo"];
            Storage.set({ key: "mytodos", value: JSON.stringify(arr) });
        },
    });
});

// Clear todos after each test
Cypress.Commands.add("clearTodos", () => {
    cy.visit("/", {
        onBeforeLoad() {
            Storage.remove({ key: "mytodos" });
        },
    });
});
