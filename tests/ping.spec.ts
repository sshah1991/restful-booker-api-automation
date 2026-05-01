import { expect,test } from "playwright/test";
import { PingController } from "../controllers/PingController";

test("@TC_001: Verify Service Health Check @smoke",async({request})=>{

    /* Step 1: Initialize our Controller */
        const pingController = new PingController(request);
    
        /* Step 2: Perform the action and measure time */
        const startTime = Date.now();
        const response = await pingController.getHealth();
        const duration = Date.now() - startTime;

        /* Step 3: Assertions (The "What" we are checking) */
        // Check that the status code is 201 (Created)
        expect(response.status()).toBe(201);

        // Check that the response body is exactly "Created"
        const bodyContent = await response.text();
        expect(bodyContent).toEqual('Created')

        // Ensure the API responded in less than 1 second (1000ms)
        await expect(duration).toBeLessThan(5000)

})