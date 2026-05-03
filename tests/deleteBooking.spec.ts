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
        // 1. Get Admin Token
        const authController = new AuthController(request);
        const credentials: AuthRequest = {
            username: "admin",
            password: "password123"
        };
        const authResponse = await authController.createToken(credentials);
        const authJSON: AuthResponse = await authResponse.json();
        token = authJSON.token;

        // 2. Create a booking to be deleted
        const createController = new CreateBookingController(request);
        const initialPayload: CreateBookingRequest = BookingTestData.getValidBookingPayload();
        const createResponse = await createController.createBooking(initialPayload);
        const createJSON: CreateBookingResponse = await createResponse.json();
        
        bookingID = createJSON.bookingid;
    })

    test('TC_016: Delete Booking Successfully @sanity',async({request})=>{
       const deleteController = new DeleteBookingController(request);

        // Action: Perform the DELETE
        const deleteResponse = await deleteController.DeleteBooking(bookingID, token);

        // Assertion: Restful Booker uses 201 for success
        expect(deleteResponse.status()).toBe(201);
        
        // Verification: Try to fetch the deleted booking
        const getResponse = await request.get(`/booking/${bookingID}`);
        expect(getResponse.status()).toBe(404);

    })
})