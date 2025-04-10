import prisma from "../../prisma/prisma.js";

// Array para armazenar os eventos em memória
/* let eventos = [
  {
    id: 1,
    title: "Attack on Titan",
    description: "Humanidade lutando contra titãs em um mundo pós-apocalíptico",
    episodes: 75,
    releaseYear: 2013,
    studio: "MAPPA",
    genres: "Ação,Drama,Fantasia",
    rating: 4.8,
    imageUrl: "https://example.com/aot.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "My Hero Academia",
    description:
      "Em um mundo onde quase todos possuem superpoderes, um garoto sem poderes luta para se tornar um herói",
    episodes: 113,
    releaseYear: 2016,
    studio: "Bones",
    genres: "Ação,Comédia,Super-heróis",
    rating: 4.6,
    imageUrl: "https://example.com/mha.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]; */

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
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
  ) {
    const newEventos = await prisma.eventos.create({
      data: {
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl,
      },
    });

    return newEventos;
  }

  // Atualizar um eventos
  async update(
    id,
    title,
    description,
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
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
    if (episodes !== undefined) {
      data.episodes = episodes;
    }
    if (releaseYear !== undefined) {
      data.releaseYear = releaseYear;
    }
    if (studio !== undefined) {
      data.studio = studio;
    }
    if (genres !== undefined) {
      data.genres = genres;
    }
    if (rating !== undefined) {
      data.rating = rating;
    }
    if (imageUrl !== undefined) {
      data.imageUrl = imageUrl;
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
