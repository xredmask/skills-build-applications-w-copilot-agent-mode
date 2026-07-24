"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    try {
        const items = await Activity_1.default.find()
            .populate('user', 'displayName username')
            .populate('team', 'name city')
            .sort({ performedAt: -1 })
            .lean();
        res.status(200).json({ resource: 'activities', count: items.length, items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
exports.default = activitiesRouter;
