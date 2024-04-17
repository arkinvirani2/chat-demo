import User from "../model/user.js";
import logger from "../utils/logger.js";

export const createUser = async ({ bodyData, res }) => {
  try {
    const { email } = bodyData;
    let user = await User.findOne({ email });
    if (user) {
      res.sendResponse({ error: "User already exists" }, 400);
    }

    console.log("{ ...bodyData }: ", { ...bodyData });
    user = new User({ ...bodyData });
    await user.save();
    return true;
  } catch (error) {
    logger.info("error :", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const [users, usersCount] = await Promise.all([
      User.find(),
      User.countDocuments(),
    ]);
    logger.info("exited getUsersList function with success");
    return { users, usersCount };
  } catch (error) {
    logger.info("error => ", error);
    throw error;
  }
};

export default createUser;
