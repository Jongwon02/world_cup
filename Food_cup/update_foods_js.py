#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re

def update_foods_js():
    """google_images.json의 데이터로 foods.js 업데이트"""
    print("=" * 70)
    print("Updating foods.js with image URLs")
    print("=" * 70)

    try:
        # google_images.json 읽기
        with open('google_images.json', 'r', encoding='utf-8') as f:
            food_images = json.load(f)

        print("\nLoaded {} food images\n".format(len(food_images)))

        # foods.js 읽기
        with open('js/foods.js', 'r', encoding='utf-8') as f:
            foods_js_content = f.read()

        # 각 음식의 이미지 URL 업데이트
        updated_count = 0
        for food_name, image_url in food_images.items():
            if image_url:  # URL이 있을 경우만 업데이트
                # 정규표현식으로 찾기
                pattern = r"(name: '[^']*{}[^']*'[^}}]*?image: )''".format(re.escape(food_name))
                replacement = r"\1'{}'".format(image_url.replace("'", "\\'"))

                old_content = foods_js_content
                foods_js_content = re.sub(pattern, replacement, foods_js_content, count=1)

                if foods_js_content != old_content:
                    updated_count += 1
                    print("OK: {}".format(food_name))

        # 업데이트된 foods.js 저장
        with open('js/foods.js', 'w', encoding='utf-8') as f:
            f.write(foods_js_content)

        print("\n" + "=" * 70)
        print("Update completed: {}/{} foods".format(updated_count, len(food_images)))
        print("File saved: js/foods.js")
        print("=" * 70)

    except FileNotFoundError as e:
        print("ERROR: File not found - {}".format(e))
        print("\nFirst run: python collect_google_images.py")
    except json.JSONDecodeError as e:
        print("ERROR: JSON decode error - {}".format(e))
    except Exception as e:
        print("ERROR: {}".format(e))

if __name__ == "__main__":
    update_foods_js()
