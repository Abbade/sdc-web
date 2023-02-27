import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { withSSRAuth } from "../../utils/withSSRAuth";
import ptbrLocale from "@fullcalendar/core/locales/pt";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FormDialog from "../../components/Dialogs/Dialog";
import CreateActionGroup, { ICreateActionGroup } from "../../components/Forms/action/CreateActionGroup";
import { DateSelectArg, EventSourceInput } from "@fullcalendar/core";
import { api } from "../../services/apiClient";

interface Task {
    id: number;
    id_user_create: number;
    title: string;
    desc: string;
    start: Date;
    end: Date;
}

export default function Tasks() {

  const [selectedDate, setSelectedDate] = useState<ICreateActionGroup>({
    allDay: false,
    start: new Date(),
    end: new Date(),
    desc: '',
    title: ''
  });
  const [tasks, setTasks] = useState<EventSourceInput> ([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const get = async () => {
      const itens = await api.get("/tasks?filterType=1");
      setTasks(itens.data.itens);
    }
    get();
  }, [])


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
        <CreateActionGroup form={selectedDate} onClose={onClose} fromAction={false} />
      </FormDialog>
      <FullCalendar
        events={tasks}
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
