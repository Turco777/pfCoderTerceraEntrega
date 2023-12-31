import { usersService } from "../services/index.js";
import ErrorsDictionary from "../dictionaries/errors.js";
import errorCodes from "../dictionaries/errorCodes.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    return res.send({ status: "success", payload: users });
  } catch (error) {
    const customError = new Error();
    const knownError = ErrorsDictionary[error.name];

    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(customError);
    } else {
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(error);
    }
  }
};
const getUserBy = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersService.getUserBy({ _id: uid });
    if (!user) {
      req.logger.warning(
        `[${new Date().toISOString()}] Alerta: Usuario no encontrado`
      );
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    }
    return res.send({ status: "success", payload: user });
  } catch (error) {
    const customError = new Error();
    const knownError = ErrorsDictionary[error.name];

    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(customError);
    } else {
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(error);
    }
  }
};
const createUser = async (req, res, next) => {
  try {
    const result = await usersService.createUser();
    req.logger.info(
      `[${new Date().toISOString()}] Usuario creado con id: ${result._id}`
    );
    return res.send({ status: "success", payload: result._id });
  } catch (error) {
    const customError = new Error();
    const knownError = ErrorsDictionary[error.name];

    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(customError);
    } else {
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(error);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersService.getUserBy({ _id: uid });
    if (!user) {
      req.logger.warning(
        `[${new Date().toISOString()}] Alerta: Usuario no encontrado`
      );
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    }

    const result = await usersService.updateUser(uid, req.body);
    return res.send({ status: "success", payload: result });
  } catch (error) {
    const customError = new Error();
    const knownError = ErrorsDictionary[error.name];

    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(customError);
    } else {
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(error);
    }
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersService.getUserBy({ _id: uid });
    if (!user) {
      eq.logger.warning(
        `[${new Date().toISOString()}] Alerta: Usuario no encontrado`
      );
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    }
    await usersService.deleteUser(uid);
    return res.send({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    const customError = new Error();
    const knownError = ErrorsDictionary[error.name];

    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(customError);
    } else {
      req.logger.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      next(error);
    }
  }
};

export default {
  getUsers,
  getUserBy,
  createUser,
  updateUser,
  deleteUser,
};