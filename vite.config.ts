import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages notu
 * ------------------------------------------------------------
 * Proje sayfası (kullanici.github.io/depo-adi/) kullanıyorsan
 * `base` değeri "/depo-adi/" olmalı; aksi halde JS/CSS dosyaları
 * 404 verir ve ekran siyah kalır.
 *
 * Depo adını GitHub Actions otomatik olarak BASE_PATH ile geçirir.
 * Elle build alırken:  BASE_PATH=/depo-adi/ npm run build
 *
 * Kullanıcı sayfası (kullanici.github.io) ise "/" bırak.
 */
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    // Three.js + postprocessing tek parçada büyük görünüyor; ayrı
    // parçalara bölünce ilk yükleme paralelleşiyor.
    // (Vite 8 / Rolldown: manualChunks yalnızca fonksiyon kabul eder)
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return;
          if (id.includes('three')) return 'three';
          if (id.includes('@react-three')) return 'r3f';
          if (id.includes('postprocessing')) return 'post';
          if (id.includes('framer-motion') || id.includes('motion-dom')) return 'motion';
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
});
