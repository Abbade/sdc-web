import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { withSSRAuth } from "../../utils/withSSRAuth";
import ptbrLocale from "@fullcalendar/core/locales/pt";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FormDialog from "../../components/Dialogs/Dialog";
import CreateActionGroup, { ICreateActionGroup } from "../../components/Forms/action/CreateActionGroup";
import { DateSelectArg } from "@fullcalendar/core";

export default function Tasks() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<ICreateActionGroup>({
    allDay: false,
    start: new Date(),
    end: new Date(),
    desc: '',
    title: ''
  });

  const onClose = (refresh: any) => {
    setOpenForm(false);
  }
  const openAddTask = (dateInfo : DateSelectArg) => {
    setSelectedDate({
      allDay: dateInfo.allDay,
      start: dateInfo.start,
      end: dateInfo.end,
      desc: '',
      title: ''
    });
    setOpenForm(true);
  }
  return (
    <>
      <FormDialog size={'xl'} onClose={onClose} open={openForm} title="Adicionar Tarefa">
        <CreateActionGroup form={selectedDate} onClose={onClose} />
      </FormDialog>
      <FullCalendar
        events={[
          {
            title: "testeaa",
            allDay: true,
            start: new Date(),
            end: new Date().setDate(new Date().getDate() + 3),
          },
        ]}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        selectable={true}
        select={openAddTask}
        initialView="dayGridMonth"
        locale={{
          code: "pt-br",
          buttonText: {
            day: "dia",
            month: "mês",
            next: "Próximo",
            week: "Semana",
            today: "Hoje",
            prev: "Anterior",
          },
          weekText: "Semana",
          allDayText: "Dia Todo",
        }}
        nowIndicator={true}
        height={"85vh"}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "timeGridWeek,timeGridDay, dayGridMonth", // user can switch between the two
        }}
      />
    </>
  );
}
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    permissions: ["nursery.list"],
  }
);
