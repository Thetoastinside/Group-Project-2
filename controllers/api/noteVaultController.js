const router = require('express').Router();
const { NoteVault } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/note-vault - create a new note entry
router.post('/', withAuth, async (req, res) => {
  try {
    const newNoteVault = await NoteVault.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(200).json(newNoteVault);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET /api/note-vault - get all notes of current user
router.get('/', withAuth, async (req, res) => {
  try {
    const noteVaultData = await NoteVault.findAll({
      where: { user_id: req.session.userId },
    });

    res.status(200).json(noteVaultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
