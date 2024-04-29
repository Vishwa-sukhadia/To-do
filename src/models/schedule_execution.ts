import { Schema, model, Model } from "mongoose";
import { ScheduleExecution } from "../helpers/interface";

const scheduleExecutionSchema = new Schema<ScheduleExecution>(
  {
    unique_name: {
      type: String,
    },
    rule: {
      type: Object,
    },
    nextExecution: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "schedule_execution",
  }
);

const ScheduleExecutionModel: Model<ScheduleExecution> =
  model<ScheduleExecution>("schedule_execution", scheduleExecutionSchema);
export default ScheduleExecutionModel;
