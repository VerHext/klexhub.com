import { AwsClient } from 'aws4fetch'

export async function sendEmail(req: any, details: any) {
  const aws = new AwsClient({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: 'eu-west-1',
  })

  var formBody: any = []
  for (var property in details) {
    var encodedKey = encodeURIComponent(property)
    var encodedValue = encodeURIComponent(details[property])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  formBody = formBody.join('&')

  const lambdaResponse = await aws.fetch(
    'https://email.eu-west-1.amazonaws.com',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody,
    },
  )
}
