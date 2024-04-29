import mongoose from 'mongoose';
import { ToDo } from '../helpers/interface';


const todoSchema = new mongoose.Schema<ToDo>({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{
    collection:"todo"
});

export default mongoose.model<ToDo>('Todo', todoSchema);
