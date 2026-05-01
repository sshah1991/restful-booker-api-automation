import { test, expect} from '@playwright/test';

test('Basic API Call: Verify Health Check--Singel file',async({request})=>{
  console.log("Basic API Call: Verify Health Check--Singel file")
  // 1. Send the GET request to /ping
  // Note: Since we set the baseURL in config, we only need the endpoint path
  const response= await request.get('/ping')

  // 2. Validate the Status Code
  // Restful-Booker's /ping endpoint specifically returns 201 Created
  const statusResponse= response.status()
  expect(statusResponse).toEqual(201)
   console.log(statusResponse)

  // 3. Validate the Response Body
  // The response is simple text: "Created"
    const responseBody = await response.text();
    expect(responseBody).toBe('Created');
    console.log(responseBody)
  
})

test('Manual Auth Token Generation - Single File',async({request})=>{
  const authPayload = {
    username: "admin",
    password: "password123"
  };
  const response= await request.post('/auth',
    {
      data:{authPayload}
    }
  )
  // 2. Validate Status Code (Restful-booker returns 200 for successful auth)
  const responseCode= (await response).status()
  expect(responseCode).toBe(200)
  console.log(responseCode)

  // 3. Parse the JSON response body

  const JSONBody= await response.json()
  console.log(JSONBody)

  expect(JSONBody).toHaveProperty('token')
  const tokenFetched= JSONBody.token
  console.log(tokenFetched)
})