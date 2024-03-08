self.addEventListener('install', event => {
    console.log('v1 installing')

    event.waitUntil(
        caches.open('static-v1').then(cache => cache.add('/cat.jpeg'))
    )
})

self.addEventListener('activate', event => {
    console.log('v1 ready to handle fetches!')

    // event.waitUntil(
    //     clients.claim()
    // )
})

self.addEventListener('fetch', event => {
    console.log('go into fetch quote///')
    const url = new URL(event.request.url)
    if(url.origin == location.origin && url.pathname == '/dog.jpeg') {
        event.respondWith(caches.match('/cat.jpeg'))
    }
})