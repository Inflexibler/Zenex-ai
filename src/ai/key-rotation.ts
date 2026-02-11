class KeyRotationManager {
    constructor() {
        this.providers = {
            Groq: [],
            SambaNova: [],
            Gemini: []
        };
        this.blacklist = new Set();
        this.healthCheckInterval = 300000; // 5 minutes
        this.initialize();
    }

    initialize() {
        this.startHealthChecks();
    }

    startHealthChecks() {
        setInterval(() => {
            this.performHealthCheck();
        }, this.healthCheckInterval);
    }

    performHealthCheck() {
        // Logic to check health of API keys
        console.log('Performing health checks on API keys...');
    }

    addProvider(providerName, apiKeys) {
        if (providerName in this.providers) {
            this.providers[providerName].push(...apiKeys);
        } else {
            throw new Error('Provider not recognized.');
        }
    }

    getKey(providerName) {
        if (!this.providers[providerName] || this.providers[providerName].length === 0) {
            throw new Error('No available API keys.');
        }

        const keys = this.providers[providerName].filter(key => !this.blacklist.has(key));
        if (keys.length === 0) {
            throw new Error('All keys are blacklisted.');
        }

        const randomIndex = Math.floor(Math.random() * keys.length);
        return keys[randomIndex];
    }

    handleError(error, key) {
        if (error.status === 429) {
            this.blacklist.add(key);
            setTimeout(() => {
                this.blacklist.delete(key);
                console.log(`Key ${key} has been removed from blacklist.`);
            }, 60000); // Remove after 60 seconds
        }
    }

    exponentialBackoff(retries) {
        return new Promise(resolve => {
            const delay = Math.pow(2, retries) * 1000;
            setTimeout(resolve, delay);
        });
    }
}