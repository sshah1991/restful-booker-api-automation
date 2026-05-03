import { test, expect, request } from "@playwright/test";
import { AuthController } from "../controllers/AuthController";
import { CreateBookingController } from "../controllers/CreateBookingController";
import { DeleteBookingController } from "../controllers/DeleteBookingController";
import { AuthRequest, AuthResponse } from "../models/AuthModel";
import { CreateBookingRequest, CreateBookingResponse } from "../models/BookingModel";
import { BookingTestData } from "../utils/BookingTestData";

test.describe('Delete Operations',()=>{
    let token: string
    let bookingID: number

    test.beforeEach('Create the token and bookingID',async({request})=>{
        // --- ARRANGE PHASE ---
        // Step 1: Authentication - Generate an admin token required to authorize the DELETE operation
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

        // Step 2: Test Data Setup - Create a fresh booking that we can safely delete during the test
        const createController = new CreateBookingController(request);
        const initialPayload: CreateBookingRequest = BookingTestData.getValidBookingPayload();
        console.log(`Sending POST request to create initial booking with payload: \n${JSON.stringify(initialPayload, null, 2)}`);
        const createResponse = await createController.createBooking(initialPayload);
        const createJSON: CreateBookingResponse = await createResponse.json();
        
        bookingID = createJSON.bookingid;
        console.log(`Created booking ID: ${bookingID}`);
    })

    test('TC_016: Delete Booking Successfully @sanity',async({request})=>{
       console.log("****************Executing TC: 'TC_016'************");
       const deleteController = new DeleteBookingController(request);

        // --- ACT PHASE ---
        // Step 3: Execute the DELETE request targeting the newly created booking ID using the auth token
        console.log(`Sending DELETE request to remove booking ID: ${bookingID}`);
        const deleteResponse = await deleteController.DeleteBooking(bookingID, token);

        // --- ASSERT PHASE ---
        // Step 4: Validate that the API responds with a 201 Created (Restful Booker's specific success code for DELETE)
        console.log(`Response status for DELETE: ${deleteResponse.status()}`);
        expect(deleteResponse.status()).toBe(201);
        
        // Step 5: Verify Deletion - Attempt to retrieve the deleted booking via GET and expect a 404 Not Found
        console.log(`Sending GET request to verify deletion of booking ID: ${bookingID}`);
        const getResponse = await request.get(`/booking/${bookingID}`);
        console.log(`Response status for GET (should be 404): ${getResponse.status()}`);
        expect(getResponse.status()).toBe(404);

    })
})