export function formatCurrency(value) {
  let forrmatter = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value);

  return forrmatter;
}

export function formatDate(date) {
  let splitDateTime = date.split(" ");

  // Ordenamiento Fecha para Chile
  let splitDate = splitDateTime[0].split("-");
  let year = splitDate[0];
  let day = splitDate[1];
  let month = splitDate[2];

  let setDate = day + "-" + month + "-" + year;

  return setDate;
}

export function formatDateUS(date) {
  let splitDateTime = date.split(" ");

  // Ordenamiento Fecha para Chile
  let splitDate = splitDateTime[0].split("-");
  let year = splitDate[0];
  let day = splitDate[2];
  let month = splitDate[1];

  let setDate = day + "-" + month + "-" + year;

  return setDate;
}

export function formatQuantity(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const blockNegatives = (e) =>
  ["+", "-"].includes(e.key) && e.preventDefault();

export function getCurrentDateUS() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  return (today = yyyy + "-" + mm + "-" + dd);
}

export function isNumber(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
