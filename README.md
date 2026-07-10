# Auto Commit and Push Repository

이 저장소는 GitHub Actions를 사용하여 매일 자동으로 커밋과 푸시를 수행합니다.

## 워크플로우 설정

- **정기 실행**: 매일 자정 (UTC 기준)
- **수동 실행**: Actions 탭에서 수동으로 실행 가능
- **자동 커밋**: 파일 변경 시 자동으로 커밋 및 푸시

## 시작하기

1. GitHub에서 새 저장소 생성
2. 다음 명령어 실행:
   ```bash
   git remote add origin https://github.com/Jongwon02/auto-commit-push.git
   git branch -M main
   git push -u origin main
   ```

## 로그

자동 커밋은 `auto-commit.log` 파일에 기록됩니다.
