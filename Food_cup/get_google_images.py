#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import quote

FOODS = [
    '떡볶이', '매운떡볶이', '치즈떡볶이', '떡국', '떡갈비',
    '떡꼬치', '어묵떡꼬치', '치즈떡꼬치', '떡볶이스파게티', '떡만두',
    '떡순대', '떡우동', '떡라면', '떡국수', '떡튀김',
    '계란튀김', '새우튀김', '오징어튀김', '고구마튀김', '옥수수튀김',
    '치즈튀김', '소시지튀김', '어묵튀김', '모듬튀김', '김말이튀김',
    '깻잎튀김', '당근튀김', '파튀김', '버터튀김',
    '김밥', '참치김밥', '소시지김밥', '계란김밥', '김말이',
    '김말이튀김', '치즈김밥', '야채김밥', '우엉김밥', '계란말이',
    '소시지계란말이', '김부자',
    '만두', '야채만두', '옥수수만두', '치즈만두', '순대',
    '오징어순대', '떡순대', '곱창', '매운순대', '만두국',
    '순대국밥', '만두튀김',
    '어묵', '어묵국', '어묵꼬치', '떡어묵국', '만두어묵국',
    '라면', '우동', '칼국수', '비빔우동', '스팸우동',
    '스팸라면', '떡라면', '매운라면',
    '주먹밥', '참치주먹밥', '계란주먹밥', '야채주먹밥', '김주먹밥',
    '치즈주먹밥', '김밥주먹밥', '주먹밥국', '계란탁', '계란찜',
    '스팸계란', '계란밥',
    '소시지', '치즈소시지', '매운소시지', '핫도그', '치즈핫도그',
    '감자핫도그', '옥수수핫도그', '소시지꼬치', '소시지국', '소시지라면',
    '튀김라면', '치즈라면', '참치주먹밥김', '분식떡볶이세트', '김연포기',
    '스팸김밥', '단무지', '시래기국', '무말랭이', '계란말이국', '분식모둠'
]

def get_first_google_image(food_name):
    """Google 이미지 검색에서 첫 번째 이미지 URL 추출"""
    try:
        print(f"  {food_name}...", end=" ", flush=True)

        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')

        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

        # Google 이미지 검색
        search_url = f"https://www.google.com/search?q={quote(food_name)}&tbm=isch"
        driver.get(search_url)

        # 첫 번째 이미지 로드 대기
        time.sleep(2)

        # 첫 번째 이미지 찾기
        try:
            img_element = driver.find_element(By.CSS_SELECTOR, "img.rg_i")
            img_element.click()
            time.sleep(1)

            # 원본 이미지 URL 추출
            images = driver.find_elements(By.CSS_SELECTOR, "img.n3VNCb")
            for img in images:
                src = img.get_attribute('src')
                if src and 'http' in src and 'data:' not in src:
                    driver.quit()
                    print(f"OK")
                    return src

            # 대체: data-src 확인
            img_src = driver.find_element(By.CSS_SELECTOR, "img.n3VNCb").get_attribute('src')
            if img_src and 'http' in img_src:
                driver.quit()
                print(f"OK")
                return img_src

        except:
            pass

        driver.quit()
        print(f"FAIL")
        return None

    except Exception as e:
        print(f"ERROR: {str(e)[:30]}")
        try:
            driver.quit()
        except:
            pass
        return None

def main():
    print("=" * 70)
    print("Google Image Search - Collecting first image for each food")
    print("=" * 70)

    food_images = {}
    success_count = 0

    for idx, food_name in enumerate(FOODS, 1):
        print(f"[{idx:3d}/{len(FOODS)}] ", end="")
        url = get_first_google_image(food_name)

        if url:
            food_images[food_name] = url
            success_count += 1
        else:
            food_images[food_name] = ""

        time.sleep(0.5)

    print(f"\n{'=' * 70}")
    print(f"Completed: {success_count}/{len(FOODS)} images collected")

    # Save
    with open('google_images.json', 'w', encoding='utf-8') as f:
        json.dump(food_images, f, ensure_ascii=False, indent=2)

    print(f"Saved: google_images.json")
    print(f"\nNext: python update_foods_js.py")

if __name__ == "__main__":
    print("\nRequirements:")
    print("pip install selenium webdriver-manager")
    print("\nDownload ChromeDriver from: https://chromedriver.chromium.org/\n")

    main()
