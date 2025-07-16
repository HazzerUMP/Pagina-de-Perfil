document.addEventListener("DOMContentLoaded", () => {
  const botonesAceptar = document.querySelectorAll(".aceptar");
  const botonesRechazar = document.querySelectorAll(".rechazar");
  const listaConexiones = document.querySelector(".lista-conexiones");
  const contadorSolicitudes = document.getElementById("contador-solicitudes");
  const contadorConexiones = document.getElementById("contador-conexiones");

  function actualizarContadores() {
    const totalSolicitudes = document.querySelectorAll(".solicitudes").length;
    const totalConexiones = listaConexiones.querySelectorAll("li").length;
    contadorSolicitudes.textContent = totalSolicitudes;
    contadorConexiones.textContent = totalConexiones;
  }

  botonesAceptar.forEach(boton => {
    boton.addEventListener("click", () => {
      const solicitud = boton.closest(".solicitudes");
      const nombre = solicitud.querySelector("span").textContent;
      const imagen = solicitud.querySelector("img").src;

      const nuevaConexion = document.createElement("li");
      nuevaConexion.innerHTML = `
        <img src="${imagen}" alt="Foto de perfil">${nombre}
      `;

      listaConexiones.appendChild(nuevaConexion);
      solicitud.remove();

      actualizarContadores();
    });
  });

  botonesRechazar.forEach(boton => {
    boton.addEventListener("click", () => {
      const solicitud = boton.closest(".solicitudes");
      solicitud.remove();
      actualizarContadores();
    });
  });

  actualizarContadores();

  const btnEditar = document.querySelector(".editar-perfil");
  let modoEdicion = false;

  btnEditar.addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = document.querySelector("h2");
    const locacion = document.querySelector(".locacion");
    const descripcion = document.querySelector(".descripcion");
    const bio = document.querySelector(".bio");
    const educacion = document.querySelector(".tarjeta-educacion p");

    if (!modoEdicion) {
      nombre.innerHTML = `<input type="text" value="${nombre.textContent}" id="input-nombre">`;
      locacion.innerHTML = `<input type="text" value="${locacion.textContent}" id="input-locacion">`;
      descripcion.innerHTML = `<textarea id="input-descripcion">${descripcion.textContent}</textarea>`;
      bio.innerHTML = `<textarea id="input-bio">${bio.textContent}</textarea>`;
      

      const textoEducacion = educacion.innerHTML.replace(/<br\s*\/?>/gi, "\n");
      educacion.innerHTML = `<textarea id="input-educacion">${textoEducacion}</textarea>`;

      btnEditar.textContent = "Guardar";
      modoEdicion = true;
    } else {

      const nuevoNombre = document.getElementById("input-nombre").value;
      const nuevaLocacion = document.getElementById("input-locacion").value;
      const nuevaDescripcion = document.getElementById("input-descripcion").value;
      const nuevaBio = document.getElementById("input-bio").value;
      const nuevaEducacion = document.getElementById("input-educacion").value;

      nombre.textContent = nuevoNombre;
      locacion.textContent = nuevaLocacion;
      descripcion.textContent = nuevaDescripcion;
      bio.textContent = nuevaBio;


      educacion.innerHTML = nuevaEducacion.replace(/\n/g, "<br>");

      btnEditar.textContent = "Editar perfil";
      modoEdicion = false;
    }
  });
});