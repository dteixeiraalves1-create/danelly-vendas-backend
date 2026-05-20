const express = require('express');
const router = express.Router();

const { addPoints, getUserPoints, getPointsHistory } = require('../services/pointsService');

router.post('/add-points', async (req, res) => {
  try {
    const { user_id, store_id, action, points } = req.body;

    if (!user_id || !points) {
      return res.status(400).json({ error: 'user_id e points são obrigatórios' });
    }

    await addPoints(user_id, store_id, action, points);
    res.status(200).json({ message: 'Pontos adicionados com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar pontos' });
  }
});

router.get('/points/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const points = await getUserPoints(user_id);
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pontos' });
  }
});

router.get('/history/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const history = await getPointsHistory(user_id);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
});

module.exports = router;
