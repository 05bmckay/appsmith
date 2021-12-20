import gitSyncLocators from "../../../../locators/gitSyncLocators";

let repoName;
describe("Git Disconnect modal", function() {
  before(() => {
    cy.generateUUID().then((uid) => {
      repoName = uid;
      cy.createTestGithubRepo(repoName);
    });
  });

  it("modal should be opened with proper components", function() {
    cy.connectToGitRepo(repoName, false);
    cy.get("[data-cy=t--tab-GIT_CONNECTION]").click();

    // after clicked disconnect on connection modal,
    // it should be closed and disconnect modal should be opened
    cy.get(gitSyncLocators.disconnectIcon).click();
    cy.get(gitSyncLocators.gitSyncModal).should("not.exist");
    cy.get(gitSyncLocators.disconnectGitModal).should("exist");

    // title and info text checking
    cy.get(gitSyncLocators.disconnectGitModal).contains(
      Cypress.env("MESSAGES").GIT_DISCONNECTION_SUBMENU(),
    );
    cy.get(gitSyncLocators.disconnectGitModal).contains(
      Cypress.env("MESSAGES").NONE_REVERSIBLE_MESSAGE(),
    );

    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const { name } = state.ui.gitSync.disconnectingGitApp;
        cy.get(gitSyncLocators.disconnectGitModal).contains(
          Cypress.env("MESSAGES").DISCONNECT_FROM_GIT(name),
        );
        cy.get(gitSyncLocators.disconnectGitModal).contains(
          Cypress.env("MESSAGES").TYPE_PROMO_CODE(name),
        );
      });

    // disconnect button should be disabled
    cy.get(gitSyncLocators.disconnectButton).should("be.disabled");
    cy.get(gitSyncLocators.closeDisconnectModal).click();
  });

  it("Validate of disconnect button enabling", function() {
    cy.connectToGitRepo(repoName, false);
    cy.get("[data-cy=t--tab-GIT_CONNECTION]").click();

    // after clicked disconnect on connection modal,
    // it should be closed and disconnect modal should be opened
    cy.get(gitSyncLocators.disconnectIcon).click();
    cy.get(gitSyncLocators.disconnectButton).should("be.disabled");

    cy.get(gitSyncLocators.disconnectAppNameInput).type(
      `{selectAll}${repoName}`,
    );
    cy.get(gitSyncLocators.disconnectButton).should("be.disabled");

    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const { name } = state.ui.gitSync.disconnectingGitApp;
        cy.get(gitSyncLocators.disconnectAppNameInput).type(
          `{selectAll}${name}`,
        );
        cy.get(gitSyncLocators.disconnectButton).should("be.enabled");
      });

    // disconnecting validation
    cy.route("POST", "api/v1/git/disconnect/*").as("disconnect");
    cy.get(gitSyncLocators.disconnectButton).click();
    cy.wait("@disconnect").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );

    // validation store after disconnected
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const { id, name } = state.ui.gitSync.disconnectingGitApp;
        expect(name).to.eq("");
        expect(id).to.eq("");
      });

    cy.get(gitSyncLocators.disconnectGitModal).should("not.exist");
  });

  after(() => {
    cy.deleteTestGithubRepo(repoName);
  });
});
