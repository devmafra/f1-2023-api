/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Classificação de construtores da Fórmula 1 2023
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         team:
 *           type: string
 *           example: Red Bull Racing
 *         points:
 *           type: number
 *           example: 860
 */

import express from "express";
import { sortData, generateTeamsArray } from "../data.js";
import { validatePosition } from "../inputValidation.js";

const router = express.Router();
/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retorna a classificação das equipes
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Lista de equipes ordenadas por pontos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get("/", (req, res) => {
  res.status(200).send(sortData(generateTeamsArray()));
});

/**
 * @swagger
 * /teams/standings/{position}:
 *   get:
 *     summary: Retorna a equipe em uma posição específica
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: position
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Equipe encontrada
 *       400:
 *         description: Posição inválida
 */
router.get("/standings/:position", (req, res) => {
  const teams = sortData(generateTeamsArray());
  const { position } = req.params;

  const { error } = validatePosition(position, teams.length);

  if (error) {
    res.status(400).send(error);
    return;
  }

  const selectedTeam = teams[position - 1];
  res.status(200).send(selectedTeam);
});

export default router;
