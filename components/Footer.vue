<script setup lang="ts"></script>

<template>
  <v-footer color="#1f2937" class="w-full text-white footer-compact">
    <v-container>
      <v-row align="center" justify="space-between" class="text-sm">
        <!-- Копирайт -->
        <v-col cols="12" md="4" class="text-center md:text-left">
          © {{ new Date().getFullYear() }} Nirby
        </v-col>

        <!-- Соцсети -->
        <v-col cols="12" md="8" class="flex justify-center md:justify-end gap-4">
          <a href="https://vk.com/nirby?from=groups" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-400 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.01 0C5.376 0 0 5.375 0 12.01c0 6.636 5.376 12.01 12.01 12.01 6.635 0 12.01-5.374 12.01-12.01C24.02 5.375 18.645 0 12.01 0zm5.588 16.64h-1.31c-.51 0-.668-.405-1.587-1.287-.803-.77-1.152-.875-1.353-.875-.278 0-.36.08-.36.465v1.097c0 .33-.107.57-1.036.57-1.55 0-3.263-1.002-4.474-2.864-1.828-2.67-2.323-4.694-2.323-5.097 0-.22.08-.435.463-.435h1.31c.347 0 .478.152.61.51.682 1.945 1.827 3.651 2.3 3.651.18 0 .263-.08.263-.5v-1.93c-.057-.885-.52-.962-.52-1.28 0-.152.12-.3.31-.3h2.056c.257 0 .348.12.348.465v2.62c0 .27.11.37.25.37.18 0 .34-.1.675-.44.993-1.064 1.688-2.704 1.688-2.704.092-.222.254-.42.593-.42h1.31c.418 0 .507.213.418.51-.177.75-1.918 3.298-1.918 3.298-.158.23-.225.345 0 .635.158.21.675.66 1.005 1.062.62.7 1.09 1.29 1.22 1.585.116.278-.018.553-.442.553z"/>
            </svg>
            VK
          </a>

          <a href="https://t.me/nirbywork" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-400 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.596 15.568L9.39 19.92c.38 0 .547-.164.747-.362l1.793-1.73 3.717 2.705c.682.376 1.164.18 1.335-.63l2.42-11.385.001-.002c.214-.998-.361-1.387-1.02-1.145l-14.29 5.497c-.976.39-.962.95-.166 1.198l3.66 1.143 8.492-5.35c.4-.27.764-.12.464.15"/>
            </svg>
            Telegram
          </a>

          <a href="https://www.instagram.com/nirby.ru?igsh=MTQ5MHhpbmZid3hkMA==" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-400 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0 3.674a6.163 6.163 0 100 12.326 6.163 6.163 0 000-12.326zm7.406-1.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
            </svg>
            Instagram <span class="text-xs text-gray-400">(Meta признана в России экстремистской)</span>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer-compact {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 50px;
  padding: 0.5rem 0;
  z-index: 50;
}
</style>
