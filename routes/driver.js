/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Gerenciamento de pilotos da Fórmula 1 2023
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       required:
 *         - name
 *         - team
 *         - points
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do piloto
 *         name:
 *           type: string
 *           example: Max Verstappen
 *         team:
 *           type: string
 *           example: Red Bull Racing
 *         points:
 *           type: number
 *           example: 575
 */

import express from "express";
import { drivers, sortData } from "../data.js";
import { randomUUID } from "node:crypto";
import {
  validateDriverInfo,
  validateUpdateDriverInfo,
  validatePosition,
} from "../inputValidation.js";

const router = express.Router();

sortData(drivers);

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Lista todos os pilotos
 *     tags: [Drivers]
 *     responses:
 *       201:
 *         description: Lista de pilotos ordenada por pontos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Driver'
 */
router.get("/", (req, res) => {
  res.status(201).send(drivers);
});

/**
 * @swagger
 * /drivers/{id}:
 *   get:
 *     summary: Retorna um piloto pelo ID
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Piloto encontrado
 *       404:
 *         description: Piloto não encontrado
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);

  if (!selectedDriver) {
    res.status(404).send("Driver not found");
    return;
  }

  res.status(201).send(selectedDriver);
});

/**
 * @swagger
 * /drivers/standings/{position}:
 *   get:
 *     summary: Retorna o piloto em uma posição específica do ranking
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: position
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       201:
 *         description: Piloto encontrado na posição
 *       400:
 *         description: Posição inválida
 */
router.get("/standings/:position", (req, res) => {
  const { position } = req.params;

  const { error } = validatePosition(position, drivers.length);

  if (error) {
    res.status(400).send(error);
    return;
  }

  const selectedDriver = drivers[position - 1];
  res.status(201).send(selectedDriver);
});

/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Cria um novo piloto
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Driver'
 *     responses:
 *       201:
 *         description: Piloto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("", (req, res) => {
  const { error } = validateDriverInfo(req.body);

  if (error) {
    res.status(400).send(error);
    return;
  }

  const newDriver = { ...req.body, id: randomUUID() };
  drivers.push(newDriver);
  sortData(drivers);
  res.status(201).send(newDriver);
});

/**
 * @swagger
 * /drivers/{id}:
 *   put:
 *     summary: Atualiza um piloto existente
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Driver'
 *     responses:
 *       201:
 *         description: Piloto atualizado
 *       404:
 *         description: Piloto não encontrado
 */
router.put("/:id", (req, res) => {
  const { error } = validateUpdateDriverInfo(req.body);

  if (error) {
    res.status(400).send(error);
    return;
  }

  const { id } = req.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);
  if (!selectedDriver) {
    res.status(404).send("Driver not found");
    return;
  }

  for (const key in selectedDriver) {
    if (req.body[key] !== undefined) {
      selectedDriver[key] = req.body[key];
    }
  }
  sortData(drivers);
  res.status(201).send(selectedDriver);
});

/**
 * @swagger
 * /drivers/{id}:
 *   delete:
 *     summary: Remove um piloto
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Piloto removido
 *       404:
 *         description: Piloto não encontrado
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);

  if (!selectedDriver) {
    res.status(404).send("Driver not found");
    return;
  }

  const index = drivers.indexOf(selectedDriver);
  drivers.splice(index, 1);

  res.status(201).send(selectedDriver);
});

export default router;
