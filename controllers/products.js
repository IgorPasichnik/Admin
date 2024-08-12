const { prisma } = require("../prisma/prisma-client.js");

const all = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Не удалось получить список товаров" });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;

    if (
      !data.name ||
      !data.vendorCode ||
      !data.type ||
      !data.description ||
      !data.price
    ) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({ message: "Не удалось удалить товар" });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch (err) {
    res.status(500).json({ message: "Не удалось редактировать товар" });
  }
};

const product = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: "Не удалось получить товар" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  product,
};
