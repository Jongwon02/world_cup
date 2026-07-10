/* ===========================
   FOOD CUP - Local Storage Manager
   Save & Load Tournament Results
   =========================== */

const STORAGE_KEY = 'foodcup_tournaments';
const STORAGE_VERSION = '1.0';

class StorageManager {
    constructor() {
        this.storageKey = STORAGE_KEY;
        this.initStorage();
    }

    initStorage() {
        if (!this.get()) {
            this.set({
                version: STORAGE_VERSION,
                tournaments: []
            });
        }
    }

    get() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Failed to read from localStorage:', e);
            return null;
        }
    }

    set(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Failed to write to localStorage:', e);
            return false;
        }
    }

    saveTournament(tournamentData) {
        const storage = this.get();

        if (!storage || !storage.tournaments) {
            storage.tournaments = [];
        }

        const resultData = {
            id: this.generateId(),
            champion: tournamentData.champion,
            runnerUp: tournamentData.runnerUp,
            semifinal: tournamentData.semifinal,
            quarterfinal: tournamentData.quarterfinal,
            allSelectedFoods: tournamentData.allSelectedFoods,
            foods: tournamentData.foods,
            timestamp: new Date().toISOString(),
            createdAt: new Date().getTime()
        };

        storage.tournaments.push(resultData);

        this.set(storage);

        return resultData;
    }

    getTournaments() {
        const storage = this.get();
        if (!storage || !storage.tournaments) {
            return [];
        }

        return storage.tournaments.sort((a, b) => b.createdAt - a.createdAt);
    }

    getTournamentById(id) {
        const storage = this.get();
        if (!storage || !storage.tournaments) {
            return null;
        }

        return storage.tournaments.find(t => t.id === id);
    }

    deleteTournament(id) {
        const storage = this.get();

        if (!storage || !storage.tournaments) {
            return false;
        }

        const index = storage.tournaments.findIndex(t => t.id === id);

        if (index === -1) {
            return false;
        }

        storage.tournaments.splice(index, 1);
        this.set(storage);

        return true;
    }

    deleteAllTournaments() {
        const storage = this.get();
        storage.tournaments = [];
        this.set(storage);
        return true;
    }

    generateId() {
        return 'tournament_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    exportData() {
        return this.get();
    }

    importData(data) {
        if (data && data.version && data.tournaments) {
            this.set(data);
            return true;
        }
        return false;
    }

    clearStorage() {
        try {
            localStorage.removeItem(this.storageKey);
            this.initStorage();
            return true;
        } catch (e) {
            console.error('Failed to clear localStorage:', e);
            return false;
        }
    }

    getStorageSize() {
        try {
            const storage = this.get();
            const json = JSON.stringify(storage);
            return json.length;
        } catch (e) {
            return 0;
        }
    }

    getStats() {
        const storage = this.get();
        const tournaments = storage.tournaments || [];

        return {
            totalTournaments: tournaments.length,
            storageSize: this.getStorageSize(),
            oldestDate: tournaments.length > 0 ? tournaments[tournaments.length - 1].timestamp : null,
            newestDate: tournaments.length > 0 ? tournaments[0].timestamp : null
        };
    }
}

const storage = new StorageManager();
