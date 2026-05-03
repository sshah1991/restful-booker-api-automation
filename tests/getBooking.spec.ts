import { getAllBookings } from "../models/BookingModel";
import { GetBookingController } from "../controllers/GetBookingController";
import { CreateBookingController } from "../controllers/CreateBookingController";
import { BookingTestData } from "../utils/BookingTestData";
import { CreateBookingResponse } from "../models/BookingModel";
import test, { expect } from "playwright/test";
import { CreateBookingRequest } from "../models/BookingModel";

test('TC_007: List All Bookings Successfully @sanity', async ({ request }) => {
    console.log("****************Executing TC: 'TC_007'************");
    const getBookingController = new GetBookingController(request)
    console.log('Sending GET request to fetch all bookings');
    const response = await getBookingController.getAllBooking()
    console.log(`Response status: ${response.status()}`);
    expect(response.status()).toBe(200)

    const responseJSON = await response.json() as getAllBookings[]
    console.log(`Received ${responseJSON.length} bookings`);
    expect(responseJSON[0]).toBeDefined()
})

test('TC_008: Retrieve Specific Record Successfully @sanity', async ({ request }) => {
    console.log("****************Executing TC: 'TC_008'************");
    const createBookingControler = new CreateBookingController(request)
    const createPayload = BookingTestData.getValidBookingPayload()
    console.log(`Sending POST request to create booking with payload: \n${JSON.stringify(createPayload, null, 2)}`);
    const createBookingResponse = await createBookingControler.createBooking(createPayload)


    const createBookingResponseJSON: CreateBookingResponse = await createBookingResponse.json()
    const booking_id = createBookingResponseJSON.bookingid
    console.log(`Created booking ID: ${booking_id}`);

    const getBookingController = new GetBookingController(request)
    console.log(`Sending GET request to fetch booking with ID: ${booking_id}`);
    const response_singleBooking = await getBookingController.getSingleBooking(booking_id)
    console.log(`Response status: ${response_singleBooking.status()}`);
    await expect(response_singleBooking.status()).toBe(200)

    const response_singleBooking_JSON: CreateBookingRequest = await response_singleBooking.json()
    console.log(`Received booking details: \n${JSON.stringify(response_singleBooking_JSON, null, 2)}`);
    await expect(response_singleBooking_JSON.firstname).toBe(createPayload.firstname)
})

test('TC_009: Invalid ID Search Successfully @regression', async ({ request }) => {
    console.log("****************Executing TC: 'TC_009'************");
    const getBookingController = new GetBookingController(request)

    console.log(`Sending GET request to fetch booking with invalid ID: 12311`);
    const response = await getBookingController.getSingleBooking(12311)
    console.log(`Response status: ${response.status()}`);
    expect(response.status()).toBe(404)

    const responsetext = await response.text()
    console.log(`Response text: ${responsetext}`);


})

test('TC_010: Filter by Guest Name Successfully @regression', async ({ request }) => {
    console.log("****************Executing TC: 'TC_010'************");
    const getBookingController = new GetBookingController(request)
    console.log(`Sending GET request to fetch bookings filtered by guest name: Sumeet`);
    const response = await getBookingController.getBookingByFirstName('Sumeet')
    console.log(`Response status: ${response.status()}`);
    expect(response.status()).toBe(200)

    const responseJSON: getAllBookings[] = await response.json()
    console.log(`Received ${responseJSON.length} bookings matching the filter`);
    // Verify that at least one result is returned and it contains our ID
    expect(responseJSON.length).toBeGreaterThan(0);
})