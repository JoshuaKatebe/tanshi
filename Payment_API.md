curl --request POST \
  --url https://api.pawapay.io/v2/deposits \
  --header 'Authorization: Bearer eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjE4MDMiLCJtYXYiOiIxIiwiZXhwIjoyMDgxNDA5MzQyLCJpYXQiOjE3NjU4NzY1NDIsInBtIjoiREFGLFBBRiIsImp0aSI6IjIxMmI5ZDQ1LWE5MmQtNDkxYy1hMmY0LTk2ODIwNGE2M2Y1MCJ9.1fzGYXtmnrBIsDOTU88-dMNUBMu6w-3wilrnBxQlQZeG6HbNXmhzqju3wv4t6dnEKsQhLaX_WHhC8uWAv9WaIA' \
  --header 'Content-Type: application/json' \
  --data '
{
  "depositId": "f4401bd2-1568-4140-bf2d-eb77d2b2b637",
  "payer": {
    "type": "MMO",
    "accountDetails": {
      "phoneNumber": "260761583901",
      "provider": "MTN_MOMO_ZMB"
    }
  },
  "amount": "1",
  "currency": "ZMW",
  "preAuthorisationCode": "<string>",
  "clientReferenceId": "test",
  "customerMessage": "test",
  "metadata": [
    {
      "orderId": "ORD-123456789"
    },
    {
      "customerId": "customer@email.com",
      "isPII": true
    }
  ]
}
'

response:
{"depositId":"f4401bd2-1568-4140-bf2d-eb77d2b2b637","status":"ACCEPTED","created":"2026-01-09T16:39:21Z","nextStep":"FINAL_STATUS"}

The API key is always in the header as a Bearer token which is eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjE4MDMiLCJtYXYiOiIxIiwiZXhwIjoyMDgxNDA5MzQyLCJpYXQiOjE3NjU4NzY1NDIsInBtIjoiREFGLFBBRiIsImp0aSI6IjIxMmI5ZDQ1LWE5MmQtNDkxYy1hMmY0LTk2ODIwNGE2M2Y1MCJ9.1fzGYXtmnrBIsDOTU88-dMNUBMu6w-3wilrnBxQlQZeG6HbNXmhzqju3wv4t6dnEKsQhLaX_WHhC8uWAv9WaIA

the number should always be in the format of 260761583901 or 2609XXXXXXXX

provider should be MTN_MOMO_ZMB for MTN, AIRTEL_OAPI_ZMB for airtel and ZAMTEL_ZMB for Zamtel

depositId should be a uuidv4 

Check deposit status with the following endpoint:
curl --request GET \
  --url https://api.pawapay.io/v2/deposits/f4401bd2-1568-4140-bf2d-eb77d2b2b637 \
  --header 'Authorization: Bearer eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjE4MDMiLCJtYXYiOiIxIiwiZXhwIjoyMDgxNDA5MzQyLCJpYXQiOjE3NjU4NzY1NDIsInBtIjoiREFGLFBBRiIsImp0aSI6IjIxMmI5ZDQ1LWE5MmQtNDkxYy1hMmY0LTk2ODIwNGE2M2Y1MCJ9.1fzGYXtmnrBIsDOTU88-dMNUBMu6w-3wilrnBxQlQZeG6HbNXmhzqju3wv4t6dnEKsQhLaX_WHhC8uWAv9WaIA'

  response:
  {"data":{"depositId":"f4401bd2-1568-4140-bf2d-eb77d2b2b637","status":"COMPLETED","amount":"1.00","currency":"ZMW","country":"ZMB","payer":{"type":"MMO","accountDetails":{"phoneNumber":"260761583901","provider":"MTN_MOMO_ZMB"}},"customerMessage":"test","clientReferenceId":"test","created":"2026-01-09T16:39:21Z","providerTransactionId":"8520041759"},"status":"FOUND"}

  or :
  {"status":"NOT_FOUND"}