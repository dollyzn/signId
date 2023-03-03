var usersJSON = JSON.parse(users);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var clear = document.getElementById("clear");

clear.addEventListener("click", (e) => {
  e.preventDefault();
  canvas.width = canvas.width;
});

canvas.width = document.body.clientWidth;
canvas.heigth = 250;

window.addEventListener("resize", function () {
  canvas.width = document.body.clientWidth;
});

const pen = {
  active: false,
  moving: false,
  pos: { x: 0, y: 0 },
  previousPos: null,
};

const draw = (line) => {
  ctx.beginPath();
  ctx.moveTo(line.previousPos.x, line.previousPos.y);
  ctx.lineTo(line.pos.x, line.pos.y);
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  pen.active = true;
});

canvas.addEventListener("mouseup", (e) => {
  pen.active = false;
  pen.previousPos = null;
});

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  pen.pos.x = e.clientX - rect.left;
  pen.pos.y = e.clientY - rect.top;
  pen.moving = true;
});

canvas.addEventListener("touchstart", (e) => {
  pen.active = true;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  pen.pos.x = touch.clientX - rect.left;
  pen.pos.y = touch.clientY - rect.top;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  pen.pos.x = touch.clientX - rect.left;
  pen.pos.y = touch.clientY - rect.top;
  pen.moving = true;
});

canvas.addEventListener("touchend", (e) => {
  pen.active = false;
  pen.previousPos = null;
});

const animate = () => {
  if (pen.active && pen.moving && pen.previousPos) {
    draw({ pos: pen.pos, previousPos: pen.previousPos });
    pen.moving = false;
  }
  if (pen.active) {
    pen.previousPos = { x: pen.pos.x, y: pen.pos.y };
  }

  let base64 = canvas.toDataURL();
  document.getElementById("signature").value = base64;

  requestAnimationFrame(animate);
};

animate();

function populateSelect(data) {
  var select = document.getElementById("options");

  for (var i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    option.value = data[i].name;
    option.text = data[i].name;
    select.add(option);
  }
}

populateSelect(usersJSON);

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    var control = document.getElementById("ortctrl");

    var image = document.getElementById("rotateimg");
    control.style.display = "none";
    image.style.display = "block";
  } else {
    var control = document.getElementById("ortctrl");
    var image = document.getElementById("rotateimg");
    control.style.display = "block";
    image.style.display = "none";
  }
}

window.addEventListener("orientationchange", checkOrientation, false);
window.addEventListener("resize", checkOrientation, false);

$(document).ready(function () {
  checkOrientation();
  $(
    "#container4, #container3, #container2, #container1, #modalBuscar"
  ).addClass("hide");

  $("#entrega").click(function () {
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container1").removeClass("hide");
    $("#container").addClass("hide");
  });

  $(".xwork").on("keyup", function (e) {
    if (e.which === 13) {
      $(
        "#container4, #container3, #container2, #container1, #modalBuscar"
      ).addClass("hide");
      $("#container2").removeClass("hide");

      let date = new Date();
      date.setHours(date.getHours() - 3);
      $(".data").val(date.toISOString().substring(0, 16));
    }
  });

  $("#rgt1").click(function () {
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container2").removeClass("hide");

    let date = new Date();
    date.setHours(date.getHours() - 3);
    $(".data").val(date.toISOString().substring(0, 16));
  });

  $("#rgt2").click(function () {
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container3").removeClass("hide");
  });

  $("#rgt3").click(function () {
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container4").removeClass("hide");
  });

  $("#lft1").click(function () {
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container").removeClass("hide");
  });

  $("#lft2").click(function () {
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container1").removeClass("hide");
  });

  $("#lft3").click(function () {
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container2").removeClass("hide");
  });

  $("#cancel").click(function (e) {
    e.preventDefault();
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container3").removeClass("hide");
  });
});

$("#deliveredForm").on("submit", function (event) {
  event.preventDefault();
  const inputs = $(this).find("[jsrequired]");
  let valid = true;
  let names = "";
  inputs.each(function () {
    if ($(this).val().trim() === "") {
      if ($(this).attr("data-nome") != undefined) {
        console.log($(this).attr("data-nome"));
        names += `${$(this).attr("data-nome")}, `;
      }
      valid = false;
    }
  });
  if (valid) {
    event.preventDefault;
    enviarFormulario();
  } else {
    console.log("ue");
    names = names.replace(/,\s*$/, "");
    Toastify({
      text: `Preencha todos os campos necessários.\n(${names})`,
      duration: 2000,
      style: {
        background: "#ac1e1e",
      },
    }).showToast();
  }
});

