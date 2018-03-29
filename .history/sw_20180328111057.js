self.addEventListener('message', function (data) {
 var messages = JSON.parse(data);
 console.log(messages);
});