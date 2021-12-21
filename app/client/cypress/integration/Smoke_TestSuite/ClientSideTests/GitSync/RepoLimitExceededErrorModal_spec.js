import gitSyncLocators from "../../../../locators/gitSyncLocators";

let repoName1, repoName2, repoName3, repoName4, windowOpenSpy;
describe("Repo Limit Exceeded Error Modal", function() {
  before(() => {
    const uuid = require("uuid");
    repoName1 = uuid.v4().split("-")[0];
    repoName2 = uuid.v4().split("-")[0];
    repoName3 = uuid.v4().split("-")[0];
    repoName4 = uuid.v4().split("-")[0];
  });

  it.only("modal should be opened with proper components", function() {
    cy.createAppAndConnectGit(repoName1, true);
    cy.wait(2000);
    cy.createAppAndConnectGit(repoName2, true, true);
    cy.wait(2000);
    cy.createAppAndConnectGit(repoName3, true, true);
    cy.wait(2000);
    cy.createAppAndConnectGit(repoName4, false);

    cy.get(gitSyncLocators.connectGitBottomBar).click({ force: true });

    cy.get(gitSyncLocators.repoLimitExceededErrorModal).should("exist");

    // title and info text checking
    cy.get(gitSyncLocators.repoLimitExceededErrorModal).contains(
      Cypress.env("MESSAGES").REPOSITORY_LIMIT_REACHED(),
    );
    cy.get(gitSyncLocators.repoLimitExceededErrorModal).contains(
      Cypress.env("MESSAGES").REPOSITORY_LIMIT_REACHED_INFO(),
    );
    cy.get(gitSyncLocators.repoLimitExceededErrorModal).contains(
      Cypress.env("MESSAGES").CONTACT_SUPPORT_TO_UPGRADE(),
    );
    cy.get(gitSyncLocators.contactSalesButton).should("exist");
    cy.get(gitSyncLocators.repoLimitExceededErrorModal).contains(
      Cypress.env("MESSAGES").DISCONNECT_CAUSE_APPLICATION_BREAK(),
    );

    // learn more link checking
    cy.window().then((window) => {
      windowOpenSpy = cy.stub(window, "open").callsFake((url) => {
        expect(url.startsWith("https://docs.appsmith.com/")).to.be.true;
        windowOpenSpy.restore();
      });
    });
    cy.get(gitSyncLocators.learnMoreOnRepoLimitModal).click();

    cy.get(gitSyncLocators.connectedApplication).should("have.length", 3);
    cy.get(gitSyncLocators.diconnectLink).click();

    cy.get(gitSyncLocators.repoLimitExceededErrorModal).should("not.exist");
    cy.get(gitSyncLocators.disconnectGitModal).should("exist");

    cy.request({
      method: "DELETE",
      url: "api/v1/applications/" + repoName1,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(response.body);
      cy.log(response.status);
    });
    cy.request({
      method: "DELETE",
      url: "api/v1/applications/" + repoName2,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(response.body);
      cy.log(response.status);
    });
    cy.request({
      method: "DELETE",
      url: "api/v1/applications/" + repoName3,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(response.body);
      cy.log(response.status);
    });
    cy.request({
      method: "DELETE",
      url: "api/v1/applications/" + repoName4,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(response.body);
      cy.log(response.status);
    });
    cy.deleteTestGithubRepo(repoName1);
    cy.deleteTestGithubRepo(repoName2);
    cy.deleteTestGithubRepo(repoName3);
    // cy.deleteTestGithubRepo(repoName4);
  });

  // after(() => {});
});
