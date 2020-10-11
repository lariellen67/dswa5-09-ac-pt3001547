//
var ID_CURSO_INC = 4;

var cursos = [
  {
    _id: 1,
    nome: 'Análise e Desenvolvimento de Sistemas',
    email: 'thiago.homem@ifsp.edu.br',
  },
  { _id: 2, nome: 'Letras', email: 'teresa.lombardi@ifsp.edu.br' },
  {
    _id: 3,
    nome: 'Engenharia de Produção',
    email: 'felipe.basile@ifsp.edu.br',
  },
  { _id: 4, nome: 'Administração', email: 'rita.moreira@ifsp.edu.br' },
];

module.exports = function (app) {
  var Curso = app.models.curso;
  var controller = {};
  controller.listaCursos = function (req, res) {
    Curso.find()
      .exec()
      .then(
        function (cursos) {
          res.json(cursos);
        },
        function (error) {
          console.error(error);
          res.status(500).json(error);
        }
      );
  };

  controller.obtemCursos = function (req, res) {
    var _id = req.params.id;
    Curso.findById(_id)
      .exec()
      .then(
        function (curso) {
          if (!curso) throw new Error('Curso não encontrado :(');
          res.json(curso);
        },
        function (error) {
          console.log(error);
          res.status(404).json(error);
        }
      );
  };

  controller.removeCurso = function (req, res) {
    var _id = req.params.id;
    Curso.deleteOne({ _id: _id })
      .exec()
      .then(
        function () {
          res.end();
        },
        function (error) {
          return console.error(error);
        }
      );
  };

  controller.salvaCurso = function (req, res) {
    var _id = req.body._id;
    if (_id) {
      Curso.findByIdAndUpdate(_id, req.body)
        .exec()
        .then(
          function (curso) {
            res.json(curso);
          },
          function (error) {
            console.error(error);
            res.status(500).json(error);
          }
        );
    } else {
      Curso.create(req.body).then(
        function (curso) {
          res.status(201).json(curso);
        },
        function (error) {
          console.log(error);
          res.status(500).json(error);
        }
      );
    }
  };

  function adiciona(cursoNovo) {
    cursoNovo._id = ++ID_CURSO_INC;
    cursos.push(cursoNovo);
    return cursoNovo;
  }

  function atualiza(cursoAlterar) {
    cursos = cursos.map(function (curso) {
      if (curso._id == cursoAlterar._id) {
        curso = cursoAlterar;
      }
      return curso;
    });
    return cursoAlterar;
  }

  return controller;
};
