#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re

# google_images.json 읽기
with open('google_images.json', 'r', encoding='utf-8') as f:
    food_images = json.load(f)

# foods.js 읽기
with open('js/foods.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 각 음식의 이미지 URL 업데이트
updated = 0
for food_name, image_url in food_images.items():
    if image_url:
        # 이름으로 행을 찾아 image 값 업데이트
        # 패턴: { name: '떡볶이', ... image: '' },
        pattern = r"(\{{ name: '[^']*" + re.escape(food_name) + r"'[^}}]*image: )''"
        replacement = r"\1'" + image_url + r"'"

        old_len = len(content)
        content = re.sub(pattern, replacement, content, count=1)

        if len(content) != old_len:
            updated += 1
            print(f"OK: {food_name}")

# 업데이트된 내용 저장
with open('js/foods.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n완료: {updated}/96 업데이트됨")
