/* ===========================
   FOOD CUP - Korean Snack Database
   100 Korean Street Foods (분식)
   High-Quality Real Food Images
   =========================== */

const FOODS_DATABASE = [
    // 떡 요리 (15개)
    { name: '떡볶이', eng: 'Tteokbokki', category: '분식', image: 'https://images.unsplash.com/photo-1603073163269-53ba5b8dc06b?w=500&h=500&fit=crop&q=80' },
    { name: '매운떡볶이', eng: 'Spicy Tteokbokki', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '치즈떡볶이', eng: 'Cheese Tteokbokki', category: '분식', image: 'https://images.pexels.com/photos/8666748/pexels-photo-8666748.jpeg?w=500&h=500&fit=crop' },
    { name: '떡국', eng: 'Tteok Guk', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '떡갈비', eng: 'Tteok Galbi', category: '분식', image: 'https://images.unsplash.com/photo-1535522411586-a105a5fb2e71?w=500&h=500&fit=crop&q=80' },
    { name: '떡꼬치', eng: 'Tteok Skewer', category: '분식', image: 'https://images.unsplash.com/photo-1599599810694-6cc0b5b1e7b5?w=500&h=500&fit=crop&q=80' },
    { name: '어묵떡꼬치', eng: 'Fish Cake Tteok Skewer', category: '분식', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop' },
    { name: '치즈떡꼬치', eng: 'Cheese Tteok Skewer', category: '분식', image: 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80' },
    { name: '떡볶이스파게티', eng: 'Tteokbokki Spaghetti', category: '분식', image: 'https://images.unsplash.com/photo-1621996346565-431f63602f41?w=500&h=500&fit=crop&q=80' },
    { name: '떡만두', eng: 'Tteok Mandu', category: '분식', image: 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80' },
    { name: '떡순대', eng: 'Tteok Sundae', category: '분식', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80' },
    { name: '떡우동', eng: 'Tteok Udon', category: '분식', image: 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80' },
    { name: '떡라면', eng: 'Tteok Ramen', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '떡국수', eng: 'Tteok Noodles', category: '분식', image: 'https://images.unsplash.com/photo-1621996346565-431f63602f41?w=500&h=500&fit=crop&q=80' },
    { name: '떡튀김', eng: 'Fried Tteok', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },

    // 튀김 요리 (15개)
    { name: '계란튀김', eng: 'Fried Egg', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '새우튀김', eng: 'Fried Shrimp', category: '분식', image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=500&h=500&fit=crop&q=80' },
    { name: '오징어튀김', eng: 'Fried Squid', category: '분식', image: 'https://images.unsplash.com/photo-1599599810694-6cc0b5b1e7b5?w=500&h=500&fit=crop&q=80' },
    { name: '고구마튀김', eng: 'Fried Sweet Potato', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '옥수수튀김', eng: 'Fried Corn', category: '분식', image: 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80' },
    { name: '치즈튀김', eng: 'Fried Cheese', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '소시지튀김', eng: 'Fried Sausage', category: '분식', image: 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80' },
    { name: '어묵튀김', eng: 'Fried Fish Cake', category: '분식', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop' },
    { name: '모듬튀김', eng: 'Assorted Fried Food', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '김말이튀김', eng: 'Fried Laver Roll', category: '분식', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop' },
    { name: '깻잎튀김', eng: 'Fried Perilla Leaf', category: '분식', image: 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80' },
    { name: '당근튀김', eng: 'Fried Carrot', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '파튀김', eng: 'Fried Scallion', category: '분식', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop' },
    { name: '버터튀김', eng: 'Buttered Fried Food', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },

    // 김밥/말이 (12개)
    { name: '김밥', eng: 'Kimbap', category: '분식', image: 'https://images.unsplash.com/photo-1551632440-2fedb2cfc7ef?w=500&h=500&fit=crop&q=80' },
    { name: '참치김밥', eng: 'Tuna Kimbap', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '소시지김밥', eng: 'Sausage Kimbap', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '계란김밥', eng: 'Egg Kimbap', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '김말이', eng: 'Kimbap Roll', category: '분식', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop' },
    { name: '김말이튀김', eng: 'Fried Kimbap Roll', category: '분식', image: 'https://images.unsplash.com/photo-1565044666747-961f12666d4d?w=500&h=500&fit=crop&q=80' },
    { name: '치즈김밥', eng: 'Cheese Kimbap', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '야채김밥', eng: 'Vegetable Kimbap', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '우엉김밥', eng: 'Burdock Kimbap', category: '분식', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop' },
    { name: '계란말이', eng: 'Egg Roll', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '소시지계란말이', eng: 'Sausage Egg Roll', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '김부자', eng: 'Seaweed Rice Bundle', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },

    // 만두/순대 (12개)
    { name: '만두', eng: 'Mandu', category: '분식', image: 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80' },
    { name: '야채만두', eng: 'Vegetable Mandu', category: '분식', image: 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80' },
    { name: '옥수수만두', eng: 'Corn Mandu', category: '분식', image: 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80' },
    { name: '치즈만두', eng: 'Cheese Mandu', category: '분식', image: 'https://images.unsplash.com/photo-1545521521-83f8be7e5f5f?w=500&h=500&fit=crop&q=80' },
    { name: '순대', eng: 'Sundae', category: '분식', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80' },
    { name: '오징어순대', eng: 'Squid Sundae', category: '분식', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80' },
    { name: '떡순대', eng: 'Tteok Sundae', category: '분식', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80' },
    { name: '곱창', eng: 'Gopchang', category: '분식', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop&q=80' },
    { name: '매운순대', eng: 'Spicy Sundae', category: '분식', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop&q=80' },
    { name: '만두국', eng: 'Mandu Soup', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '순대국밥', eng: 'Sundae Rice Bowl', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '만두튀김', eng: 'Fried Mandu', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },

    // 어묵/국/면 (13개)
    { name: '어묵', eng: 'Eomuk', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '어묵국', eng: 'Eomuk Soup', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '어묵꼬치', eng: 'Eomuk Skewer', category: '분식', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop' },
    { name: '떡어묘국', eng: 'Tteok Eomuk Soup', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '만두어묘국', eng: 'Mandu Eomuk Soup', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '라면', eng: 'Ramyeon', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '우동', eng: 'Udon', category: '분식', image: 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80' },
    { name: '칼국수', eng: 'Kalguksu', category: '분식', image: 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80' },
    { name: '비빔우동', eng: 'Bibim Udon', category: '분식', image: 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80' },
    { name: '스팸우동', eng: 'Spam Udon', category: '분식', image: 'https://images.unsplash.com/photo-1579584425555-c3ce017fd53e?w=500&h=500&fit=crop&q=80' },
    { name: '스팸라면', eng: 'Spam Ramyeon', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '떡라면', eng: 'Tteok Ramyeon', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '매운라면', eng: 'Spicy Ramyeon', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },

    // 주먹밥/밥 (12개)
    { name: '주먹밥', eng: 'Onigiri', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '참치주먹밥', eng: 'Tuna Onigiri', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '계란주먹밥', eng: 'Egg Onigiri', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '야채주먹밥', eng: 'Vegetable Onigiri', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '김주먹밥', eng: 'Seaweed Onigiri', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '치즈주먹밥', eng: 'Cheese Onigiri', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '김밥주먹밥', eng: 'Kimbap Onigiri', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '주먹밥국', eng: 'Onigiri Soup', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '계란탁', eng: 'Gyeran Tak', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '계란찜', eng: 'Steamed Egg', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '스팸계란', eng: 'Spam and Egg', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '계란밥', eng: 'Egg Rice', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },

    // 소시지/핫도그 (10개)
    { name: '소시지', eng: 'Sausage', category: '분식', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&q=80' },
    { name: '치즈소시지', eng: 'Cheese Sausage', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '매운소시지', eng: 'Spicy Sausage', category: '분식', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&q=80' },
    { name: '핫도그', eng: 'Hot Dog', category: '분식', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561c1d?w=500&h=500&fit=crop&q=80' },
    { name: '치즈핫도그', eng: 'Cheese Hot Dog', category: '분식', image: 'https://images.unsplash.com/photo-1585238341710-4b4e6416b573?w=500&h=500&fit=crop&q=80' },
    { name: '감자핫도그', eng: 'Potato Hot Dog', category: '분식', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561c1d?w=500&h=500&fit=crop&q=80' },
    { name: '옥수수핫도그', eng: 'Corn Hot Dog', category: '분식', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561c1d?w=500&h=500&fit=crop&q=80' },
    { name: '소시지꼬치', eng: 'Sausage Skewer', category: '분식', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop' },
    { name: '소시지국', eng: 'Sausage Soup', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '소시지라면', eng: 'Sausage Ramyeon', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },

    // 기타 분식 (11개)
    { name: '튀김라면', eng: 'Fried Ramyeon', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '치즈라면', eng: 'Cheese Ramyeon', category: '분식', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=500&fit=crop&q=80' },
    { name: '참치주먹밥김', eng: 'Tuna Onigiri with Seaweed', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '분식떡볶이세트', eng: 'Tteokbokki Set', category: '분식', image: 'https://images.unsplash.com/photo-1603073163269-53ba5b8dc06b?w=500&h=500&fit=crop&q=80' },
    { name: '김연포기', eng: 'Seaweed Snack', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '스팸김밥', eng: 'Spam Kimbap', category: '분식', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80' },
    { name: '단무지', eng: 'Danmuji', category: '분식', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&q=80' },
    { name: '시래기국', eng: 'Shiregi Soup', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '무말랭이', eng: 'Radish Snack', category: '분식', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&q=80' },
    { name: '계란말이국', eng: 'Egg Roll Soup', category: '분식', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop&q=80' },
    { name: '분식모둠', eng: 'Assorted Snacks', category: '분식', image: 'https://images.unsplash.com/photo-1603073163269-53ba5b8dc06b?w=500&h=500&fit=crop&q=80' },
];

class FoodDatabase {
    constructor() {
        this.allFoods = FOODS_DATABASE;
        this.selectedFoods = [];
    }

    getRandomFoods(count = 64) {
        const shuffled = [...this.allFoods].sort(() => Math.random() - 0.5);
        this.selectedFoods = shuffled.slice(0, count);
        return this.selectedFoods;
    }

    getFoodById(index) {
        return this.selectedFoods[index];
    }

    getTotalFoods() {
        return this.selectedFoods.length;
    }

    getAllFoods() {
        return this.allFoods;
    }
}

const foodDB = new FoodDatabase();
