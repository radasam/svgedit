import { visitAndApproveStorage } from "../../support/ui-test-helper.js";

describe("UI - Zoom tool", function() {
  beforeEach(() => {
    visitAndApproveStorage();
  });

  it("should be able to open", function() {
    cy.get("#zoom")
      .click()
      .shadow()
      .find("#options-container")
      .should("have.css", "display", "flex");
  });

  it("should be able to close", function() {
    cy.get("#zoom")
      .click()
      .shadow()
      .find("#options-container")
      .should("have.css", "display", "flex");

    cy.get("#tool_select")
      .click()
      .get("#zoom")
      .shadow()
      .find("#options-container")
      .should("have.css", "display", "none");
  });

  it("should be able to input zoom level", function() {
    cy.get("#canvasBackground")
      .invoke("attr", "width")
      .then(width => {
        cy.get("#zoom")
          .shadow()
          .find("input")
          .type("200");
        cy.get("#canvasBackground")
          .invoke("attr", "width")
          .should("equal", (width * 2).toString());
      });
  });

  it("should be able to increment zoom level", function() {
    cy.get("#canvasBackground")
      .invoke("attr", "width")
      .then(width => {
        cy.get("#zoom")
          .shadow()
          .find("#arrow-up")
          .click();
        cy.get("#canvasBackground")
          .invoke("attr", "width")
          .should("equal", (width * 1.1).toString());
      });
  });

  it("should be able to decrement zoom level", function() {
    cy.get("#canvasBackground")
      .invoke("attr", "width")
      .then(width => {
        cy.get("#zoom")
          .shadow()
          .find("#arrow-down")
          .click();
        cy.get("#canvasBackground")
          .invoke("attr", "width")
          .should("equal", (width * 0.9).toString());
      });
  });

  it("should be able to select from popup", function() {
    cy.get("#canvasBackground")
      .invoke("attr", "width")
      .then(width => {
        cy.get("#zoom")
          .click()
          .find("se-text")
          .first()
          .click({ force: true })
          .invoke("attr", "value")
          .then(value => {
            cy.get("#canvasBackground")
              .invoke("attr", "width")
              .should("equal", (width * (value / 100)).toString())
              .toString();
          });
      });
  });

  it("should be able to resize to fit the current selection", function() {
    cy.get("#tool_path").click({ force: true });
    cy.get("#svgcontent")
      .trigger("mousedown", 50, 50, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 100, 50, { force: true })
      .trigger("mousedown", 100, 50, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 75, 150, { force: true })
      .trigger("mousedown", 75, 150, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 0, 0, { force: true })
      .trigger("mousedown", 0, 0, { force: true })
      .trigger("mouseup", { force: true });

    cy.get("#tool_select")
      .click({ force: true })
      .trigger("mousedown", 50, 50, { force: true })
      .trigger("mousemove", 100, 50, { force: true })
      .trigger("mouseup", { force: true });

    cy.get("#canvasBackground")
      .invoke("attr", "width")
      .then(width => {
        cy.get("#zoom")
          .click()
          .find("se-text[value='layer']")
          .click({ force: true });
        cy.get("#zoom")
          .invoke("attr", "value")
          .then(value => {
            cy.get("#canvasBackground")
              .invoke("attr", "width")
              .should("equal", (width * (149 / 100)).toString())
              .toString();
          });
      });
  });

  it("should be able to resize to fit the canvas", function() {
    cy.get("#canvasBackground")
      .invoke("attr", "width")
      .then(width => {
        cy.get("#zoom")
          .click()
          .find("se-text[value='canvas']")
          .click({ force: true });
        cy.get("#zoom")
          .invoke("attr", "value")
          .then(value => {
            cy.get("#canvasBackground")
              .invoke("attr", "width")
              .should("equal", (width * (61 / 100)).toString())
              .toString();
          });
      });
  });

  it("should be able to resize to fit the current layer", function() {
    cy.get("#tool_path").click({ force: true });
    cy.get("#svgcontent")
      .trigger("mousedown", 50, 50, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 100, 50, { force: true })
      .trigger("mousedown", 100, 50, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 75, 150, { force: true })
      .trigger("mousedown", 75, 150, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 0, 0, { force: true })
      .trigger("mousedown", 0, 0, { force: true })
      .trigger("mouseup", { force: true });

    cy.get("#canvasBackground")
      .invoke("attr", "width")
      .then(width => {
        cy.get("#zoom")
          .click()
          .find("se-text[value='layer']")
          .click({ force: true });
        cy.get("#zoom")
          .invoke("attr", "value")
          .then(value => {
            cy.get("#canvasBackground")
              .invoke("attr", "width")
              .should("equal", (width * (194 / 100)).toString())
              .toString();
          });
      });
  });

  it("should be able to resize to fit the current content", function() {
    cy.get("#tool_path").click({ force: true });
    cy.get("#svgcontent")
      .trigger("mousedown", 50, 50, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 100, 50, { force: true })
      .trigger("mousedown", 100, 50, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 75, 150, { force: true })
      .trigger("mousedown", 75, 150, { force: true })
      .trigger("mouseup", { force: true })
      .trigger("mousemove", 0, 0, { force: true })
      .trigger("mousedown", 0, 0, { force: true })
      .trigger("mouseup", { force: true });

    cy.get("#canvasBackground")
      .invoke("attr", "width")
      .then(width => {
        cy.get("#zoom")
          .click()
          .find("se-text[value='content']")
          .click({ force: true });
        cy.get("#zoom")
          .invoke("attr", "value")
          .then(value => {
            cy.get("#canvasBackground")
              .invoke("attr", "width")
              .should("equal", (width * (194 / 100)).toString())
              .toString();
          });
      });
  });
});
