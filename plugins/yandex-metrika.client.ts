/* eslint-disable */
/* @ts-nocheck */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public;

  if (import.meta.client && config.YANDEX_METRIKA_ID) {
    // Создание глобальной функции ym
    (window as any).ym = (window as any).ym || function () {
      ((window as any).ym.a = (window as any).ym.a || []).push(arguments);
    };
    (window as any).ym.l = +new Date();

    // Проверка, что скрипт ещё не загружен
    const scriptSrc = 'https://mc.yandex.ru/metrika/tag.js';
    const isLoaded = Array.from(document.scripts).some(script => script.src === scriptSrc);

    if (!isLoaded) {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptSrc;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }

    // Инициализация счётчика
    (window as any).ym(config.YANDEX_METRIKA_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true
    });

    // Добавление <noscript> изображения
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <div><img src="https://mc.yandex.ru/watch/${config.YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div>
    `;
    document.body.appendChild(noscript);
  }
});
