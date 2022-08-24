var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const Usuario = require("../db/models").Usuario;
const Huesped = require("../db/models").Huesped;
const Celular = require("../db/models").Celular;

const { cacheInit } = require('../middleware/cache')

//========================== Authentication ====================================
router.post('/login', function(req, res, next) {
  let { username, password } = req.body;

  Usuario.findOne({
    where: { username }
  })
    .then(usuario => {
      bcrypt.compare(password, usuario.password, (err, result) => {
        if (result) {
          res.status(200).send({
            message: `Usuario '${username}' autentificado.`
          });
        } else {
          res.status(403).send({
            err: `Usuario '${username}' no autentificado.`
          });
        }
      });
    })
    .catch(error => res.status(400).send(error));
});

//==============================================================================


//============================= Usuarios =======================================
/* GET Todos los usuarios. */
router.get('/', cacheInit, function(req, res, next) {
  
  Usuario.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
      ]
    },
    include: [
      {
        model: Huesped,
        attributes: {
          exclude: [
            "id_Usuario",
            "createdAt",
            "updatedAt",
          ],
        },
        include: [
          {
            model: Celular,
            as: "Celulares",
            attributes: {
              exclude: [
                "cedula_huesped",
                "createdAt",
                "updatedAt",
              ],
            },
          }
        ],
      },
    ],
  })
    .then(usuarios => {
      setTimeout(() => {
        res.send(usuarios);
    
      },200)
      
    })
    .catch(error => res.status(400).send(error));
});

/* GET Usuario por username. */
router.get('/:username', function(req, res, next) {
  let { username } = req.params;
  Usuario.findOne({
    where: { username },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
      ]
    },
    include: [
      {
        model: Huesped,
        attributes: {
          exclude: [
            "id_Usuario",
            "createdAt",
            "updatedAt",
          ],
        },
        include: [
          {
            model: Celular,
            as: "Celulares",
            attributes: {
              exclude: [
                "cedula_huesped",
                "createdAt",
                "updatedAt",
              ],
            },
          }
        ],
      },
    ],
  })
    .then(usuario => {
      res.send(usuario);
    })
    .catch(error => res.status(400).send(error));
});

/* POST Añadir un usuario. */
router.post('/', function(req, res, next) {
  let admin = req.body.admin;
  let adminBoolean = (admin === "1");
  let nuevo_Usuario = {
    username: req.body.username,
    password: req.body.password,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    email: req.body.email,
    admin: adminBoolean,
  };

  Usuario.create(nuevo_Usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating the client."
      });
    });
});

/* PUT Actualizar un Usuario. */
router.put('/:id_Usuario', (req, res, next) => {
  let { id_Usuario } = req.params;
  let admin = req.body.admin;
  let adminBoolean = (admin === "1");
  let usuario_actualizado = {
    username: req.body.username,
    password: req.body.password,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    email: req.body.email,
    admin: adminBoolean,
    updatedAt: new Date(),
  };

  Usuario.update(usuario_actualizado, {
    where: { id: id_Usuario },
    individualHooks: true,
  })
    .then(data => {
      if (data[0] == 1) {
        res.send({
          message: `Usuario '${id_Usuario}' actualizado exitosamente`
        });
      } else {
        res.send({
          message: `No fué posible actualizar el usuario '${id_Usuario}'.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al actualizar el usuario '${id_Usuario}'.
            Error: ${err}`
      });
    });
});

/* DELETE Eliminar un Usuario. */
router.delete('/:id_Usuario', function(req, res, next) {
  let id_Usuario = req.params.id_Usuario;

  Usuario.destroy({
    where: { id: id_Usuario }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Usuario eliminado exitosamente`
        });
      } else {
        res.send({
          message: `No fué posible eliminar el usuario.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al eliminar el usuario.
            Error: ${err}`
      });
    });
});
//==============================================================================


//============================ Huespedes =======================================
/* POST Añadir un huesped. */
router.post('/huespedes', function(req, res, next) {
  let nuevo_Huesped = {
    cedula: req.body.cedula,
    id_Usuario: req.body.id_Usuario,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    fecha_nacimiento: req.body.fecha_nacimiento,
  };

  Huesped.create(nuevo_Huesped)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating the client."
      });
    });
});

/* PUT Actualizar un Huesped. */
router.put('/huespedes/:id_Usuario', (req, res, next) => {
  let id_Usuario = req.params.id_Usuario;
  let huesped_actualizado = {
    cedula: req.body.cedula,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    updatedAt: new Date(),
  };

  Huesped.update(huesped_actualizado, {
    where: { id_Usuario }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Huesped '${id_Usuario}' actualizado exitosamente`
        });
      } else {
        res.send({
          message: `No fué posible actualizar el Huesped '${id_Usuario}'.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al actualizar el Huesped '${id_Usuario}'.
            Error: ${err}`
      });
    });
});
//==============================================================================

module.exports = router;
