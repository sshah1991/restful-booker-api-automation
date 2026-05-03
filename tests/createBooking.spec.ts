import { expect, request, test } from "playwright/test";
import { CreateBookingController } from "../controllers/CreateBookingController";
import { CreateBookingRequest, CreateBookingResponse, BookingDates } from "../models/BookingModel";
import { BaseController } from "../controllers/BaseController";
import { BookingTestData } from "../utils/BookingTestData";

test('TC_004: Create New Booking Successfully @smoke', async ({ request }) => {
    const createBookingController = new CreateBookingController(request)

    // 1. Prepare Test Data using the BookingRequest Model fetched from Booking TestData
    const payload: CreateBookingRequest = BookingTestData.getValidBookingPayload()
    // 2. Execute the POST Request via the Controller
    const response = await createBookingController.createBooking(payload)

    // 3. Validate HTTP Status Code
    expect(response.status()).toBe(200)

    const responseJSON: CreateBookingResponse = await response.json()
    expect(responseJSON.bookingid).toBeDefined
    expect(typeof responseJSON.bookingid).toBe('number');

})

test('TC_005: Schema Data Integrity Successfully @sanity', async ({ request }) => {
    const createBookingController = new CreateBookingController(request)
    const payload = BookingTestData.getValidBookingPayload()

    const response = await createBookingController.createBooking(payload)

    const responseJSON: CreateBookingResponse = await response.json()
    //add the assertions
    expect(typeof responseJSON.bookingid).toBe('number')

    expect(typeof responseJSON.booking.firstname).toBe('string')

    expect(typeof responseJSON.booking.lastname).toBe('string')

    expect(typeof responseJSON.booking.totalprice).toBe('number')

    expect(typeof responseJSON.booking.depositpaid).toBe('boolean')

    expect(typeof responseJSON.booking.bookingdates.checkin).toBe('string')

    expect(typeof responseJSON.booking.bookingdates.checkout).toBe('string')

    expect(typeof responseJSON.booking.additionalneeds).toBe('string')

})

test('TC_006: Reject Missing Fields Successfully @regression',async({request})=>{
    const createBookingController= new CreateBookingController(request)
    const payload= BookingTestData.getMandatotyFeildMissingPayload()
    const respose=await createBookingController.createBooking(payload as any)// as this is a negetive TC
    expect(respose.status()).toBe(500)
})