import { checkAuth, connectDB } from "../../../utils/features";
import { TASK } from "../../../models/task";
import { asyncError, errorHandler } from "../../../middleware/error";

const handler = asyncError(async (req, res) => {
  await connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  const taskId = req.query.id;

  const task = await TASK.findById(taskId);

  if (!task) return errorHandler(res, 404, "Task not found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } else if (req.method === "DELETE") {
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } else {
    errorHandler(res, 400, "This method is not available");
  }
});

export default handler;

//next js ke 13.2 version me hum app folder ke andar hi get put post ka alag function he
//but ek problem he ki usme...on demand isr ka option nai he usme

