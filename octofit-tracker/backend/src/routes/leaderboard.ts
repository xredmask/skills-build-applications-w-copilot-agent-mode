import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const items = await Leaderboard.find()
      .populate('user', 'displayName username')
      .populate('team', 'name city')
      .sort({ period: 1, rank: 1 })
      .lean();
    res.status(200).json({ resource: 'leaderboard', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard entries', error });
  }
});

export default leaderboardRouter;
