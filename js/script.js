var usersJSON = JSON.parse(users);
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");

const signaturePad = new SignaturePad(canvas);

canvas.width = $("body").width() - 10;
canvas.height = 180;

$("#clear").on("click", function (e) {
  e.preventDefault();
  signaturePad.clear();
});

function populateSelect(data) {
  var select = $("#options");

  for (var i = 0; i < data.length; i++) {
    var option = $("<option>");
    option.val(data[i].name);
    option.text(data[i].name);
    select.append(option);
  }
}
populateSelect(usersJSON);

let toastShown = false;

function checkOrientation() {
  if (
    screen.orientation.type.startsWith("portrait") ||
    window.innerHeight > window.innerWidth
  ) {
    $("#ortctrl").hide();
    $("#rotateimg").show();
  } else {
    $("#ortctrl").show();
    $("#rotateimg").hide();
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        $("#submitcanva").prop("disabled", true);
        $("#entrega").prop("disabled", true);

        if (!toastShown) {
          Toastify({
            text: "Habilite a tela cheia! Clique aqui",
            duration: 5000,
            position: "center",
            avatar: "images/icons/info.svg",
            style: {
              color: "#000",
              background: "linear-gradient(to right, #FFC107, #FFEB3B)",
            },
            onClick: function () {
              fullscreen();
            },
          }).showToast();
        }
        toastShown = true;
        setTimeout(() => {
          toastShown = false;
        }, 5000);
      }
    } else {
      $("#submitcanva").prop("disabled", false);
      $("#entrega").prop("disabled", false);
      screen.orientation
        .lock("landscape")
        .then(() => {
          console.log("Orientação travada em paisagem");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}

$(window).on("orientationchange resize", function () {
  checkOrientation();
});

$(window).on("resize", function () {
  canvas.width = $("body").width();
});

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
      $(".data").val(moment(date).format("YYYY-MM-DDTHH:mm"));
    }
  });

  $("#rgt1").click(function () {
    $(
      "#container4, #container3, #container2, #container1, #modalBuscar"
    ).addClass("hide");
    $("#container2").removeClass("hide");

    let date = new Date();
    $(".data").val(moment(date).format("YYYY-MM-DDTHH:mm"));
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

  $(".tecbutton").click(function () {
    const value = $(this).text();
    $("#searchInput").val($("#searchInput").val() + value);
    $("#searchInput").trigger("input");
  });

  $("#backspace").click(function () {
    const value = $("#searchInput").val();
    $("#searchInput").val(value.substring(0, value.length - 1));
    $("#searchInput").trigger("input");
  });

  $(".xwrkbtn").on("click", function (e) {
    e.preventDefault();
    const num = $(this).text();
    const currentVal = $(".xwork").val();
    $(".xwork").val(currentVal + num);
  });

  $("#backspacexwrk").on("click", function (e) {
    e.preventDefault();
    const currentVal = $(".xwork").val();
    $(".xwork").val(currentVal.slice(0, -1));
  });

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $("#searchInput").prop("readonly", true);
    $(".xwork").prop("readonly", true);
  } else {
    $("#searchInput").prop("readonly", false);
    $(".xwork").prop("readonly", false);
  }
});

$("#deliveredForm").on("submit", function (event) {
  event.preventDefault();

  let base64 = signaturePad.toDataURL();
  $("#signature").val(base64);

  const inputs = $(this).find("[jsrequired]");
  let valid = true;
  let names = "";

  inputs.each(function () {
    if ($(this).val().trim() === "") {
      if ($(this).attr("data-nome") != undefined) {
        names += `${$(this).attr("data-nome")}, `;
      }
      valid = false;
    }
  });
  if (valid) {
    $("#submitcanva").prop("disabled", true);
    enviarFormulario();
  } else {
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
          $("#deliveredForm")[0].reset();
          $("#signature").val("");
          signaturePad.clear();
          $("#submitcanva").prop("disabled", false);
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
    },
    error: function (erro) {
      console.error(erro);
    },
  });
}

