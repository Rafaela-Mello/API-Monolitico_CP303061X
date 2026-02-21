const userService = require('../services/user.service');

class UserController {

  async create(req, res) {
    try {
      const { nome, email } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
      }

      const user = await userService.createUser(nome, email);
      return res.status(201).json(user);

    } catch (error) {
      if (error.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async findAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.status(200).json(user);

    } catch {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, status } = req.body;

      if (!nome || !status) {
        return res.status(400).json({ error: 'Nome e status são obrigatórios.' });
      }

      const updated = await userService.updateUser(id, nome, status);

      if (updated === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });

    } catch {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const updated = await userService.deactivateUser(id);

      if (updated === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.status(200).json({ message: 'Usuário desativado com sucesso.' });

    } catch {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

}

module.exports = new UserController();