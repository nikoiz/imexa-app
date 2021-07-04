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

export function formatQuantity(number) {
 
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
