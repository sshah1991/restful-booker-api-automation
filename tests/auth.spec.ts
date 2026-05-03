import { test, expect } from "playwright/test";
import { BaseController } from "../controllers/BaseController";
import { AuthRequest, AuthResponse } from "../models/AuthModel";
import { AuthController } from "../controllers/AuthController";
import { request } from "playwright-extra";
import { BookingTestData } from "../utils/BookingTestData";

test('TC_002: Generate Auth Token Successfully @smoke', async ({ request }) => {
    const authController = new AuthController(request)

    // Define our credentials using the Model
    const credentials:AuthRequest = BookingTestData.getAdminCredentials();

    // 1. Send POST request
    console.log(`Sending POST request to generate auth token with credentials: \n${JSON.stringify(credentials, null, 2)}`);
    const response = await authController.createToken(credentials)

    // 2. Validate Status
    console.log(`Response status: ${response.status()}`);
    expect(response.status()).toBe(200)

    // 3. Parse JSON using the Response Model
    const responseJSON: AuthResponse = await response.json()
    const token = responseJSON.token
    console.log(`Received token: ${token}`);

    expect(responseJSON.token).toBeDefined()

})

test('TC_003: Login Failure--Invalid credentials @Regression', async ({ request }) => {
    const authController = new AuthController(request)

    //define the credentials
    const credentials: AuthRequest = {
        username: "Dummy_Username",
        password: "Dummy_Password"
    }

    //call the createToken()
    console.log(`Sending POST request to generate auth token with invalid credentials: \n${JSON.stringify(credentials, null, 2)}`);
    const response = await authController.createToken(credentials)

    //validate status code is 200
    console.log(`Response status: ${response.status()}`);
    expect(response.status()).toBe(200)

    //caputure the resoponse and make sure response message is "Bad Credentials"
    const responseJSON = await response.json()
    const message = responseJSON.reason
    console.log(`Response message: ${message}`);
    expect(message).toBe('Bad credentials')


})