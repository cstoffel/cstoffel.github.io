// shamiComposer moved from /ShamiComposer/ to /shamiComposer/. Sends any
// page under the old path to the same page under the new one, keeping the
// query and hash. Old visitors may still have the app's service worker
// registered for the old path, so drop it first.
(function () {
  var oldBase = '/ShamiComposer';
  var newBase = '/shamiComposer';
  var path = location.pathname;
  if (path.indexOf(oldBase) !== 0) return;
  var target = newBase + (path.slice(oldBase.length) || '/') +
      location.search + location.hash;
  var go = function () { location.replace(target); };
  if (!('serviceWorker' in navigator)) return go();
  setTimeout(go, 1000);
  navigator.serviceWorker.getRegistrations().then(function (regs) {
    return Promise.all(regs.filter(function (r) {
      return new URL(r.scope).pathname.indexOf(oldBase + '/') === 0;
    }).map(function (r) { return r.unregister(); }));
  }).then(go, go);
})();
