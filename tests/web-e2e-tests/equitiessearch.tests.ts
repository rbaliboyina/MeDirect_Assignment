import { test, expect } from "@playwright/test";
import { EquitiesSearchPage } from "../page-objects/equitiessearchpage";

let baseURL!: string;
test.beforeAll(async () => {
  baseURL = test.info().project.use.baseURL ?? "";
});

test.describe("Equities Search Page Tests", () => {
  test("Navigational test for security types and verify equities list is shown", async ({
    page,
  }) => {
    const equitiesPage = new EquitiesSearchPage(page);
    await equitiesPage.visit(baseURL);

    await equitiesPage.navigateToSecurityType(0);
    await equitiesPage.verifyEquitiesListIsVisible("FND");

    // Navigate to second security type that is Equities
    await equitiesPage.navigateToSecurityType(1);
    await equitiesPage.verifyEquitiesListIsVisible("EQ");
  });

  test("Search for a popular equity and click on 'More Information'", async ({
    page,
  }) => {
    const equitiesPage = new EquitiesSearchPage(page);
    await equitiesPage.visit(baseURL);

    await equitiesPage.searchEquity("1911 Gold Corp");
    await equitiesPage.clickMoreInformation();
  });

  test("Ensure detailed security details are not visible to the public", async ({
    page,
  }) => {
    const equitiesPage = new EquitiesSearchPage(page);
    await equitiesPage.visit(baseURL);

    await equitiesPage.searchEquity("1911 Gold Corp");
    await equitiesPage.clickMoreInformation();
    await equitiesPage.verifyRestrictedMessage();
  });

  test("Search for an equity that doesn’t exist and ensure the list is empty", async ({
    page,
  }) => {
    const equitiesPage = new EquitiesSearchPage(page);
    await equitiesPage.visit(baseURL);

    await equitiesPage.searchEquity("UnknownStock123");
    await equitiesPage.verifyNoResultsFound();
  });
});
