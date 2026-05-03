import { expect, request, test } from "playwright/test";
import { CreateBookingController } from "../controllers/CreateBookingController";
import { CreateBookingRequest, CreateBookingResponse, BookingDates } from "../models/BookingModel";
import { BaseController } from "../controllers/BaseController";
import { BookingTestData } from "../utils/BookingTestData";

test('TC_004: Create New Booking Successfully @smoke', async ({ request }) => {
    console.log("****************Executing TC: 'TC_004'************");
    const createBookingController = new CreateBookingController(request)

    // 1. Prepare Test Data using the BookingRequest Model fetched from Booking TestData
    const payload: CreateBookingRequest = BookingTestData.getValidBookingPayload()
    // 2. Execute the POST Request via the Controller
    console.log(`Sending POST request to create booking with payload: \n${JSON.stringify(payload, null, 2)}`);
    const response = await createBookingController.createBooking(payload)

    // 3. Validate HTTP Status Code
    console.log(`Response status: ${response.status()}`);
    expect(response.status()).toBe(200)

    const responseJSON: CreateBookingResponse = await response.json()
    console.log(`Received booking ID: ${responseJSON.bookingid}`);
    expect(responseJSON.bookingid).toBeDefined()
    expect(typeof responseJSON.bookingid).toBe('number');

})

test('TC_005: Schema Data Integrity Successfully @sanity', async ({ request }) => {
    console.log("****************Executing TC: 'TC_005'************");
    const createBookingController = new CreateBookingController(request)
    const payload = BookingTestData.getValidBookingPayload()

    console.log(`Sending POST request to create booking for schema validation with payload: \n${JSON.stringify(payload, null, 2)}`);
    const response = await createBookingController.createBooking(payload)
    console.log(`Response status: ${response.status()}`);

    const responseJSON: CreateBookingResponse = await response.json()
    console.log(`Validating schema for response: \n${JSON.stringify(responseJSON, null, 2)}`);
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
    console.log("****************Executing TC: 'TC_006'************");
    const createBookingController= new CreateBookingController(request)
    const payload= BookingTestData.getMandatotyFeildMissingPayload()

    console.log(`Sending POST request with missing mandatory fields: \n${JSON.stringify(payload, null, 2)}`);
    const respose=await createBookingController.createBooking(payload as any)// as this is a negetive TC
    console.log(`Response status: ${respose.status()}`);
    expect(respose.status()).toBe(500)
})