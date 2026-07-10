/* ===========================
   FOOD CUP - Tournament Engine
   64-Round Tournament Logic
   =========================== */

class Tournament {
    constructor(foods = []) {
        this.allFoods = foods;
        this.rounds = [];
        this.history = [];
        this.currentRoundIndex = 0;
        this.currentMatchIndex = 0;
        this.roundNames = ['64강', '32강', '16강', '8강', '4강', '결승'];
        this.winners = {};
        this.selectedFoods = [];
        this.isComplete = false;
    }

    initialize() {
        this.isComplete = false;
        this.selectedFoods = [];
        this.winners = {};
        this.history = [];
        this.currentRoundIndex = 0;
        this.currentMatchIndex = 0;
        this.rounds = [];

        let currentRound = [...this.allFoods];

        while (currentRound.length > 1) {
            const round = [];
            for (let i = 0; i < currentRound.length; i += 2) {
                round.push({
                    food1: currentRound[i],
                    food2: currentRound[i + 1],
                    winner: null
                });
            }
            this.rounds.push(round);
            currentRound = round.map(match => match.winner).filter(w => w !== null);
        }

        if (currentRound.length === 0) {
            this.currentRoundIndex = 0;
            this.currentMatchIndex = 0;
            return this.getCurrentMatchup();
        }

        return this.getCurrentMatchup();
    }

    getCurrentMatchup() {
        if (this.currentRoundIndex >= this.rounds.length) {
            this.isComplete = true;
            return null;
        }

        const round = this.rounds[this.currentRoundIndex];
        const match = round[this.currentMatchIndex];

        if (!match) {
            return null;
        }

        return {
            food1: match.food1,
            food2: match.food2,
            roundIndex: this.currentRoundIndex,
            matchIndex: this.currentMatchIndex,
            totalMatches: round.length,
            roundName: this.roundNames[this.currentRoundIndex]
        };
    }

    selectWinner(selectedFood) {
        if (this.isComplete) {
            return null;
        }

        const match = this.rounds[this.currentRoundIndex][this.currentMatchIndex];

        match.winner = selectedFood;

        this.history.push({
            round: this.currentRoundIndex,
            matchIndex: this.currentMatchIndex,
            food: selectedFood,
            timestamp: new Date()
        });

        this.selectedFoods.push({
            food: selectedFood,
            round: this.roundNames[this.currentRoundIndex],
            roundLevel: this.currentRoundIndex
        });

        const round = this.rounds[this.currentRoundIndex];

        if (this.currentMatchIndex < round.length - 1) {
            this.currentMatchIndex++;
            return this.getCurrentMatchup();
        } else {
            this.currentRoundIndex++;
            this.currentMatchIndex = 0;

            if (this.currentRoundIndex >= this.rounds.length) {
                this.isComplete = true;
                return null;
            }

            return this.getCurrentMatchup();
        }
    }

    goBack() {
        if (this.history.length === 0) {
            return null;
        }

        this.isComplete = false;
        const lastSelection = this.history.pop();

        this.currentRoundIndex = lastSelection.round;
        this.currentMatchIndex = lastSelection.matchIndex;

        this.selectedFoods = this.selectedFoods.filter(f =>
            !(f.food.name === lastSelection.food.name && f.round === lastSelection.round)
        );

        const match = this.rounds[this.currentRoundIndex][this.currentMatchIndex];
        match.winner = null;

        return this.getCurrentMatchup();
    }

    getProgress() {
        const totalMatches = this.rounds.reduce((acc, round) => acc + round.length, 0);
        const completedMatches = this.history.length;

        return {
            completed: completedMatches,
            total: totalMatches,
            percentage: Math.round((completedMatches / totalMatches) * 100),
            currentRound: this.roundNames[this.currentRoundIndex] || ''
        };
    }

    getChampion() {
        if (this.rounds.length === 0) return null;

        const finalRound = this.rounds[this.rounds.length - 1];
        if (finalRound.length > 0 && finalRound[0].winner) {
            return finalRound[0].winner;
        }

        return null;
    }

    getRunnerUp() {
        if (this.rounds.length < 2) return null;

        const finalRound = this.rounds[this.rounds.length - 1];
        if (finalRound.length > 0) {
            const match = finalRound[0];
            return match.winner === match.food1 ? match.food2 : match.food1;
        }

        return null;
    }

    getSemifinalFoods() {
        if (this.rounds.length < 3) return [];

        const semifinalRound = this.rounds[this.rounds.length - 2];
        return semifinalRound.map(match => match.winner).filter(w => w !== null);
    }

    getQuarterfinalFoods() {
        if (this.rounds.length < 4) return [];

        const quarterfinalRound = this.rounds[this.rounds.length - 3];
        return quarterfinalRound.map(match => match.winner).filter(w => w !== null);
    }

    getAllSelectedFoods() {
        const foodsByRound = {
            champion: this.getChampion(),
            runnerUp: this.getRunnerUp(),
            semifinal: this.getSemifinalFoods(),
            quarterfinal: this.getQuarterfinalFoods()
        };

        return foodsByRound;
    }

    serialize() {
        return {
            allFoods: this.allFoods,
            rounds: this.rounds,
            history: this.history,
            currentRoundIndex: this.currentRoundIndex,
            currentMatchIndex: this.currentMatchIndex,
            isComplete: this.isComplete,
            selectedFoods: this.selectedFoods
        };
    }

    static deserialize(data) {
        const tournament = new Tournament(data.allFoods);
        tournament.rounds = data.rounds;
        tournament.history = data.history;
        tournament.currentRoundIndex = data.currentRoundIndex;
        tournament.currentMatchIndex = data.currentMatchIndex;
        tournament.isComplete = data.isComplete;
        tournament.selectedFoods = data.selectedFoods;
        return tournament;
    }
}

let currentTournament = null;
