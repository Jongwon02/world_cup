#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json
from urllib.parse import quote
import time
import re

# 각 음식 데이터
FOODS = [
    # 떡 요리
    '떡볶이', '매운떡볶이', '치즈떡볶이', '떡국', '떡갈비',
    '떡꼬치', '어묵떡꼬치', '치즈떡꼬치', '떡볶이스파게티', '떡만두',
    '떡순대', '떡우동', '떡라면', '떡국수', '떡튀김',

    # 튀김 요리
    '계란튀김', '새우튀김', '오징어튀김', '고구마튀김', '옥수수튀김',
    '치즈튀김', '소시지튀김', '어묵튀김', '모듬튀김', '김말이튀김',
    '깻잎튀김', '당근튀김', '파튀김', '버터튀김',

    # 김밥/말이
    '김밥', '참치김밥', '소시지김밥', '계란김밥', '김말이',
    '김말이튀김', '치즈김밥', '야채김밥', '우엉김밥', '계란말이',
    '소시지계란말이', '김부자',

    # 만두/순대
    '만두', '야채만두', '옥수수만두', '치즈만두', '순대',
    '오징어순대', '떡순대', '곱창', '매운순대', '만두국',
    '순대국밥', '만두튀김',

    # 어묵/국/면
    '어묵', '어묵국', '어묵꼬치', '떡어묵국', '만두어묵국',
    '라면', '우동', '칼국수', '비빔우동', '스팸우동',
    '스팸라면', '떡라면', '매운라면',

    # 주먹밥/밥
    '주먹밥', '참치주먹밥', '계란주먹밥', '야채주먹밥', '김주먹밥',
    '치즈주먹밥', '김밥주먹밥', '주먹밥국', '계란탁', '계란찜',
    '스팸계란', '계란밥',

    # 소시지/핫도그
    '소시지', '치즈소시지', '매운소시지', '핫도그', '치즈핫도그',
    '감자핫도그', '옥수수핫도그', '소시지꼬치', '소시지국', '소시지라면',

    # 기타 분식
    '튀김라면', '치즈라면', '참치주먹밥김', '분식떡볶이세트', '김연포기',
    '스팸김밥', '단무지', '시래기국', '무말랭이', '계란말이국', '분식모둠'
]

def get_google_image_url(food_name):
    """음식 이름으로 Google 이미지 검색의 첫 번째 이미지를 찾습니다."""
    try:
        print("  Searching: {}...".format(food_name), end=" ", flush=True)

        # Google 이미지 검색 URL
        search_url = "https://www.google.com/search?q={}&tbm=isch&ijn=0".format(quote(food_name))

        # 헤더 설정
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

        response = requests.get(search_url, headers=headers, timeout=10)
        response.raise_for_status()

        # HTML에서 이미지 URL 추출
        pattern = r'"imgUrl":"([^"]+)"'
        matches = re.findall(pattern, response.text)

        if matches:
            first_image_url = matches[0]
            print("OK - {}...".format(first_image_url[:40]))
            return first_image_url

        print("FAIL - URL not found")
        return None

    except Exception as e:
        print("ERROR - {}".format(str(e)[:50]))
        return None

def collect_all_images():
    """모든 음식의 Google 이미지 첫 번째 URL 수집"""
    print("=" * 70)
    print("Google Image Search - Collecting first image for each food")
    print("=" * 70)

    food_images = {}
    success_count = 0
    failed_foods = []

    for idx, food_name in enumerate(FOODS, 1):
        print("\n[{:3d}/{}] ".format(idx, len(FOODS)), end="")
        url = get_google_image_url(food_name)

        if url:
            food_images[food_name] = url
            success_count += 1
        else:
            failed_foods.append(food_name)
            food_images[food_name] = ""

        # Rate limiting
        time.sleep(1)

    print("\n\n" + "=" * 70)
    print("Completed: {}/{} foods processed".format(success_count, len(FOODS)))

    if failed_foods:
        print("\nFailed foods ({} total):".format(len(failed_foods)))
        for food in failed_foods[:10]:
            print("   - {}".format(food))
        if len(failed_foods) > 10:
            print("   ... and {} more".format(len(failed_foods) - 10))

    # Save to JSON
    with open('google_images.json', 'w', encoding='utf-8') as f:
        json.dump(food_images, f, ensure_ascii=False, indent=2)

    print("\nSaved: google_images.json")

    return food_images

if __name__ == "__main__":
    print("\nInstall: pip install requests\n")

    try:
        food_images = collect_all_images()
        print("\nImage collection completed!")
        print("Next: python update_foods_js.py")
    except Exception as e:
        print("\nERROR: {}".format(e))
