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
        const authResponse = await authController.createToken(credentials);
        const authJSON: AuthResponse = await authResponse.json();
        token = authJSON.token;

        // 2. Setup initial data (Create a booking to be updated)
        const createController = new CreateBookingController(request);
        const initialPayload: CreateBookingRequest = BookingTestData.getValidBookingPayload();
        const createResponse = await createController.createBooking(initialPayload);
        const createJSON: CreateBookingResponse = await createResponse.json();
        
        bookingID = createJSON.bookingid;
        console.log(`PRE-CONDITION: Token and Booking ID ${bookingID} initialized.`);
    });

    test('TC_012: Full Update (PUT) Successfully @sanity', async ({ request }) => {
        const updateController = new UpdateBookingController(request);
        
        // Use your specific Update Payload
        const updatePayload: PutUpdate = BookingTestData.PUTValidBookingUpdatePayload();

        // Perform the Update
        const response = await updateController.updateUsingPUT(bookingID, token, updatePayload);
        
        // Assertions
        expect(response.status()).toBe(200);
        
        const responseJSON: CreateBookingRequest = await response.json();
        expect(responseJSON.firstname).toBe("Abla");
        expect(responseJSON.lastname).toBe("Tabla");
        
        console.log(`VERIFICATION: Booking ${bookingID} updated to ${responseJSON.firstname} ${responseJSON.lastname}`);
    });

    /**
     * You can now easily add more tests without repeating the setup!
     */
    test('TC_013: Update with Invalid Token should fail @regression', async ({ request }) => {
        const updateController = new UpdateBookingController(request);
        const updatePayload = BookingTestData.PUTValidBookingUpdatePayload();

        const response = await updateController.updateUsingPUT(bookingID, "invalid_token_123", updatePayload);
        
        // Restful Booker typically returns 403 Forbidden for bad tokens
        expect(response.status()).toBe(403);
    });
});