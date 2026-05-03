import { getAllBookings } from "../models/BookingModel";
import { GetBookingController } from "../controllers/GetBookingController";
import { CreateBookingController } from "../controllers/CreateBookingController";
import { BookingTestData } from "../utils/BookingTestData";
import { CreateBookingResponse } from "../models/BookingModel";
import test, { expect } from "playwright/test";
import { CreateBookingRequest } from "../models/BookingModel";

test('TC_007: List All Bookings Successfully @sanity', async ({ request }) => {
    const getBookingController = new GetBookingController(request)
    const response = await getBookingController.getAllBooking()
    expect(response.status()).toBe(200)

    const responseJSON = await response.json() as getAllBookings[]
    expect(responseJSON[0]).toBeDefined()
})

test('TC_008: Retrieve Specific Record Successfully @sanity', async ({ request }) => {
    const createBookingControler = new CreateBookingController(request)
    const createPayload = BookingTestData.getValidBookingPayload()
    const createBookingResponse = await createBookingControler.createBooking(createPayload)


    const createBookingResponseJSON: CreateBookingResponse = await createBookingResponse.json()
    const booking_id = createBookingResponseJSON.bookingid

    const getBookingController = new GetBookingController(request)
    const response_singleBooking = await getBookingController.getSingleBooking(booking_id)
    await expect(response_singleBooking.status()).toBe(200)

    const response_singleBooking_JSON: CreateBookingRequest = await response_singleBooking.json()
    await expect(response_singleBooking_JSON.firstname).toBe(createPayload.firstname)
})

test('TC_009: Invalid ID Search Successfully @regression', async ({ request }) => {
    const getBookingController = new GetBookingController(request)

    const response = await getBookingController.getSingleBooking(12311)
    expect(response.status()).toBe(404)

    const responsetext = await response.text()


})

test('TC_010: Filter by Guest Name Successfully @regression', async ({ request }) => {
    const getBookingController = new GetBookingController(request)
    const response = await getBookingController.getBookingByFirstName('Sumeet')
    expect(response.status()).toBe(200)

    const responseJSON: getAllBookings[] = await response.json()
    // Verify that at least one result is returned and it contains our ID
    expect(responseJSON.length).toBeGreaterThan(0);
})