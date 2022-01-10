const testdata = require("../../../../fixtures/testdata.json");
const apiwidget = require("../../../../locators/apiWidgetslocator.json");
const explorer = require("../../../../locators/explorerlocators.json");
const commonlocators = require("../../../../locators/commonlocators.json");
const formWidgetsPage = require("../../../../locators/FormWidgets.json");
const publish = require("../../../../locators/publishWidgetspage.json");
const widgetsPage = require("../../../../locators/Widgets.json");
const dsl = require("../../../../fixtures/formWithInputdsl.json");

const pageid = "MyPage";
before(() => {
  cy.addDsl(dsl);
});

describe("Test Suite to validate copy/delete/undo functionalites", function() {
  it("Drag and drop form widget and validate copy widget via toast message", function() {
    const modifierKey = Cypress.platform === "darwin" ? "meta" : "ctrl";

    cy.openPropertyPane("formwidget");
    cy.widgetText(
      "FormTest",
      formWidgetsPage.formWidget,
      formWidgetsPage.formInner,
    );
    cy.get("body").click();
    cy.get("body").type(`{${modifierKey}}c`);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get(commonlocators.toastBody)
      .first()
      .contains("Copied")
      .click();
    cy.get("body").type(`{${modifierKey}}v`, { force: true });
    cy.wait("@updateLayout").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    cy.get("body").type("{del}", { force: true });
    cy.wait("@updateLayout").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    cy.get("body").type(`{${modifierKey}}z`);
    cy.get(".t--entity-name")
      .contains("FormTestCopy")
      .trigger("mouseover");
    cy.hoverAndClickParticularIndex(4);
    cy.selectAction("Show Bindings");
    cy.get(apiwidget.propertyList).then(function($lis) {
      expect($lis).to.have.length(2);
      expect($lis.eq(0)).to.contain("{{FormTestCopy.isVisible}}");
      expect($lis.eq(1)).to.contain("{{FormTestCopy.data}}");
      cy.contains("FormTestCopy");
      cy.get($lis.eq(1))
        .contains("{{FormTestCopy.data}}")
        .click({ force: true });
      //cy.get('.clipboard-message success')
      //  .contains('Copied to clipboard!')
      //  .should('be.visible');
      cy.wait(10000);
      cy.GlobalSearchEntity("Input1");
      cy.wait(10000);
      cy.get(".bp3-input")
        .first()
        .click({ force: true });
      cy.get(".bp3-input")
        .first()
        .type(`{${modifierKey}}v`, { force: true });
    });
  });
});
