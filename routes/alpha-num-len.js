const express = require('express');
const router = new express.Router();

router.get('/', function(req, res, next) {
  res.send('Usage: /alpha-num-len/{str}');
});

router.get('/:str', function(req, res, next) {
  const regex = /[^0-9a-zA-Z_]/g;
  const filtered = req.params['str'].replace(regex, '');
  const result = {filtered: filtered, length: filtered.length};
  res.json(result);
});

module.exports = router;
