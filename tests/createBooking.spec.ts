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
    console.log("bookingID fetched is: ", responseJSON.bookingid)
    console.log(responseJSON)

})

test('TC_005: Schema Data Integrity Successfully @sanity', async ({ request }) => {
    const createBookingController = new CreateBookingController(request)
    const payload = BookingTestData.getValidBookingPayload()

    const response = await createBookingController.createBooking(payload)

    const responseJSON: CreateBookingResponse = await response.json()
    //add the assertions
    expect(typeof responseJSON.bookingid).toBe('number')
    console.log("bookingID= ", responseJSON.bookingid)

    expect(typeof responseJSON.booking.firstname).toBe('string')
    console.log("firstname= ", responseJSON.booking.firstname)

    expect(typeof responseJSON.booking.lastname).toBe('string')
    console.log("lastname= ", responseJSON.booking.lastname)

    expect(typeof responseJSON.booking.totalprice).toBe('number')
    console.log("totalprice= ", responseJSON.booking.totalprice)

    expect(typeof responseJSON.booking.depositpaid).toBe('boolean')
    console.log("depositpaid= ", responseJSON.booking.depositpaid)

    expect(typeof responseJSON.booking.bookingdates.checkin).toBe('string')
    console.log("checkin= ", responseJSON.booking.bookingdates.checkin)

    expect(typeof responseJSON.booking.bookingdates.checkout).toBe('string')
    console.log("checkout= ", responseJSON.booking.bookingdates.checkout)

    expect(typeof responseJSON.booking.additionalneeds).toBe('string')
    console.log("additionalneeds= ", responseJSON.booking.additionalneeds)

})

test('TC_006: Reject Missing Fields Successfully @regression',async({request})=>{
    console.log("Executing TC_006")
    const createBookingController= new CreateBookingController(request)
    const payload= BookingTestData.getMandatotyFeildMissingPayload()
    const respose=await createBookingController.createBooking(payload as any)// as this is a negetive TC
    expect(respose.status()).toBe(500)
})