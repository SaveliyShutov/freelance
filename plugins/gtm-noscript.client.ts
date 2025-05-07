export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const gtmId = config.public?.GOOGLE_TAG_MANAGER_ID;

  const resolvedId = Array.isArray(gtmId) ? gtmId[0] : gtmId;

  if (!resolvedId) return;

  const noscript = document.createElement('noscript');
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${resolvedId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `;
  document.body.appendChild(noscript);
});
