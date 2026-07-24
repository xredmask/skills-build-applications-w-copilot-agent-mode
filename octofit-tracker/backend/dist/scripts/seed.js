"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            Activity_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            User_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
        ]);
        const users = await User_1.default.insertMany([
            {
                username: 'ava_runner',
                email: 'ava.runner@example.com',
                displayName: 'Ava Chen',
                age: 28,
                weightKg: 63,
                fitnessLevel: 'advanced',
                weeklyGoal: 'Run 45 km',
            },
            {
                username: 'marcus_lifts',
                email: 'marcus.lifts@example.com',
                displayName: 'Marcus Silva',
                age: 34,
                weightKg: 82,
                fitnessLevel: 'intermediate',
                weeklyGoal: '4 strength sessions',
            },
            {
                username: 'priya_yogi',
                email: 'priya.yogi@example.com',
                displayName: 'Priya Raman',
                age: 31,
                weightKg: 58,
                fitnessLevel: 'intermediate',
                weeklyGoal: 'Daily mobility and yoga',
            },
            {
                username: 'noah_cycle',
                email: 'noah.cycle@example.com',
                displayName: 'Noah Patel',
                age: 26,
                weightKg: 71,
                fitnessLevel: 'beginner',
                weeklyGoal: 'Cycle 60 km',
            },
        ]);
        const teams = await Team_1.default.insertMany([
            {
                name: 'Summit Striders',
                city: 'Seattle',
                motto: 'Climb every mile',
                captain: users[0]._id,
                members: [users[0]._id, users[2]._id],
                points: 1840,
            },
            {
                name: 'Iron Pulse',
                city: 'Austin',
                motto: 'Consistency over intensity',
                captain: users[1]._id,
                members: [users[1]._id, users[3]._id],
                points: 1625,
            },
        ]);
        await User_1.default.updateMany({ _id: { $in: [users[0]._id, users[2]._id] } }, { team: teams[0]._id });
        await User_1.default.updateMany({ _id: { $in: [users[1]._id, users[3]._id] } }, { team: teams[1]._id });
        await Activity_1.default.insertMany([
            {
                user: users[0]._id,
                team: teams[0]._id,
                type: 'run',
                durationMin: 52,
                distanceKm: 10.1,
                caloriesBurned: 640,
                performedAt: new Date('2026-07-20T06:30:00Z'),
            },
            {
                user: users[1]._id,
                team: teams[1]._id,
                type: 'strength',
                durationMin: 68,
                caloriesBurned: 510,
                performedAt: new Date('2026-07-21T17:45:00Z'),
            },
            {
                user: users[2]._id,
                team: teams[0]._id,
                type: 'yoga',
                durationMin: 40,
                caloriesBurned: 220,
                performedAt: new Date('2026-07-22T07:10:00Z'),
            },
            {
                user: users[3]._id,
                team: teams[1]._id,
                type: 'cycle',
                durationMin: 75,
                distanceKm: 28.4,
                caloriesBurned: 690,
                performedAt: new Date('2026-07-23T12:05:00Z'),
            },
            {
                user: users[0]._id,
                team: teams[0]._id,
                type: 'hiit',
                durationMin: 30,
                caloriesBurned: 400,
                performedAt: new Date('2026-07-24T05:55:00Z'),
            },
        ]);
        await Leaderboard_1.default.insertMany([
            {
                period: 'weekly',
                rank: 1,
                user: users[0]._id,
                team: teams[0]._id,
                score: 920,
            },
            {
                period: 'weekly',
                rank: 2,
                user: users[1]._id,
                team: teams[1]._id,
                score: 870,
            },
            {
                period: 'weekly',
                rank: 3,
                user: users[3]._id,
                team: teams[1]._id,
                score: 790,
            },
            {
                period: 'weekly',
                rank: 4,
                user: users[2]._id,
                team: teams[0]._id,
                score: 745,
            },
        ]);
        await Workout_1.default.insertMany([
            {
                title: 'Tempo Run Builder',
                difficulty: 'intermediate',
                durationMin: 50,
                targetMuscles: ['quadriceps', 'hamstrings', 'core'],
                equipment: ['running shoes', 'watch'],
                instructions: [
                    'Warm up for 10 minutes at easy pace.',
                    'Run 3 x 8 minutes at tempo effort with 2-minute recovery jogs.',
                    'Cool down for 8 minutes and stretch hips and calves.',
                ],
                caloriesEstimate: 560,
            },
            {
                title: 'Full-Body Dumbbell Circuit',
                difficulty: 'beginner',
                durationMin: 35,
                targetMuscles: ['chest', 'back', 'legs', 'shoulders'],
                equipment: ['dumbbells', 'mat'],
                instructions: [
                    'Perform 4 rounds: goblet squats, bent-over rows, push-ups, and reverse lunges.',
                    'Work 40 seconds per movement with 20 seconds rest.',
                    'Rest 90 seconds between rounds and focus on controlled form.',
                ],
                caloriesEstimate: 330,
            },
            {
                title: 'Power Endurance HIIT',
                difficulty: 'advanced',
                durationMin: 28,
                targetMuscles: ['glutes', 'core', 'cardio system'],
                equipment: ['kettlebell', 'jump rope'],
                instructions: [
                    'Complete 6 rounds of 30-second jump rope + 30-second kettlebell swings.',
                    'Rest 45 seconds between rounds.',
                    'Finish with a 5-minute core finisher: plank variations.',
                ],
                caloriesEstimate: 420,
            },
        ]);
        console.log('Database seeding complete with realistic users, teams, activities, leaderboard, and workouts.');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
