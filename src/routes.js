const express = require("express");
const routes = express.Router();

const ClientController = require("./controllers/ClientController");
const ContainerController = require("./controllers/ContainerController");
const MovementController = require("./controllers/MovementController");
const ReportController = require("./controllers/ReportController");

// CRUD - tb_clients
routes.post("/clients/create", ClientController.store);
routes.get("/clients", ClientController.index);
routes.post("/clients/pk", ClientController.show);
routes.post("/clients/like", ClientController.showByLike);
routes.get("/clients/:id", ClientController.showById);
routes.patch("/clients/:id/update", ClientController.save);
routes.delete("/clients/:id/delete", ClientController.delete);

// CRUD - tb_containers
routes.post("/containers/create", ContainerController.store);
routes.get("/containers", ContainerController.index);
routes.post("/containers/pk", ContainerController.show);
routes.post("/containers/like", ContainerController.showByLike);
routes.get("/containers/:id", ContainerController.showById);
routes.patch("/containers/:id/update", ContainerController.save);
routes.delete("/containers/:id/delete", ContainerController.delete);

// CRUD - tb_movements
routes.post("/movements/create", MovementController.store);
routes.get("/movements", MovementController.index);
routes.get("/movements/:id", MovementController.showById);
routes.patch("/movements/:id/update", MovementController.save);
routes.delete("/movements/:id/delete", MovementController.delete);

// Relatório
routes.get("/reports/catm", ReportController.ReportByClientAndTypeMovement);
routes.get("/reports/toc", ReportController.ReportByTypeOfContainer);

module.exports = routes;