function enviarFormulario() {
  var formDados = $("#deliveredForm").serialize();
  $.ajax({
    url: "./php/submit.php",
    type: "POST",
    data: formDados,
    success: function (resposta) {
      let resJSON = JSON.parse(resposta);
      switch (resJSON.status) {
        case true:
          Toastify({
            text: resJSON.message,
            duration: 2000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();

          $("#container4").addClass("hide");
          $("#container").removeClass("hide");

          break;
        case false:
          Toastify({
            text: resJSON.message,
            duration: 2000,
            style: {
              background: "#ac1e1e",
            },
          }).showToast();
          break;
      }

      console.log(resJSON);
    },
    error: function (erro) {
      console.error(erro);
    },
  });
}

$("#busca").on("click", function () {
  $("#container").addClass("hide");
  $("#modalBuscar").removeClass("hide");
});

$("#btnCancelar").on("click", function () {
  $("#modalBuscar").addClass("hide");
  $("#container").removeClass("hide");
  $(".tableSearch tbody").empty();
  $("#searchInput").val("");
});

$("#searchInput").on("keyup", function (e) {
  if (e.which === 13) {
    e.preventDefault();
    $(".tableSearch tbody").empty();
    const searchTerm = $("#searchInput").val().trim();

    var dados = `xworkId=${searchTerm}`;

    $.ajax({
      url: "./php/search.php",
      type: "POST",
      data: dados,
      success: function (resposta) {
        let resJSON = JSON.parse(resposta);
        if (resJSON.length === 0) {
          Toastify({
            text: "Nenhum resultado encontrado",
            duration: 2000,
            style: {
              background: "#3250a8",
            },
          }).showToast();
        } else {
          const tbody = $(".tableSearch tbody");
          $.each(resJSON, function (index, item) {
            let data = new Date(item.date + " UTC");

            let day = data.getDate().toString().padStart(2, "0");
            let month = (data.getMonth() + 1).toString().padStart(2, "0");
            let year = data.getFullYear();
            let hour = data.getHours().toString().padStart(2, "0");
            let minute = data.getMinutes().toString().padStart(2, "0");

            let formatedDate = `${day}/${month}/${year} às ${hour}:${minute}`;

            const row = $("<tr>");
            $("<td>").text(item.unit).appendTo(row);
            $("<td>").text(item.xworkId).appendTo(row);
            $("<td>").text(item.atendant).appendTo(row);
            $("<td>").text(formatedDate).appendTo(row);
            $("<td>")
              .html(
                `<div data-href="${item.signature}" class="image-link" id="searchSignature" data-type="image/png">Visualizar</div>`
              )
              .appendTo(row);
            row.appendTo(tbody);
          });
        }
      },
      error: function (erro) {
        console.error(erro);
      },
    });
  }
});

$("#btnProcurar").on("click", function (e) {
  e.preventDefault();
  $(".tableSearch tbody").empty();
  const searchTerm = $("#searchInput").val().trim();

  var dados = `xworkId=${searchTerm}`;

  $.ajax({
    url: "./php/search.php",
    type: "POST",
    data: dados,
    success: function (resposta) {
      let resJSON = JSON.parse(resposta);
      if (resJSON.length === 0) {
        Toastify({
          text: "Nenhum resultado encontrado",
          duration: 2000,
          style: {
            background: "#3250a8",
          },
        }).showToast();
      } else {
        const tbody = $(".tableSearch tbody");
        $.each(resJSON, function (index, item) {
          let data = new Date(item.date + " UTC");

          let day = data.getDate().toString().padStart(2, "0");
          let month = (data.getMonth() + 1).toString().padStart(2, "0");
          let year = data.getFullYear();
          let hour = data.getHours().toString().padStart(2, "0");
          let minute = data.getMinutes().toString().padStart(2, "0");

          let formatedDate = `${day}/${month}/${year} às ${hour}:${minute}`;

          const row = $("<tr>");
          $("<td>").text(item.unit).appendTo(row);
          $("<td>").text(item.xworkId).appendTo(row);
          $("<td>").text(item.atendant).appendTo(row);
          $("<td>").text(formatedDate).appendTo(row);
          $("<td>")
            .html(
              `<div data-href="${item.signature}" class="image-link" id="searchSignature" data-type="image/png">Visualizar</div>`
            )
            .appendTo(row);
          row.appendTo(tbody);
        });
      }
    },
    error: function (erro) {
      console.error(erro);
    },
  });
});

$(".tableSearch").on("click", ".image-link", function (e) {
  e.preventDefault();

  const windowOptions = "height=300,width=1000,top=100,left=100";
  const base64image = $(this).data("href");

  const newWindow = window.open("", "_blank", windowOptions);
  newWindow.document.write(`<img src="${base64image}"/>`);
});
