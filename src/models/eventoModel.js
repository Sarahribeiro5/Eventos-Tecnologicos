import prisma from "../../prisma/prisma.js";

// Array para armazenar os eventos em memória
let eventos = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "A conference about the latest in technology.",
    date: "2025-05-15",
    location: "São Paulo, Brazil",
    capacity: 500,
    category: "Technology",
    price: 100.0,
  },
];

class EventosModel {
  // Obter todos os eventos
  async findAll() {
    const eventos = await prisma.eventos.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(eventos);

    return eventos;
  }

  // Obter um eventos pelo ID
  async findById(id) {
    const eventos = await prisma.eventos.findUnique({
      where: {
        id: Number(id),
      },
    });

    return eventos;
  }

  // Criar um novo eventos
  async create(
    title,
    description,
    date,
    location,
    capacity,
    category,
    price,
    createdAt,
    updatedAt
  ) {
    const newEventos = await prisma.eventos.create({
      data: {
        title,
        description,
        date,
        location,
        capacity,
        category,
        price,
        createdAt,
        updatedAt,
      },
    });

    return newEventos;
  }

  // Atualizar um eventos
  async update(
    id,
    title,
    description,
    date,
    location,
    capacity,
    category,
    price,
    createdAt,
    updatedAt
  ) {
    const eventos = await this.findById(id);

    if (!eventos) {
      return null;
    }

    // Atualize o aventos existente com os novos dados
    const data = {};
    if (title !== undefined) {
      data.title = title;
    }
    if (description !== undefined) {
      data.description = description;
    }
    if (date !== undefined) {
      data.date = date;
    }
    if (location !== undefined) {
      data.location = location;
    }
    if (capacity !== undefined) {
      data.capacity = capacity;
    }
    if (category !== undefined) {
      data.category = category;
    }
    if (price !== undefined) {
      data.price = price;
    }
    if (createdAt !== undefined) {
      data.createdAt = createdAt;
    }
    if (updatedAt !== undefined) {
      data.updatedAt = updatedAt;
    }

    const eventosUpdated = await prisma.eventos.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return eventosUpdated;
  }

  // Remover um eventos
  async delete(id) {
    const eventos = await this.findById(id);

    if (!eventos) {
      return null;
    }

    await prisma.eventos.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new EventosModel();
