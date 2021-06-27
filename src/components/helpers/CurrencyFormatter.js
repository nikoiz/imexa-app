export default function formatCurrency(value) {

  let forrmatter = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value);

  return forrmatter;
}
