import { APIClient } from "../core/apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { APIResponse } from "@playwright/test";

export class BookingService {
  constructor(private client: APIClient) {}

  async createBooking(bookingData: object): Promise<APIResponse> {
    return this.client.post(API_ENDPOINTS.CREATE_BOOKING, bookingData);
  }

  async getBooking(bookingId: number): Promise<APIResponse> {
    return this.client.get(API_ENDPOINTS.GET_BOOKING(bookingId));
  }

  async getAllBooking(): Promise<APIResponse> {
    return this.client.get(API_ENDPOINTS.GET_ALLBOOKINGS);
  }

  async updateBooking(
    bookingId: number,
    bookingData: object
  ): Promise<APIResponse> {
    return this.client.put(
      API_ENDPOINTS.UPDATE_BOOKING(bookingId),
      bookingData
    );
  }

  async partialUpdateBooking(
    bookingId: number,
    partialData: object
  ): Promise<APIResponse> {
    return this.client.patch(
      API_ENDPOINTS.UPDATE_BOOKING(bookingId),
      partialData
    );
  }

  async deleteBooking(bookingId: number): Promise<APIResponse> {
    return this.client.delete(API_ENDPOINTS.DELETE_BOOKING(bookingId));
  }
}
