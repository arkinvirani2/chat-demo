import logger from "../utils/logger.js";
import { createUser, getUsers } from "../services/user.js";

export const createUserController = async (req, res) => {
  logger.info("Entered createUser function");
  try {
    const bodyData = req.body;
    console.log("bodyData: ", bodyData);
    await createUser({ bodyData, res });
    logger.info("exited createUser function with success ");
    res.sendResponse({ message: "User successfully creates" }, 200);
  } catch (error) {
    logger.info("exited createUser function with error :", error);
    res.sendResponse({ message: error.message }, 500);
  }
};

export const getUsersContoller = async (req, res) => {
  try {
    logger.info("Entered createUser function");
    const { users, usersCount } = await getUsers();
    logger.info("exited getUsersController function with success");
    res.sendResponse(
      {
        message: "Users list feched successfully",
        data: users,
        count: usersCount,
      },
      200
    );
  } catch (error) {
    logger.info("exited getUsersListController function with error :", error);
    res.sendResponse({ message: error.message }, 500);
  }
};

export default createUserController;
