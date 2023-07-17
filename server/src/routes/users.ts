import express from "express";
import * as userController from "../controllers/users";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/upload", upload.single("file"), userController.uploadCSV);

router.get("/", userController.getAllUsers);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/range", userController.getUsersInRange);

router.post("/search/start", userController.searchByFieldStartWith);

router.post("/search/end", userController.searchByFieldEndWith);

router.post("/search/include", userController.searchByFieldInclude);

router.get("/count", userController.getUserCount);

router.post("/updateLocations", userController.updateAllUserLocations); // added line

router.get("/check/:id", userController.checkIfUserExists);

export default router;