$("#busca").on("click", function () {
  const message = $(".tableSearch-message");
  message.hide();
  $("#container").addClass("hide");
  $("#modalBuscar").removeClass("hide");

  $(".tableSearch .tbody").html(
    "<tr class='tableSearchSkeleton'><td></td><td></td><td></td><td></td><td></td></tr><tr class='tableSearchSkeleton'><td></td><td></td><td></td><td></td><td></td></tr><tr class='tableSearchSkeleton'><td></td><td></td><td></td><td></td><td></td></tr>"
  );

  setTimeout(function () {
    $.ajax({
      url: "./php/search_latest.php",
      type: "POST",
      success: function (resposta) {
        let resJSON = JSON.parse(resposta);
        if (resJSON.length === 0) {
          $(".tableSearchSkeleton").remove();
          message.show();
        } else {
          message.hide();
          $(".tableSearchSkeleton").remove();
          const tbody = $(".tableSearch .tbody");

          $.each(resJSON, function (index, item) {
            let formatedDate = moment(item.date).format(
              "DD/MM/YYYY [às] HH:mm"
            );

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
  }, 1000);
});

$("#btnCancelar").on("click", function () {
  $("#modalBuscar").addClass("hide");
  $("#container").removeClass("hide");
  $(".tableSearch tbody").empty();
  $("#searchInput").val("");
});

$("#searchInput").on("keyup", function (e) {
  const message = $(".tableSearch-message");
  message.hide();
  if (e.which === 13) {
    e.preventDefault();

    const searchTerm = $("#searchInput").val().trim();

    var dados = `xworkId=${searchTerm}`;

    $(".tableSearch .tbody").html(
      "<tr class='tableSearchSkeleton'><td></td><td></td><td></td><td></td><td></td></tr>"
    );

    setTimeout(function () {
      $(".tableSearchSkeleton").remove();
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
            message.show();
          } else {
            message.hide();
            const tbody = $(".tableSearch .tbody");
            tbody.empty();
            $.each(resJSON, function (index, item) {
              let formatedDate = moment(item.date).format(
                "DD/MM/YYYY [às] HH:mm"
              );

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
    }, 1000);
  }
});

$("#btnProcurar").on("click", function (e) {
  const message = $(".tableSearch-message");
  message.hide();
  e.preventDefault();

  const searchTerm = $("#searchInput").val().trim();

  var dados = `xworkId=${searchTerm}`;

  $(".tableSearch .tbody").html(
    "<tr class='tableSearchSkeleton'><td></td><td></td><td></td><td></td><td></td></tr>"
  );

  setTimeout(function () {
    $(".tableSearchSkeleton").remove();
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
          message.show();
        } else {
          message.hide();
          const tbody = $(".tableSearch .tbody");
          tbody.empty();
          $.each(resJSON, function (index, item) {
            let formatedDate = moment(item.date).format(
              "DD/MM/YYYY [às] HH:mm"
            );

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
  }, 1000);
});

let timer;
$("#searchInput").on("input", function (e) {
  const message = $(".tableSearch-message");
  message.hide();
  e.preventDefault();

  $(".tableSearch .tbody").html(
    "<tr class='tableSearchSkeleton'><td></td><td></td><td></td><td></td><td></td></tr>"
  );

  clearTimeout(timer);
  timer = setTimeout(
    function () {
      $(".tableSearchSkeleton").remove();
      const searchTerm = $(this).val().trim();

      var dados = `xworkId=${searchTerm}`;

      $.ajax({
        url: "./php/search.php",
        type: "POST",
        data: dados,
        success: function (resposta) {
          let resJSON = JSON.parse(resposta);

          const tbody = $(".tableSearch .tbody");
          tbody.empty();
          if (resJSON.length === 0) {
            Toastify({
              text: "Nenhum resultado encontrado",
              duration: 2000,
              style: {
                background: "#3250a8",
              },
            }).showToast();
            message.show();
          } else {
            message.hide();
            $.each(resJSON, function (index, item) {
              let formatedDate = moment(item.date).format(
                "DD/MM/YYYY [às] HH:mm"
              );

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
          $(".tableSearch tbody").html(
            "<tr><td colspan='5'>Erro ao carregar resultados.</td></tr>"
          );
        },
      });
    }.bind(this),
    1000
  );
});

$(".fullscreenbtn").on("click", function (e) {
  fullscreen();
});

function fullscreen() {
  var elem = document.documentElement;
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    $(".full").hide();
    $(".exitfull").show();

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      $("#submitcanva").prop("disabled", false);
      $("#entrega").prop("disabled", false);
    }

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  } else {
    $(".full").show();
    $(".exitfull").hide();

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      $("#submitcanva").prop("disabled", true);
      $("#entrega").prop("disabled", true);
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

$(".tableSearch").on("click", ".image-link", function (e) {
  e.preventDefault();

  const base64image = $(this).data("href");

  $("#modal-content").attr("src", base64image);

  $("#image-modal").css("display", "flex");
});

$("#image-modal").on("click", function (e) {
  if (e.target === this) {
    $("#image-modal").hide();
    $("#modal-content").attr("src", "");
  }
});

$(document).on("keydown keypress", function (event) {
  if (event.keyCode === 9) {
    event.preventDefault();
    $(".data").blur();
  }
});

$(".data").click(function (e) {
  e.preventDefault();
});

$(".data").on("focus", function (event) {
  $(this).blur();
});
