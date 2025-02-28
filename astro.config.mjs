import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://your-domain.com', // 배포 시 사이트 URL (필요시 설정)
  // publicDir 기본값은 "public"이므로 별도 지정 필요 없음
  // 빌드 아웃풋은 "dist" 폴더로 생성됩니다.
});