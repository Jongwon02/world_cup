/* ===========================
   FOOD CUP - Main Application
   Page Navigation & Flow Control
   =========================== */

class FoodCupApp {
    constructor() {
        this.currentPage = 'home';
        this.currentTournament = null;
        this.isInitialized = false;
        this.shareImageUrl = null;
        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.checkSharedResult();
        this.isInitialized = true;
    }

    cacheElements() {
        // Pages
        this.pages = {
            home: document.getElementById('home-page'),
            tournament: document.getElementById('tournament-page'),
            results: document.getElementById('results-page'),
            resultsDetail: document.getElementById('results-detail-page'),
            myResults: document.getElementById('my-results-page'),
            share: document.getElementById('share-page')
        };

        // Buttons
        this.buttons = {
            start: document.getElementById('start-btn'),
            back: document.getElementById('back-btn'),
            restart: document.getElementById('restart-btn'),
            restartDetail: document.getElementById('restart-btn-detail'),
            save: document.getElementById('save-btn'),
            share: document.getElementById('share-btn'),
            shareResult: document.getElementById('share-result-btn'),
            downloadResult: document.getElementById('download-result-btn'),
            backShare: document.getElementById('back-share-btn'),
            copyLink: document.getElementById('copy-link-btn'),
            startTournament: document.getElementById('start-tournament-btn'),
            navHome: document.querySelector('[data-page="home"]'),
            navResults: document.querySelector('[data-page="my-results"]')
        };

        // Share buttons
        this.shareButtons = {
            kakao: document.getElementById('share-kakao'),
            facebook: document.getElementById('share-facebook'),
            twitter: document.getElementById('share-twitter'),
            instagram: document.getElementById('share-instagram')
        };

        // Tournament elements
        this.tournament = {
            leftCard: document.getElementById('left-card'),
            rightCard: document.getElementById('right-card'),
            leftImage: document.getElementById('left-image'),
            leftName: document.getElementById('left-name'),
            leftCategory: document.getElementById('left-category'),
            rightImage: document.getElementById('right-image'),
            rightName: document.getElementById('right-name'),
            rightCategory: document.getElementById('right-category'),
            progressFill: document.getElementById('progress-fill'),
            progressPercentage: document.getElementById('progress-percentage'),
            currentRoundLabel: document.getElementById('current-round-label'),
            roundName: document.getElementById('round-name'),
            roundMatchInfo: document.getElementById('round-match-info')
        };

        // Results elements
        this.results = {
            championImage: document.getElementById('champion-image'),
            championName: document.getElementById('champion-name'),
            championCategory: document.getElementById('champion-category'),
            cardsContainer: document.getElementById('results-cards-container'),
            statsContainer: document.getElementById('results-detail-stats')
        };

        // Share elements
        this.share = {
            shareImage: document.getElementById('share-image'),
            shareText: document.getElementById('share-text'),
            qrcodeContainer: document.getElementById('qrcode')
        };

        // Utilities
        this.modal = document.getElementById('modal');
        this.toast = document.getElementById('toast');
        this.container = document.querySelector('.container');
    }

