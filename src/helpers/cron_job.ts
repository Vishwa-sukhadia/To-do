import schedule from "node-schedule";
import { Response } from "./interface";
import ScheduleExecutionModel from "../models/schedule_execution";
import { generateRandomString, nextMid, currentTime } from "./common";
import { timezone } from "./constant";
import { updateTodoStatus } from "../services/todo";
import { findOneAndUpdateData, createData, getSingleData } from "./common_api";

// Set a job for update Todo's complete status
export async function setCron(): Promise<void> {
  const scheduledData: Response = await getSingleData(
    {},
    ScheduleExecutionModel
  );
  
  if (scheduledData.data) {
    const currentDateTime = currentTime();
      if (currentDateTime > scheduledData.data.nextExecution) {
        nextExecution(scheduledData.data.unique_name);
        updateTodoStatus();
      }
      await scheduleExecution(scheduledData.data.unique_name, scheduledData.data.rule);
  } else {
    const unique_name = generateRandomString();

    // Recurrence rule for every day at midnight
    const tz = timezone;
    const rule = new schedule.RecurrenceRule();
    rule.tz = tz;
    rule.hour = 0;
    rule.minute = 0;
    rule.second = 0;
    const nextMidDate = nextMid();
    let body = {
      unique_name: unique_name,
      rule: rule,
      nextExecution: nextMidDate,
    };
    await createData(body, ScheduleExecutionModel);
    await scheduleExecution(unique_name, rule);
  }
}

// Schedule job
export async function scheduleExecution(
  unique_name: string,
  rule: object
): Promise<void> {
  schedule.scheduleJob(unique_name, rule, async () => {
    try {
      nextExecution(unique_name);
      updateTodoStatus();
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

export async function nextExecution(unique_name: string): Promise<void> {
  const nextMidDate = nextMid();
  findOneAndUpdateData(
    { unique_name: unique_name },
    { nextExecution: nextMidDate },
    ScheduleExecutionModel
  );
}
