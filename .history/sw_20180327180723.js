self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if(response.status == 400) {
        return new Response("whoops, not found");
      }
      return response;
    }).catch(function() {
      return new Response("uh oh, that totally failed")
    })
  );
});