const expectedCaches = ['static-v2']

self.addEventListener('install', event => {
    console.log('v2 installing...')

    // self.skipWaiting();
    
    event.waitUntil(
        caches.open('static-v2').then(cache => cache.add('/horse.jpeg'))
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if(!expectedCaches.includes(key)){
                    return caches.delete(key)
                }
            })
        )).then(() => {
            console.log('now v2 can put into use...')
        }).catch(err => {
            console.log('ops:', err)
        })
    )
})

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url)

    if(url.origin == location.origin && url.pathname == '/dog.jpeg'){
        event.respondWith(caches.match('/horse.jpeg'))
    }
})