import { Client } from 'pg';

// Initialize CockroachDB Client
const client = new Client({
    connectionString: process.env.COCKROACH_DB_URL,
});

// Connect to the database
const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to CockroachDB');
    } catch (error) {
        console.error('Connection error', error.stack);
    }
};

// User Profile Operations
const createUserProfile = async (userProfile) => {
    const query = 'INSERT INTO user_profiles (id, name, email) VALUES ($1, $2, $3)';
    const values = [userProfile.id, userProfile.name, userProfile.email];
    await client.query(query, values);
};

const getUserProfile = async (id) => {
    const query = 'SELECT * FROM user_profiles WHERE id = $1';
    const values = [id];
    const res = await client.query(query, values);
    return res.rows[0];
};

// Subscription Operations
const createSubscription = async (subscription) => {
    const query = 'INSERT INTO subscriptions (user_id, plan, start_date, end_date) VALUES ($1, $2, $3, $4)';
    const values = [subscription.user_id, subscription.plan, subscription.start_date, subscription.end_date];
    await client.query(query, values);
};

// AI Usage Limits
const setUsageLimit = async (userId, limit) => {
    const query = 'UPDATE user_profiles SET usage_limit = $1 WHERE id = $2';
    const values = [limit, userId];
    await client.query(query, values);
};

// Project Indexing
const createProjectIndex = async (project) => {
    const query = 'INSERT INTO projects (id, user_id, name, description) VALUES ($1, $2, $3, $4)';
    const values = [project.id, project.user_id, project.name, project.description];
    await client.query(query, values);
};

export {
    connect,
    createUserProfile,
    getUserProfile,
    createSubscription,
    setUsageLimit,
    createProjectIndex,
};
