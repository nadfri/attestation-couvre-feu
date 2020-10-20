importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Super ! Workbox est chargé 🎉`);
  
  workbox.routing.registerRoute(
    /\.(?:html|js|css|png|jpg|jpeg|svg|gif|ico|json)$/,
    new workbox.strategies.StaleWhileRevalidate()
  );
}


