import { Router } from "express";
import { EmployeeController } from "../controller/EmployeeController";

const employeeRouter = Router();

employeeRouter.get("/", EmployeeController.getAll);
employeeRouter.get("/:id", EmployeeController.getById);
employeeRouter.post("/", EmployeeController.createEmployee);
employeeRouter.patch("/:id", EmployeeController.updateEmployee);
employeeRouter.delete("/:id", EmployeeController.deleteEmployee);

export default employeeRouter;
