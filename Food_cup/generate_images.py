#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
분식 음식 AI 이미지 생성 스크립트
Hugging Face Stable Diffusion API 사용
"""

import requests
import json
import time

# 여기에 Hugging Face API 토큰을 입력하세요
HF_API_TOKEN = "YOUR_HUGGING_FACE_API_TOKEN"  # https://huggingface.co/settings/tokens 에서 생성

# Hugging Face API 엔드포인트
API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}

# 분식 목록
FOODS = [
    # 떡 요리 (15개)
    "떡볶이, Korean street food illustration, cute style",
    "매운떡볶이, spicy Korean street food, cute illustration",
    "치즈떡볶이, cheese tteokbokki, Korean snack, cute",
    "떡국, tteok guk soup, Korean food illustration",
    "떡갈비, tteok galbi, Korean grilled meat, cute style",
    "떡꼬치, tteok skewer, Korean street food",
    "어묵떡꼬치, fish cake tteok skewer, cute",
    "치즈떡꼬치, cheese tteok skewer, Korean snack",
    "떡볶이스파게티, tteokbokki spaghetti, fusion food",
    "떡만두, tteok mandu, Korean dumpling",
    "떡순대, tteok sundae, Korean blood sausage",
    "떡우동, tteok udon, Korean noodles",
    "떡라면, tteok ramen, Korean instant noodles",
    "떡국수, tteok noodles, Korean food",
    "떡튀김, fried tteok, crispy Korean snack",

    # 튀김 요리 (15개)
    "계란튀김, fried egg, Korean snack, cute",
    "새우튀김, fried shrimp, Korean tempura",
    "오징어튀김, fried squid, Korean street food",
    "고구마튀김, fried sweet potato, Korean snack",
    "옥수수튀김, fried corn, Korean street food",
    "치즈튀김, fried cheese, Korean snack, cute",
    "소시지튀김, fried sausage, Korean street food",
    "어묵튀김, fried fish cake, Korean snack",
    "모둠튀김, assorted fried food, Korean snacks",
    "김말이튀김, fried laver roll, Korean food",
    "깻잎튀김, fried perilla leaf, Korean snack",
    "당근튀김, fried carrot, Korean street food",
    "파튀김, fried scallion, Korean snack",
    "버터튀김, buttered fried food, Korean snack",

    # 김밥/말이 (12개)
    "김밥, kimbap, Korean seaweed rice roll, cute",
    "참치김밥, tuna kimbap, Korean snack",
    "소시지김밥, sausage kimbap, Korean food",
    "계란김밥, egg kimbap, Korean rice roll",
    "김말이, kimbap roll, Korean seaweed roll",
    "김말이튀김, fried kimbap roll, Korean snack",
    "치즈김밥, cheese kimbap, Korean food",
    "야채김밥, vegetable kimbap, Korean snack",
    "우엉김밥, burdock kimbap, Korean food",
    "계란말이, egg roll, Korean snack, cute",
    "소시지계란말이, sausage egg roll, Korean food",
    "김부자, seaweed rice bundle, Korean snack",

    # 만두/순대 (12개)
    "만두, mandu, Korean dumpling, cute",
    "야채만두, vegetable mandu, Korean snack",
    "옥수수만두, corn mandu, Korean dumpling",
    "치즈만두, cheese mandu, Korean snack, cute",
    "순대, sundae, Korean blood sausage",
    "오징어순대, squid sundae, Korean snack",
    "떡순대, tteok sundae, Korean food",
    "곱창, gopchang, Korean intestine, cute illustration",
    "매운순대, spicy sundae, Korean street food",
    "만두국, mandu soup, Korean food",
    "순대국밥, sundae rice bowl, Korean meal",
    "만두튀김, fried mandu, Korean snack, crispy",

    # 어묵/국/면 (13개)
    "어묵, eomuk, Korean fish cake, cute",
    "어묵국, eomuk soup, Korean food",
    "어묵꼬치, eomuk skewer, Korean street food",
    "떡어묵국, tteok eomuk soup, Korean food",
    "만두어묵국, mandu eomuk soup, Korean snack",
    "라면, ramyeon, Korean instant noodles, cute",
    "우동, udon, Japanese noodles, Korean style",
    "칼국수, kalguksu, Korean noodle soup",
    "비빔우동, bibim udon, Korean noodles",
    "스팸우동, spam udon, Korean street food",
    "스팸라면, spam ramyeon, Korean noodles",
    "떡라면, tteok ramyeon, Korean instant noodles",
    "매운라면, spicy ramyeon, Korean food",

    # 주먹밥/밥 (12개)
    "주먹밥, onigiri, Korean rice ball, cute",
    "참치주먹밥, tuna onigiri, Korean snack",
    "계란주먹밥, egg onigiri, Korean rice ball",
    "야채주먹밥, vegetable onigiri, Korean snack",
    "김주먹밥, seaweed onigiri, Korean food",
    "치즈주먹밥, cheese onigiri, Korean rice ball",
    "김밥주먹밥, kimbap onigiri, Korean snack",
    "주먹밥국, onigiri soup, Korean food",
    "계란탁, gyeran tak, Korean egg snack, cute",
    "계란찜, steamed egg, Korean side dish",
    "스팸계란, spam and egg, Korean breakfast",
    "계란밥, egg rice, Korean meal",

    # 소시지/핫도그 (10개)
    "소시지, sausage, Korean street food, cute",
    "치즈소시지, cheese sausage, Korean snack",
    "매운소시지, spicy sausage, Korean food",
    "핫도그, hot dog, Korean street snack",
    "치즈핫도그, cheese hot dog, Korean food",
    "감자핫도그, potato hot dog, Korean snack",
    "옥수수핫도그, corn hot dog, Korean food",
    "소시지꼬치, sausage skewer, Korean snack",
    "소시지국, sausage soup, Korean food",
    "소시지라면, sausage ramyeon, Korean noodles",

    # 기타 분식 (11개)
    "튀김라면, fried ramyeon, Korean snack",
    "치즈라면, cheese ramyeon, Korean noodles",
    "참치주먹밥김, tuna onigiri with seaweed, Korean snack",
    "분식떡볶이세트, tteokbokki set, Korean street food",
    "김연포기, seaweed snack, Korean food",
    "스팸김밥, spam kimbap, Korean snack",
    "단무지, danmuji, Korean pickled radish",
    "시래기국, shiregi soup, Korean food",
    "무말랭이, radish snack, Korean side dish",
    "계란말이국, egg roll soup, Korean food",
    "분식모둠, assorted Korean snacks, cute illustration",
]

def query(payload):
    """Hugging Face API에 요청"""
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

def generate_images():
    """모든 음식의 이미지 생성"""
    print("🎨 분식 AI 이미지 생성을 시작합니다...")
    print(f"총 {len(FOODS)}개의 이미지를 생성합니다.\n")

    food_images = {}
    success_count = 0
    fail_count = 0

    for idx, food_prompt in enumerate(FOODS, 1):
        print(f"[{idx}/{len(FOODS)}] {food_prompt.split(',')[0]}... ", end="", flush=True)

        try:
            # 프롬프트 개선
            prompt = f"Cute kawaii Korean street food illustration style, colorful, appetizing, professional food illustration: {food_prompt}"

            image_bytes = query({"inputs": prompt})

            if image_bytes:
                # 이미지를 base64로 인코딩해서 저장하거나 URL로 변환
                # 실제로는 이미지를 서버에 업로드해야 하지만,
                # 여기서는 생성 완료 표시
                food_images[food_prompt] = f"generated_{idx}"
                print("✅ 완료")
                success_count += 1
            else:
                print("❌ 실패 (응답 없음)")
                fail_count += 1

            # API 레이트 제한 방지
            time.sleep(1)

        except Exception as e:
            print(f"❌ 오류: {str(e)}")
            fail_count += 1
            time.sleep(2)

    print(f"\n✨ 생성 완료!")
    print(f"✅ 성공: {success_count}개")
    print(f"❌ 실패: {fail_count}개")

    return food_images

if __name__ == "__main__":
    print("=" * 60)
    print("🎨 분식 음식 AI 이미지 생성기")
    print("=" * 60)
    print("\n⚠️  사용 전 설정:")
    print("1. Hugging Face 계정 생성 (https://huggingface.co/join)")
    print("2. API 토큰 생성 (https://huggingface.co/settings/tokens)")
    print("3. 아래 코드의 'YOUR_HUGGING_FACE_API_TOKEN' 부분에 토큰 입력\n")

    if HF_API_TOKEN == "YOUR_HUGGING_FACE_API_TOKEN":
        print("❌ 오류: Hugging Face API 토큰을 입력해주세요!")
        print("   코드의 HF_API_TOKEN 변수를 수정하세요.")
    else:
        generate_images()
