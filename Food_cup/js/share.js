/* ===========================
   FOOD CUP - Sharing Features
   SNS Share, QR Code, Image Export
   =========================== */

class ShareManager {
    constructor() {
        this.baseUrl = window.location.origin + window.location.pathname;
        this.currentShareId = null;
    }

    generateShareId(tournamentData) {
        this.currentShareId = 'share_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        const shareData = {
            id: this.currentShareId,
            data: tournamentData,
            timestamp: new Date().toISOString()
        };

        sessionStorage.setItem(this.currentShareId, JSON.stringify(shareData));

        return this.currentShareId;
    }

    getShareUrl(shareId = this.currentShareId) {
        if (!shareId) return '';
        return `${this.baseUrl}?share=${shareId}`;
    }

    retrieveSharedData(shareId) {
        const data = sessionStorage.getItem(shareId);
        return data ? JSON.parse(data) : null;
    }

    generateShareText(champion) {
        const texts = [
            `내 최고의 음식은 ${champion.name}입니다! 당신의 최고 음식은? 🍕`,
            `${champion.name}가 우승했습니다! 음식 월드컵에 도전해보세요! 🏆`,
            `음식 월드컵 결과: 우승자는 ${champion.name}! 당신도 해보세요! 🍴`,
            `나의 최고 음식 선택: ${champion.name} 💯`,
            `${champion.name}에 표를 던집니다! 음식 월드컵! 🗳️`
        ];

        return texts[Math.floor(Math.random() * texts.length)];
    }

    async generateShareImage(championFood, allFoods) {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = 1080;

            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'linear-gradient(135deg, #FF6B6B 0%, #FF8787 100%)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.font = 'bold 200px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🍕', canvas.width / 2, 200);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('음식 월드컵', canvas.width / 2, 350);

            ctx.font = 'bold 32px Arial';
            ctx.fillText('우승 음식', canvas.width / 2, 420);

            ctx.font = 'bold 80px Arial';
            ctx.fillText(championFood.name, canvas.width / 2, 550);

            ctx.font = '24px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillText(championFood.category, canvas.width / 2, 620);

            const categories = {};
            for (const food of allFoods) {
                if (!categories[food.category]) {
                    categories[food.category] = 0;
                }
                categories[food.category]++;
            }

            let yPos = 750;
            const catLabels = Object.keys(categories);

            ctx.font = '18px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

            for (let i = 0; i < Math.min(3, catLabels.length); i++) {
                const cat = catLabels[i];
                ctx.fillText(`${cat}: ${categories[cat]}개`, canvas.width / 2, yPos);
                yPos += 40;
            }

            ctx.font = '20px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillText('foodcup.app - 당신의 최고 음식을 찾아보세요!', canvas.width / 2, 1000);

            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Failed to generate share image:', error);
            return null;
        }
    }

    async generateQRCode(url, container) {
        try {
            container.innerHTML = '';
            new QRCode(container, {
                text: url,
                width: 200,
                height: 200,
                colorDark: '#FF6B6B',
                colorLight: '#FFFFFF',
                correctLevel: QRCode.CorrectLevel.H
            });
            return true;
        } catch (error) {
            console.error('Failed to generate QR code:', error);
            return false;
        }
    }

    async downloadImage(imageDataUrl, filename = 'food-cup-result.png') {
        try {
            const link = document.createElement('a');
            link.href = imageDataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return true;
        } catch (error) {
            console.error('Failed to download image:', error);
            return false;
        }
    }

    copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return Promise.resolve();
            }
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return Promise.reject(error);
        }
    }

    shareToKakao(shareText, imageUrl, shareUrl) {
        try {
            if (!window.Kakao) {
                console.error('Kakao SDK not loaded');
                return false;
            }

            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '🍕 음식 월드컵',
                    description: shareText,
                    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=400&fit=crop',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
                buttons: [
                    {
                        title: '나도 해보기',
                        link: {
                            mobileWebUrl: this.baseUrl,
                            webUrl: this.baseUrl,
                        },
                    },
                ]
            });

            return true;
        } catch (error) {
            console.error('Failed to share to Kakao:', error);
            return false;
        }
    }

    shareToFacebook(shareUrl) {
        try {
            const encodedUrl = encodeURIComponent(shareUrl);
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            window.open(facebookUrl, '_blank', 'width=600,height=400');
            return true;
        } catch (error) {
            console.error('Failed to share to Facebook:', error);
            return false;
        }
    }

    shareToTwitter(text, shareUrl) {
        try {
            const encodedText = encodeURIComponent(text);
            const encodedUrl = encodeURIComponent(shareUrl);
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            window.open(twitterUrl, '_blank', 'width=600,height=400');
            return true;
        } catch (error) {
            console.error('Failed to share to Twitter:', error);
            return false;
        }
    }

    shareToInstagram() {
        try {
            alert('인스타그램에서는 외부 앱을 통한 직접 공유를 지원하지 않습니다.\n이미지를 다운로드하고 인스타그램에 업로드해주세요!');
            return true;
        } catch (error) {
            console.error('Failed to share to Instagram:', error);
            return false;
        }
    }

    shareNatively(title, text, shareUrl) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: shareUrl
            }).catch(error => {
                if (error.name !== 'AbortError') {
                    console.error('Failed to share:', error);
                }
            });
            return true;
        }
        return false;
    }

    loadKakaoSDK() {
        if (window.Kakao && window.Kakao.isInitialized()) {
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;
        script.onload = () => {
            if (window.Kakao) {
                window.Kakao.init('YOUR_KAKAO_APP_KEY');
            }
        };
        document.head.appendChild(script);
    }

    getShareStats(shareId) {
        const data = this.retrieveSharedData(shareId);
        return data ? {
            id: shareId,
            createdAt: data.timestamp,
            champion: data.data.champion
        } : null;
    }
}

const shareManager = new ShareManager();
