import { sendEmail } from './email'

export async function handleRequest(req: Request): Promise<Response> {
  const create_new_angebot = async (): Promise<Response> => {
    let body = await req.json()

    await sendEmail(req, {
      Action: 'SendEmail',
      Source: 'KlexHub <no-reply@klexhub.com>',
      'Destination.ToAddresses.member.1': 'j.waigel@klexhub.com',
      'Message.Subject.Data': 'Neues Angebot',
      'Message.Body.Text.Data': 'Neues Angebot: ' + JSON.stringify(body),
    } as any)

    await sendEmail(req, {
      Action: 'SendEmail',
      Source: 'KlexHub <no-reply@klexhub.com>',
      'Destination.ToAddresses.member.1': body.email,
      'Message.Subject.Data': 'Vielen Dank für Ihre Angebotsanfrage.',
      'Message.Body.Text.Data':
        'Vielen Dank für Ihre Interesse an unserem Unternehmen!\n\nWir möchten den Eingang Ihrer unverbindlichen Angebotsanfrage hiermit bestätigen.\nWir melden uns schnellsmöglichst bei Ihnen! Bis dahin wünschen wir Ihnen alles gute!\n\n Viele Grüße\n\n KlexHub Team',
    } as any)
    /**
     * Sending to Discord Webhook
     */
    await fetch(
      new Request(DISCORD_WEBHOOK, {
        body: JSON.stringify({
          content:
            '<@268368233935929344> Neues Angebot: ```' +
            JSON.stringify(body) +
            '```',
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    )
      .then((e) => {
        console.log('Successful send to discord :: ' + JSON.stringify(e))
      })
      .catch((e) => {
        console.log('ERROR :: ' + JSON.stringify(e))
      })

    return new Response('Created! Yeah!', { status: 200 })
  }

  let response
  if (req.method === 'POST') {
    response = await create_new_angebot()
  } else {
    response = new Response('Expected POST', { status: 500 })
  }

  return response
}
