import { test, expect } from "playwright/test";
import { BaseController } from "../controllers/BaseController";
import { AuthRequest, AuthResponse } from "../models/AuthModel";
import { AuthController } from "../controllers/AuthController";

test('TC_002: Generate Auth Token Successfully @smoke', async ({ request }) => {
    const authController = new AuthController(request)

    // Define our credentials using the Model
    const credentials: AuthRequest = {
        "username": "admin",
        "password": "password123"
    };

    // 1. Send POST request
    const response = await authController.createToken(credentials)

    // 2. Validate Status
    expect(response.status()).toBe(200)
    console.log("status code: ",response.status())
    //console.log(response)

    // 3. Parse JSON using the Response Model
    const responseJSON: AuthResponse = await response.json()
    console.log(responseJSON)
    const token = responseJSON.token
    console.log("Token Fetched: ", token)

    expect(responseJSON.token).toBeDefined()

})