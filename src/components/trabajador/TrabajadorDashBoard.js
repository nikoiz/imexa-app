import React, { useEffect } from "react";
import { SideBarImexa } from "../menu/SideBarImexa";
import moment from "moment";
import { Button, Table } from "react-bootstrap";
import "../../css/calendar.css";
import { useState } from "react";
import buildCalendar from "../calendar/BuildCalendar";
import { Header } from "../calendar/Header";
import { ListaTrabajador } from "./ListaTrabajador";

export const TrabajadorDashBoard = () => {
  moment.locale("es", {
    months:
      "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
        "_"
      ),
    monthsShort:
      "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
    weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
  });

  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);

  const dayShort = moment.weekdays();

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);


  const handleTest = (e) => {
    console.log(value.format('DD/MM/YYYY'));
  } 

  return (
    <>
      <div className="container-content">

        <Header value={ value } setValue={setValue} />

        <Table
          striped
          responsive
          bordered
          variant="dark"
          className="tb-product"
        >
          <thead>
            <tr>
              {dayShort.map((day, i) => (
                <th key={i} className="week-day">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {calendar.map((week, i) => (
              <tr key={i} className="weeks-calendar">
                {week.map((day, h) => (
                  <td
                    key={h}
                    onClick={() => setValue(day)}
                    className="days-calendar"
                    className={
                      value.isSame(day, "day") ? "selected" : "days-calendar"
                    }
                  >
                    {day.format("D").toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        
        <ListaTrabajador/>
        
        <Button onClick={handleTest}>Click</Button>
      </div>
    </>
  );
};
