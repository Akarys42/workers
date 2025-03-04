addEventListener('fetch', event => {
  event.respondWith(forwardReport(event.request))
})

async function forwardReport(req: Request) {
  let newHdrs = new Headers()
  newHdrs.set('User-Agent', req.headers.get('User-Agent')!)
  
  const init = {
    body: req.body,
    headers: newHdrs,
    method: 'POST'
  }

  let path = new URL(req.url).pathname
  let address = 'https://pythondiscord.report-uri.com' + path
  let response = await fetch(address, init);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText
  })
}
