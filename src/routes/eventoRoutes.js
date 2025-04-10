import express from "express";
import EventoController from "../controllers/eventoController.js";

const eventosRouter = express.Router();

// Rotas de eventos
// GET /api/eventos - Listar todos os eventos
eventosRouter.get("/", EventoController.getAllEventos);

// GET /api/eventos/:id - Obter um eventos pelo ID
eventosRouter.get("/:id", EventoController.getEventoById);

// POST /api/eventos - Criar um novo evento
eventosRouter.post("/", EventoController.createEvento);

// PUT /api/eventos/:id - Atualizar um evento
eventosRouter.put("/:id", EventoController.updateEvento);

// DELETE /api/eventos/:id - Remover um evento
eventosRouter.delete("/:id", EventoController.deleteEvento);

export default eventosRouter;
