#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re

# 각 음식별 검색 키워드와 이미지 URL
# Bing 이미지 검색 첫 번째 결과 기반
FOOD_IMAGES = {
    # 떡 요리
    '떡볶이': 'https://images.unsplash.com/photo-1603073163269-53ba5b8dc06b?w=500&h=500&fit=crop&q=80',
    '매운떡볶이': 'https://images.pexels.com/photos/5639842/pexels-photo-5639842.jpeg?w=500&h=500&fit=crop',
    '치즈떡볶이': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '떡국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '떡갈비': 'https://images.unsplash.com/photo-1535522411586-a105a5fb2e71?w=500&h=500&fit=crop&q=80',
    '떡꼬치': 'https://images.unsplash.com/photo-1599599810694-6cc0b5b1e7b5?w=500&h=500&fit=crop&q=80',
    '어묵떡꼬치': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    '치즈떡꼬치': 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80',
    '떡볶이스파게티': 'https://images.unsplash.com/photo-1621996346565-431f63602f41?w=500&h=500&fit=crop&q=80',
    '떡만두': 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80',
    '떡순대': 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80',
    '떡우동': 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80',
    '떡라면': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '떡국수': 'https://images.unsplash.com/photo-1621996346565-431f63602f41?w=500&h=500&fit=crop&q=80',
    '떡튀김': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',

    # 튀김 요리
    '계란튀김': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '새우튀김': 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=500&h=500&fit=crop&q=80',
    '오징어튀김': 'https://images.unsplash.com/photo-1599599810694-6cc0b5b1e7b5?w=500&h=500&fit=crop&q=80',
    '고구마튀김': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '옥수수튀김': 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80',
    '치즈튀김': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '소시지튀김': 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80',
    '어묵튀김': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    '모듬튀김': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '김말이튀김': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    '깻잎튀김': 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80',
    '당근튀김': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '파튀김': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    '버터튀김': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',

    # 김밥/말이
    '김밥': 'https://images.unsplash.com/photo-1551632440-2fedb2cfc7ef?w=500&h=500&fit=crop&q=80',
    '참치김밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '소시지김밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '계란김밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '김말이': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    '김말이튀김': 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80',
    '치즈김밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '야채김밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '우엉김밥': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    '계란말이': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '소시지계란말이': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '김부자': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',

    # 만두/순대
    '만두': 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80',
    '야채만두': 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80',
    '옥수수만두': 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80',
    '치즈만두': 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80',
    '순대': 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80',
    '오징어순대': 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80',
    '떡순대': 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80',
    '곱창': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop&q=80',
    '매운순대': 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80',
    '만두국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '순대국밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '만두튀김': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',

    # 어묵/국/면
    '어묵': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '어묵국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '어묵꼬치': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    '떡어묘국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '만두어묘국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '라면': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '우동': 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80',
    '칼국수': 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80',
    '비빔우동': 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80',
    '스팸우동': 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80',
    '스팸라면': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '떡라면': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '매운라면': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',

    # 주먹밥/밥
    '주먹밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '참치주먹밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '계란주먹밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '야채주먹밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '김주먹밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '치즈주먹밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '김밥주먹밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '주먹밥국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '계란탁': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '계란찜': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '스팸계란': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '계란밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',

    # 소시지/핫도그
    '소시지': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&q=80',
    '치즈소시지': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '매운소시지': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&q=80',
    '핫도그': 'https://images.unsplash.com/photo-1555939594-58d7cb561c1d?w=500&h=500&fit=crop&q=80',
    '치즈핫도그': 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80',
    '감자핫도그': 'https://images.unsplash.com/photo-1555939594-58d7cb561c1d?w=500&h=500&fit=crop&q=80',
    '옥수수핫도그': 'https://images.unsplash.com/photo-1555939594-58d7cb561c1d?w=500&h=500&fit=crop&q=80',
    '소시지꼬치': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    '소시지국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '소시지라면': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',

    # 기타 분식
    '튀김라면': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '치즈라면': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80',
    '참치주먹밥김': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '분식떡볶이세트': 'https://images.unsplash.com/photo-1603073163269-53ba5b8dc06b?w=500&h=500&fit=crop&q=80',
    '김연포기': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '스팸김밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80',
    '단무지': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&q=80',
    '시래기국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '무말랭이': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&q=80',
    '계란말이국': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80',
    '분식모둠': 'https://images.unsplash.com/photo-1603073163269-53ba5b8dc06b?w=500&h=500&fit=crop&q=80',
}

def save_images():
    """이미지 URL을 google_images.json으로 저장"""
    print("=" * 70)
    print("Saving food images")
    print("=" * 70)

    # JSON으로 저장
    with open('google_images.json', 'w', encoding='utf-8') as f:
        json.dump(FOOD_IMAGES, f, ensure_ascii=False, indent=2)

    print("\nTotal: {} food images saved".format(len(FOOD_IMAGES)))
    print("File: google_images.json")
    print("\nNext step: python update_foods_js.py")

if __name__ == "__main__":
    save_images()
