import React, { useEffect, useState, useRef } from "react";
import { formatCurrency, formatQuantity } from "../helpers/Formatter";
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { AlertDialog } from "../ui/AlertDialog";
import { apiAbono, apiFacturaVenta } from "../../axios/axiosHelper";
import { getCurrentDateUS } from "../helpers/Formatter";
import { handlePagarFacturaVenta } from "../facturas-venta/FacturaVentaDashBoard";

export const AbonoAlertDialog = (props) => {
  const [valorAbono, setValorAbono] = useState("");
  const [valorFactura, setValorFactura] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const inputValorAbono = useRef(0);

  const handleChangeValor = (e) => {
    setValorAbono(e.target.value);
  };

  useEffect(() => {
    if (props.show) {
      apiFacturaVenta.get(`/?id_venta=${props.idFactura}`).then((res) => {
        setValorFactura(res.data.Factura[0].valor_venta);
      });
    } else {
      setValorFactura("");
      setValorAbono("");
    }
  }, [props.show]);

  useEffect(() => {
    if (parseInt(valorAbono) > parseInt(valorFactura)) {
      setModalShow(true);
      setAlertHeader("Abono");
      setAlertTitle("Cantidad excede al valor pendiente");
      setAlertBody(
        `Por favor ingrese una cantidad no superior a ${formatCurrency(
          valorFactura
        )}`
      );
      setAlertButton("Volver a intentarlo");
      inputValorAbono.current.value = "";
    }
  }, [valorFactura, valorAbono]);

  const abonoVenta = {
    id_venta: props.idFactura,
    valor_abono: valorAbono,
  };

  const addAbono = () => {
    let fechaAbono = getCurrentDateUS();
    abonoVenta.fecha_abono = fechaAbono;

    if (valorAbono === valorFactura) {
      apiFacturaVenta
        .put(`?id_venta=${props.idFactura}`, { estado: "Pagado" })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiAbono
        .post("/", abonoVenta)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <AlertDialog
        show={modalShow}
        onHide={() => setModalShow(false)}
        header={alertHeader}
        title={alertTitle}
        body={alertBody}
        button={alertButton}
      />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Abono</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Row>
            <InputGroup size="lg">
              <InputGroup.Text id="inputGroup-sizing-lg">
                Ingrese valor de abono
              </InputGroup.Text>
              <FormControl
                aria-label="Large"
                aria-describedby="inputGroup-sizing-lg"
                placeholder="Valor Abono"
                type="number"
                ref={inputValorAbono}
                onChange={handleChangeValor}
                min="0"
              />
            </InputGroup>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Row style={{ width: "100%", textAlign: "center" }}>
          {/* <Button onClick={props.onHide}>Abonar</Button> */}
          <Button
            onClick={() => {
              addAbono();
              props.onHide()
            }}
          >
            Abonar
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};
