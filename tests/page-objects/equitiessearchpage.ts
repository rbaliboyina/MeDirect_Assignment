import { Page, expect } from "@playwright/test";

export class EquitiesSearchPage {
  private page: Page;

  // Selectors
  private securityTypes = "div.me-navigation-tabs a>span";
  private resultsList = "table tr.me-tbl-row td:nth-child(1) div.asset-type-eq";
  private noDataList = "table tr";
  private searchInput = 'input[placeholder="Enter name, ISIN, or ticker"]';
  private moreInfoButton = "table tr.me-tbl-row td:nth-child(5) button";
  private restrictedMessage = 'div[class="hidden md:block w-1/2 text-right"]';
  private acceptPopup = "button.iubenda-cs-accept-btn:has-text('Accept')";

  constructor(page: Page) {
    this.page = page;
  }

  async visit(url: string) {
    await this.page.goto(url);
    await this.page.locator(this.acceptPopup).click();
  }

  async navigateToSecurityType(index: number) {
    const securityType = this.page.locator(this.securityTypes).nth(index);
    await securityType.click();
  }

  async verifyEquitiesListIsVisible(content: string) {
    const elements = await this.page.locator(this.resultsList).all();
    for (const element of elements) {
      const text = await element.innerText();
      console.log(`Element text: ${text}`);
      expect(text).toContain(content);
    }
  }

  async searchEquity(equityName: string) {
    await this.page.fill(this.searchInput, equityName);
  }

  async clickMoreInformation() {
    await this.page.click(this.moreInfoButton);
  }

  async verifyRestrictedMessage() {
    await expect(this.page.locator(this.restrictedMessage)).toBeVisible();
  }

  async verifyNoResultsFound() {
    // const count = this.page.locator(this.noDataList).count();
    //  expect(count).toBe(1);

    await this.page.waitForTimeout(3000); // Wait for 3 seconds
    await expect(this.page.locator(this.noDataList)).toHaveCount(1);
  }
}
