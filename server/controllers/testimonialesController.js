const Testimonial = require("../models/Testimoniales");

exports.mostrarTestimoniales = async (req, res) => {
  const testimoniales = await Testimonial.findAll();
  res.render("testimoniales", {
    pagina: "Testimoniales",
    testimoniales,
  });
};

exports.agregarTestimonial = async (req, res) => {
  // validar campos llenos
  let { nombre, correo, mensaje } = req.body;

  let errores = [];
  if (!nombre) {
    errores.push({ mensaje: "Agrega tu Nombre" });
  }
  if (!correo) {
    errores.push({ mensaje: "Agrega tu Correo" });
  }
  if (!mensaje) {
    errores.push({ mensaje: "Agrega tu Mensaje" });
  }

  // revisar errores
  if (errores.length > 0) {
    // muestra la vista con errores
    const testimoniales = await Testimonial.findAll();
    res.render("testimoniales", {
      errores,
      nombre,
      correo,
      mensaje,
      pagina: "Testimoniales",
      testimoniales,
    });
  } else {
    // almacenar en la bd
    await Testimonial.create({
      nombre,
      correo,
      mensaje,
    });
    res.redirect("/testimoniales");
  }
};
