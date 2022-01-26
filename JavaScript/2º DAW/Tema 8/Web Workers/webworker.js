var worker = new Worker("worker.js");
worker.addEventListener("message", function(e) {
  alert("El meu treballador diu que son les: " + e.data);
});
worker.postMessage("Steven es tonto");
