import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMin: { type: Number, required: true, min: 5 },
    targetMuscles: [{ type: String, required: true, trim: true }],
    equipment: [{ type: String, trim: true }],
    instructions: [{ type: String, required: true, trim: true }],
    caloriesEstimate: { type: Number, required: true, min: 10 },
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;
