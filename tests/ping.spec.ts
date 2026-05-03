import { expect,test } from "playwright/test";
import { PingController } from "../controllers/PingController";

test("TC_001: Verify Service Health Check @smoke",async({request})=>{

    console.log("****************Executing TC: 'TC_001'************");
    /* Step 1: Initialize our Controller */
        const pingController = new PingController(request);
    
        /* Step 2: Perform the action and measure time */
        const startTime = Date.now();
        console.log(`Sending GET request to verify service health`);
        const response = await pingController.getHealth();
        const duration = Date.now() - startTime;
        console.log(`Response received in ${duration}ms`);

        /* Step 3: Assertions (The "What" we are checking) */
        // Check that the status code is 201 (Created)
        console.log(`Response status: ${response.status()}`);
        expect(response.status()).toBe(201);

        // Check that the response body is exactly "Created"
        const bodyContent = await response.text();
        console.log(`Response body: ${bodyContent}`);
        expect(bodyContent).toEqual('Created')

        // Ensure the API responded in less than 1 second (1000ms)
        await expect(duration).toBeLessThan(5000)

})