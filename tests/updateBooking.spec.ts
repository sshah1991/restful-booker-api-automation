import { test, expect } from "@playwright/test";
import { AuthController } from "../controllers/AuthController";
import { CreateBookingController } from "../controllers/CreateBookingController";
import { UpdateBookingController } from "../controllers/UpdateBookingController";
import { AuthRequest, AuthResponse } from "../models/AuthModel";
import { CreateBookingRequest, CreateBookingResponse } from "../models/BookingModel";
import { BookingTestData } from "../utils/BookingTestData";
import { PutUpdate } from "../models/UpdateModel";

test.describe('Booking Update Operations', () => {

    // Variables declared in the describe scope so they are accessible to all tests
    let token: string;
    let bookingID: number;

    /**
     * Runs before each test case to provide a fresh token and booking
     */
    test.beforeEach(async ({ request }) => {
        // 1. Setup Auth
        const authController = new AuthController(request);
        const credentials: AuthRequest = {
            username: "admin",
            password: "password123"
        };
        console.log(`Sending POST request to generate auth token with credentials: \n${JSON.stringify(credentials, null, 2)}`);
        const authResponse = await authController.createToken(credentials);
        const authJSON: AuthResponse = await authResponse.json();
        token = authJSON.token;
        console.log(`Received token: ${token}`);

        // 2. Setup initial data (Create a booking to be updated)
        const createController = new CreateBookingController(request);
        const initialPayload: CreateBookingRequest = BookingTestData.getValidBookingPayload();
        console.log(`Sending POST request to create initial booking with payload: \n${JSON.stringify(initialPayload, null, 2)}`);
        const createResponse = await createController.createBooking(initialPayload);
        const createJSON: CreateBookingResponse = await createResponse.json();
        
        bookingID = createJSON.bookingid;
        console.log(`Created booking ID: ${bookingID}`);
    });

    test('TC_012: Full Update (PUT) Successfully @sanity', async ({ request }) => {
        console.log("****************Executing TC: 'TC_012'************");
        const updateController = new UpdateBookingController(request);
        
        // Use your specific Update Payload
        const updatePayload: PutUpdate = BookingTestData.PUTValidBookingUpdatePayload();

        // Perform the Update
        console.log(`Sending PUT request to update booking ID ${bookingID} with payload: \n${JSON.stringify(updatePayload, null, 2)}`);
        const response = await updateController.updateUsingPUT(bookingID, token, updatePayload);
        
        // Assertions
        console.log(`Response status: ${response.status()}`);
        expect(response.status()).toBe(200);
        
        const responseJSON: CreateBookingRequest = await response.json();
        console.log(`Received updated booking details: \n${JSON.stringify(responseJSON, null, 2)}`);
        expect(responseJSON.firstname).toBe("Abla");
        expect(responseJSON.lastname).toBe("Tabla");
        
    });

    test('TC_013: Update with Invalid Token should fail @regression', async ({ request }) => {
        console.log("****************Executing TC: 'TC_013'************");
        const updateController = new UpdateBookingController(request);
        const updatePayload = BookingTestData.PUTValidBookingUpdatePayload();

        console.log(`Sending PUT request to update booking ID ${bookingID} with invalid token and payload: \n${JSON.stringify(updatePayload, null, 2)}`);
        const response = await updateController.updateUsingPUT(bookingID, "invalid_token_123", updatePayload);
        
        // Restful Booker typically returns 403 Forbidden for bad tokens
        console.log(`Response status: ${response.status()}`);
        expect(response.status()).toBe(403);
    });

    test('TC_015: Partial Update (PATCH) Successfully @sanity',async({request})=>{
         console.log("****************Executing TC: 'TC_015'************");
         const updateBookingControler= new UpdateBookingController(request)
         const payload= BookingTestData.ValidPatchPayload()
         console.log(`Sending PATCH request to update booking ID ${bookingID} with payload: \n${JSON.stringify(payload, null, 2)}`);
         const response= await updateBookingControler.updateUsingPATCH(bookingID,token,payload)
         console.log(`Response status: ${response.status()}`);
         expect(response.status()).toBe(200)

         const response_JSON: CreateBookingRequest= await response.json()
         console.log(`Received updated booking details: \n${JSON.stringify(response_JSON, null, 2)}`);
         expect(response_JSON.firstname).toBe('Babla')

    })
    
});