    attachEventListeners() {
        // Helper function to safely attach events
        const on = (element, event, handler) => {
            if (element) element.addEventListener(event, handler);
        };

        // Start tournament
        on(this.buttons.start, 'click', () => this.startTournament());
        on(this.buttons.startTournament, 'click', () => this.startTournament());

        // Tournament controls
        on(this.buttons.back, 'click', () => this.goBack());
        on(this.tournament.leftCard, 'click', () => this.selectWinner(true));
        on(this.tournament.rightCard, 'click', () => this.selectWinner(false));

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (this.currentPage === 'tournament') {
                if (e.key === 'ArrowLeft') this.selectWinner(true);
                if (e.key === 'ArrowRight') this.selectWinner(false);
            }
        });

        // Results page
        on(this.buttons.restart, 'click', () => this.startTournament());
        on(this.buttons.restartDetail, 'click', () => this.startTournament());
        on(this.buttons.save, 'click', () => this.saveAndShowResults());
        on(this.buttons.share, 'click', () => this.goToShare());

        // Results detail page
        on(this.buttons.shareResult, 'click', () => this.goToShare());
        on(this.buttons.downloadResult, 'click', () => this.downloadResult());

        // Share page
        on(this.buttons.copyLink, 'click', () => this.copyShareLink());
        on(this.buttons.backShare, 'click', () => this.goToResultsDetail());

        // Share buttons
        on(this.shareButtons.kakao, 'click', () => this.shareToKakao());
        on(this.shareButtons.facebook, 'click', () => this.shareToFacebook());
        on(this.shareButtons.twitter, 'click', () => this.shareToTwitter());
        on(this.shareButtons.instagram, 'click', () => this.shareToInstagram());

        // Navigation
        on(this.buttons.navHome, 'click', () => this.goToHome());
        on(this.buttons.navResults, 'click', () => this.goToMyResults());
    }

    startTournament() {
        const selectedFoods = foodDB.getRandomFoods(64);
        this.currentTournament = new Tournament(selectedFoods);
        this.currentTournament.initialize();

        this.displayMatchup();
        this.goToPage('tournament');
    }

    displayMatchup() {
        const matchup = this.currentTournament.getCurrentMatchup();

        if (!matchup) {
            this.displayResults();
            return;
        }

        this.tournament.leftImage.src = matchup.food1.image;
        this.tournament.leftImage.alt = matchup.food1.name;
        this.tournament.leftName.textContent = matchup.food1.name;
        this.tournament.leftCategory.textContent = matchup.food1.category;

        this.tournament.rightImage.src = matchup.food2.image;
        this.tournament.rightImage.alt = matchup.food2.name;
        this.tournament.rightName.textContent = matchup.food2.name;
        this.tournament.rightCategory.textContent = matchup.food2.category;

        this.tournament.currentRoundLabel.textContent = matchup.roundName;

        // Update round info card
        this.tournament.roundName.textContent = matchup.roundName;
        this.tournament.roundMatchInfo.textContent = `${matchup.matchIndex + 1}/${matchup.totalMatches}`;

        const progress = this.currentTournament.getProgress();
        this.tournament.progressFill.style.width = progress.percentage + '%';
        this.tournament.progressPercentage.textContent = progress.percentage + '%';

        this.tournament.leftCard.classList.remove('selected');
        this.tournament.rightCard.classList.remove('selected');
    }

    selectWinner(isLeftWinner) {
        const matchup = this.currentTournament.getCurrentMatchup();
        const selectedFood = isLeftWinner ? matchup.food1 : matchup.food2;

        this.currentTournament.selectWinner(selectedFood);

        const selectedCard = isLeftWinner ? this.tournament.leftCard : this.tournament.rightCard;
        selectedCard.classList.add('selected');

        setTimeout(() => {
            this.displayMatchup();
        }, 300);
    }

    goBack() {
        if (this.currentTournament.history.length === 0) {
            this.showToast('이전 단계가 없습니다');
            return;
        }

        this.currentTournament.goBack();
        this.displayMatchup();
    }

    displayResults() {
        const champion = this.currentTournament.getChampion();

        this.results.championImage.src = champion.image;
        this.results.championImage.alt = champion.name;
        this.results.championName.textContent = champion.name;
        this.results.championCategory.textContent = champion.category;

        this.goToPage('results');
    }

    saveAndShowResults() {
        const champion = this.currentTournament.getChampion();
        const selectedFoods = this.currentTournament.getAllSelectedFoods();

        const savedTournament = storage.saveTournament({
            champion: champion,
            runnerUp: this.currentTournament.getRunnerUp(),
            semifinal: this.currentTournament.getSemifinalFoods(),
            quarterfinal: this.currentTournament.getQuarterfinalFoods(),
            allSelectedFoods: selectedFoods,
            foods: this.currentTournament.allFoods
        });

        this.displayResultsDetail(selectedFoods);
        this.generateShareContent(champion, selectedFoods);
        this.goToPage('resultsDetail');

        this.showToast('결과가 저장되었습니다! 📊');
    }

    displayResultsDetail(selectedFoods) {
        const { champion, runnerUp, semifinal, quarterfinal } = selectedFoods;

        let html = '';

        if (champion) {
            html += this.createFoodCard(champion, '우승');
        }

        if (runnerUp) {
            html += this.createFoodCard(runnerUp, '준우승');
        }

        semifinal.forEach(food => {
            html += this.createFoodCard(food, '4강');
        });

        quarterfinal.forEach(food => {
            html += this.createFoodCard(food, '8강');
        });

        this.results.cardsContainer.innerHTML = html;
    }

    createFoodCard(food, badge) {
        return `
            <div class="results-card">
                <img class="results-card__image" src="${food.image}" alt="${food.name}">
                <div class="results-card__content">
                    <p class="results-card__name">${food.name}</p>
                    <span class="results-card__badge">${badge}</span>
                </div>
            </div>
        `;
    }

    async generateShareContent(champion, selectedFoods) {
        const shareText = shareManager.generateShareText(champion);
        const shareImageUrl = await shareManager.generateShareImage(champion, this.currentTournament.allFoods);

        this.shareImageUrl = shareImageUrl;

        this.share.shareText.textContent = shareText;
        if (shareImageUrl) {
            this.share.shareImage.src = shareImageUrl;
        }
    }

    async goToShare() {
        const shareId = shareManager.generateShareId({
            champion: this.currentTournament.getChampion(),
            selectedFoods: this.currentTournament.getAllSelectedFoods(),
            foods: this.currentTournament.allFoods
        });

        const shareUrl = shareManager.getShareUrl(shareId);

        this.share.shareText.textContent = shareManager.generateShareText(this.currentTournament.getChampion());

        await shareManager.generateQRCode(shareUrl, this.share.qrcodeContainer);

        this.goToPage('share');
    }

    goToResultsDetail() {
        if (this.currentTournament) {
            const selectedFoods = this.currentTournament.getAllSelectedFoods();
            this.displayResultsDetail(selectedFoods);
            this.goToPage('resultsDetail');
        }
    }

    async shareToKakao() {
        const shareId = shareManager.generateShareId({
            champion: this.currentTournament.getChampion(),
            selectedFoods: this.currentTournament.getAllSelectedFoods(),
            foods: this.currentTournament.allFoods
        });

        const shareUrl = shareManager.getShareUrl(shareId);
        const shareText = shareManager.generateShareText(this.currentTournament.getChampion());

        shareManager.shareToKakao(shareText, this.shareImageUrl, shareUrl);
        this.showToast('카카오톡으로 공유되었습니다! 📱');
    }

    async shareToFacebook() {
        const shareId = shareManager.generateShareId({
            champion: this.currentTournament.getChampion(),
            selectedFoods: this.currentTournament.getAllSelectedFoods(),
            foods: this.currentTournament.allFoods
        });

        const shareUrl = shareManager.getShareUrl(shareId);
        shareManager.shareToFacebook(shareUrl);
    }

    async shareToTwitter() {
        const shareId = shareManager.generateShareId({
            champion: this.currentTournament.getChampion(),
            selectedFoods: this.currentTournament.getAllSelectedFoods(),
            foods: this.currentTournament.allFoods
        });

        const shareUrl = shareManager.getShareUrl(shareId);
        const shareText = shareManager.generateShareText(this.currentTournament.getChampion());

        shareManager.shareToTwitter(shareText, shareUrl);
    }

    async shareToInstagram() {
        if (this.shareImageUrl) {
            shareManager.downloadImage(this.shareImageUrl, 'food-cup-result.png');
            this.showToast('이미지가 다운로드되었습니다. 인스타그램에 업로드해주세요! 📷');
        }
    }

    async copyShareLink() {
        const shareId = Array.from(sessionStorage.keys()).find(key => key.startsWith('share_'));
        if (shareId) {
            const shareUrl = shareManager.getShareUrl(shareId);
            await shareManager.copyToClipboard(shareUrl);
            this.showToast('링크가 복사되었습니다! 📋');
        }
    }

    async downloadResult() {
        if (this.shareImageUrl) {
            await shareManager.downloadImage(this.shareImageUrl, 'food-cup-result.png');
            this.showToast('이미지가 다운로드되었습니다! 📥');
        }
    }

    goToMyResults() {
        const tournaments = storage.getTournaments();

        if (tournaments.length === 0) {
            this.goToPage('myResults');
            return;
        }

        let html = '';
        tournaments.forEach(tournament => {
            const date = new Date(tournament.createdAt).toLocaleDateString('ko-KR');
            html += `
                <div class="tournament-card">
                    <div class="tournament-card__champion">
                        <img class="tournament-card__champion-image" src="${tournament.champion.image}" alt="${tournament.champion.name}">
                        <div>
                            <p class="tournament-card__champion-name">${tournament.champion.name}</p>
                            <p class="tournament-card__date">${date}</p>
                        </div>
                    </div>
                    <div class="tournament-card__actions">
                        <button class="btn btn--secondary" onclick="app.viewTournamentDetail('${tournament.id}')">상세보기</button>
                        <button class="btn btn--outline" onclick="app.deleteTournament('${tournament.id}')">삭제</button>
                    </div>
                </div>
            `;
        });

        document.getElementById('saved-tournaments-container').innerHTML = html;
        this.goToPage('myResults');
    }

    viewTournamentDetail(tournamentId) {
        const tournament = storage.getTournamentById(tournamentId);

        if (!tournament) {
            this.showToast('결과를 찾을 수 없습니다');
            return;
        }

        this.displayResultsDetail(tournament.allSelectedFoods);

        this.currentTournament = {
            getChampion: () => tournament.champion,
            getAllSelectedFoods: () => tournament.allSelectedFoods,
            allFoods: tournament.foods
        };

        this.goToPage('resultsDetail');
    }

    deleteTournament(tournamentId) {
        if (confirm('정말 삭제하시겠습니까?')) {
            storage.deleteTournament(tournamentId);
            this.showToast('결과가 삭제되었습니다');
            this.goToMyResults();
        }
    }

    goToHome() {
        this.goToPage('home');
    }

    goToPage(pageName) {
        Object.values(this.pages).forEach(page => {
            if (page) page.classList.remove('page--active');
        });

        if (this.pages[pageName]) {
            this.pages[pageName].classList.add('page--active');
            this.currentPage = pageName;
        }
    }

    checkSharedResult() {
        const params = new URLSearchParams(window.location.search);
        const shareId = params.get('share');

        if (shareId) {
            const sharedData = shareManager.retrieveSharedData(shareId);

            if (sharedData) {
                const { champion, allSelectedFoods, foods } = sharedData.data;

                this.currentTournament = {
                    getChampion: () => champion,
                    getAllSelectedFoods: () => allSelectedFoods,
                    allFoods: foods
                };

                this.displayResultsDetail(allSelectedFoods);
                this.generateShareContent(champion, allSelectedFoods);
                this.goToPage('resultsDetail');
            }
        }
    }

    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('toast--active');

        setTimeout(() => {
            this.toast.classList.remove('toast--active');
        }, 3000);
    }

    showModal(title, message, onConfirm) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;

        this.modal.classList.add('modal--active');

        document.getElementById('modal-confirm').onclick = () => {
            this.modal.classList.remove('modal--active');
            if (onConfirm) onConfirm();
        };

        document.getElementById('modal-cancel').onclick = () => {
            this.modal.classList.remove('modal--active');
        };
    }
}

const app = new FoodCupApp();
