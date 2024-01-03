import { Request, Response, Router } from "express";
import UserController from "../controller/UserController";
import ProfileController from "../controller/ProfileController";
import RoleController from "../controller/RoleController";
import FolderController from "../controller/FolderController";
import FileController from "../controller/FileController";
import isAuthenticated from "../middleware/isAuthenticated";

const router = Router();

// // User
router.post("/user", UserController.signUp);
router.post("/user/signIn", UserController.signIn);
router.get("/user/me", isAuthenticated, UserController.detailUser);
router.get("/user", isAuthenticated, UserController.getAll);
router.put("/user/:id", isAuthenticated, UserController.update);

// Profile
router.post("/profile", ProfileController.create);
router.get("/profile", isAuthenticated, ProfileController.getAll);
router.get("/profile/:id", isAuthenticated, ProfileController.get);
router.put("/profile/:id", isAuthenticated, ProfileController.update);
router.delete("/profile/:id", isAuthenticated, ProfileController.delete);

// Role
router.post("/role", RoleController.create);
router.get("/role", isAuthenticated, RoleController.getAll);
router.get("/role/:id", isAuthenticated, RoleController.get);
router.put("/role/:id", isAuthenticated, RoleController.update);
router.delete("/role/:id", isAuthenticated, RoleController.delete);

// Folder
router.post("/folder", isAuthenticated, FolderController.create);
router.get("/folder", isAuthenticated, FolderController.getAll);
router.get("/folder/user", isAuthenticated, FolderController.getFolderUser);
router.get("/folder/:id", isAuthenticated, FolderController.get);
router.put("/folder/:id", isAuthenticated, FolderController.update);
router.delete("/folder/:id", isAuthenticated, FolderController.delete);

// File
router.post("/file", isAuthenticated, FileController.create);
router.get("/file/folder/:id", isAuthenticated, FileController.get);
router.put("/file/:id", isAuthenticated, FileController.update);
router.delete("/file/:id", isAuthenticated, FileController.delete);

export default router;
