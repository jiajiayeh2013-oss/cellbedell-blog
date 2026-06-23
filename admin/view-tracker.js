(function () {
  const payload = window.__ARTICLE_VIEW__;
  if (!payload || !payload.slug || !payload.path) return;
  if (navigator.webdriver) return;

  const body = JSON.stringify({
    locale: payload.locale,
    slug: payload.slug,
    path: payload.path,
    series: payload.series,
    title: payload.title,
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/.netlify/functions/track-view", blob);
    return;
  }

  fetch("/.netlify/functions/track-view", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
})();
