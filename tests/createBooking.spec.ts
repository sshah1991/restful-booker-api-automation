import { expect, test } from "playwright/test";
import { CreateBookingController } from "../controllers/CreateBookingController";
import { CreateBookingRequest, CreateBookingResponse, BookingDates } from "../models/CreateBookingModel";
import { BaseController } from "../controllers/BaseController";
import { BookingTestData } from "../utils/BookingTestData";

test('TC_004: Create New Booking Successfully @smoke', async ({ request }) => {
    const createBookingController = new CreateBookingController(request)

    // 1. Prepare Test Data using the BookingRequest Model fetched from Booking TestData
    const payload: CreateBookingRequest=BookingTestData.getValidBookingPayload()
    // 2. Execute the POST Request via the Controller
    const response= await createBookingController.createBooking(payload)

    // 3. Validate HTTP Status Code
    expect(response.status()).toBe(200)

    const responseJSON= await response.json()
    expect(responseJSON.bookingid).toBeDefined
    expect(typeof responseJSON.bookingid).toBe('number');
    console.log("bookingID fetched is: ",responseJSON.bookingid)
    console.log(responseJSON)

})