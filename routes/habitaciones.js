var express = require('express');
var router = express.Router();

const Habitacion = require("../db/models").Habitacion;
const Tipo_Habitacion = require("../db/models").Tipo_Habitacion;

//============================= Habitaciones ===================================
/* GET Todas las habitaciones. */
router.get('/', function(req, res, next) {
  Habitacion.findAll({
    attributes: {
      exclude: [
        "id_tipo",
        "createdAt",
        "updatedAt",
      ]
    },
    include: [
      {
        model: Tipo_Habitacion,
        as: "Tipo_Habitacion",
        attributes: {
          exclude: [
            "precio",
            "num_camas",
            "valoracion",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    ],
  })
    .then(habitaciones => {
      res.send(habitaciones);
    })
    .catch(error => res.status(400).send(error))
});

/* POST Añadir una habitación. */
router.post('/', function(req, res, next) {
  let nueva_Habitacion = {
    id_tipo: req.body.id_tipo,
  };

  Habitacion.create(nueva_Habitacion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Un error ocurrió al crear la Habitacion."
      });
    });
});

/* PUT Actualizar una habitación. */
router.put('/:num_Habitacion', (req, res, next) => {
  let num_Habitacion = req.params.num_Habitacion; 
  let habitacion_actualizada = {
    id_tipo: req.body.id_tipo,
    updatedAt: new Date(),
  };

  Habitacion.update(habitacion_actualizada, {
    where: {num: num_Habitacion}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Habitacion numero ${num_Habitacion} actualizada exitosamente`
        });
      } else {
        res.send({
          message: `No fué posible actualizar la habitación numero ${num_Habitacion}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al actualizar la habitación numero ${num_Habitacion}.
        ${err}`
      });
    });
});

/* DELETE Eliminar una habitación. */
router.delete('/:num_Habitacion', function(req, res, next) {
  let num_Habitacion = req.params.num_Habitacion; 

  Habitacion.destroy({
    where: { num: num_Habitacion }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Habitacion numero ${num_Habitacion} eliminada exitosamente`
        });
      } else {
        res.send({
          message: `No fué posible eliminar la habitación numero ${num_Habitacion}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al eliminar habitación numero ${num_Habitacion}.
        ${err}`
      });
    });
});
//==============================================================================


//========================= Tipos de Habitaciones ================================
/* GET Todas los tipos de habitaciones. */
router.get('/tipos', function(req, res, next) {
  Tipo_Habitacion.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
      ]
    },
  })
    .then(tipos_habitaciones => {
      res.send(tipos_habitaciones);
    })
    .catch(error => res.status(400).send(error))
});
//==============================================================================

module.exports = router;
