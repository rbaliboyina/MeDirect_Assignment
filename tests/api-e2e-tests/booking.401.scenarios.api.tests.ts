import { test, expect, request } from "@playwright/test";
import { APIClient } from "../core/apiClient";
import { AuthService } from "../services/authService";
import { BookingService } from "../services/bookingService";
import { HTTP_STATUS } from "../constants/httpStatus";
import { faker } from "@faker-js/faker";
import { API_CRED } from "../config/api.cred";

let baseURL!: string;

test.describe("Booking API Tests", () => {
  let apiClient: APIClient;
  let authService: AuthService;
  let bookingService: BookingService;
  let bookingId!: number;
  let firstName: string;
  let lastName: string;
  let totalPrice: number;

  test.beforeAll(async () => {
    baseURL = test.info().project.use.baseURL ?? "";
    apiClient = new APIClient(baseURL);
    await apiClient.init();
    authService = new AuthService(apiClient);
    bookingService = new BookingService(apiClient);
    //await authService.login(API_CRED.USERNAME, API_CRED.PASSWORD);
  });

  test("Create a new Booking - POST /booking", async () => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();

    const bookingData = {
      firstname: firstName,
      lastname: lastName,
      totalprice: faker.number.int({ min: 100, max: 500 }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: faker.date.future().toISOString().split("T")[0],
        checkout: faker.date.future({ years: 1 }).toISOString().split("T")[0],
      },
      additionalneeds: faker.helpers.arrayElement([
        "Breakfast",
        "Lunch",
        "Dinner",
      ]),
    };
    const response = await bookingService.createBooking(bookingData);
    const responeBody = await response.json();
    bookingId = responeBody.bookingid;
    expect.soft(response.status()).toBe(HTTP_STATUS.UNAUTHORIZED);
  });

  test("Get booking details - GET /booking/bookingid", async () => {
    const response = await bookingService.getBooking(bookingId);
    expect.soft(response.status()).toBe(HTTP_STATUS.UNAUTHORIZED);
  });

  test("Get all bookings - GET /booking", async () => {
    const response = await bookingService.getAllBooking();
    console.log("response ", response);

    expect.soft(response.status()).toBe(HTTP_STATUS.UNAUTHORIZED);
  });

  test("Update booking details - PUT /booking/bookingid", async () => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    const updatedData = {
      firstname: firstName,
      lastname: lastName,
      totalprice: faker.number.int({ min: 100, max: 500 }), // Random price
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: faker.date.future().toISOString().split("T")[0], // Random future date
        checkout: faker.date.future({ years: 1 }).toISOString().split("T")[0], // Checkout after a year
      },
      additionalneeds: faker.helpers.arrayElement([
        "Breakfast",
        "Lunch",
        "Dinner",
      ]),
    };

    const response = await bookingService.updateBooking(bookingId, updatedData);
    console.log("response ", response);

    expect.soft(response.status()).toBe(HTTP_STATUS.UNAUTHORIZED);
  });

  test("Partial update booking - PATCH /booking/bookingid", async () => {
    totalPrice = faker.number.int({ min: 100, max: 500 });
    const partialData = {
      totalprice: totalPrice,
    };

    const response = await bookingService.partialUpdateBooking(
      bookingId,
      partialData
    );
    console.log("response ", response);
    expect.soft(response.status()).toBe(HTTP_STATUS.UNAUTHORIZED);
  });

  test("Delete booking - DELETE /booking/bookingid", async () => {
    const response = await bookingService.deleteBooking(bookingId);
    console.log("response ", response);

    expect.soft(response.status()).toBe(HTTP_STATUS.UNAUTHORIZED);
  });
});
