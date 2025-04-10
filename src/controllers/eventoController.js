import EventoModel from "../models/eventoModel.js";

class EventoController {
  // GET /api/eventos
  async getAllEventos(req, res) {
    try {
      const eventos = await EventoModel.findAll();
      res.json(eventos);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      res.status(500).json({ error: "Erro ao buscar eventos" });
    }
  }

  // GET /api/eventos/:id
  async getEventoById(req, res) {
    try {
      const { id } = req.params;

      const evento = await EventoModel.findById(id);

      if (!evento) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      res.json(evento);
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      res.status(500).json({ error: "Erro ao buscar evento" });
    }
  }

  // POST /api/eventos
  async createEvento(req, res) {
    try {
      // Validação básica
      const {
        title,
        description,
        date,
        location,
        capacity,
        category,
        price,
      } = req.body;

      // Verifica se o título do evento foi fornecido

      if (
        !title ||
        !description ||
        !date ||
        !location ||
        !capacity ||
        !category ||
        !price 
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo evento
      const newEvento = await EventoModel.create(
        title,
        description,
        date,
        location,
        capacity,
        category,
        price,
      );

      if (!newEvento) {
        return res.status(400).json({ error: "Erro ao criar evento" });
      }

      res.status(201).json(newEvento);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      res.status(500).json({ error: "Erro ao criar evento" });
    }
  }

  // PUT /api/eventos/:id
  async updateEvento(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        date,
        location,
        capacity,
        category,
        price,
      } = req.body;

      // Atualizar o evento
      const updatedEvento = await EventoModel.update(
        id,
        title,
        description,
        date,
        location,
        capacity,
        category,
        price,
      );

      if (!updatedEvento) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      res.json(updatedEvento);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      res.status(500).json({ error: "Erro ao atualizar evento" });
    }
  }

  // DELETE /api/eventos/:id
  async deleteEvento(req, res) {
    try {
      const { id } = req.params;

      // Remover o evento
      const result = await EventoModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover evento:", error);
      res.status(500).json({ error: "Erro ao remover evento" });
    }
  }
}

export default new EventoController();
