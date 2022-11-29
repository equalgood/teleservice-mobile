import React, { FC, useState } from "react";
import styles from "./index.module.css";
import PreviousPageButton from "../../../../shared/ui/buttons/PreviousPageButton";
import SendButton from "../../../../shared/ui/buttons/SendButton";
import SupportIcon from "../../../../shared/assets/icons/nav-icons/SupportIcon";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TicketsActionTypes } from "../../../../types/tickets";
import { ITicket } from "../../../../types";
import SingleTicket from "../../ui/SingleTicket";

const TicketDescription: FC = () => {
  const dispatch = useDispatch();
  const location: string = useLocation().pathname;
  const topic: string = location.split("/").slice(-1)[0];

  const ticketsObj: any = useTypedSelector((state) => state.ticketReducer);
  const count: number = ticketsObj.count;
  const tickets: ITicket[] = ticketsObj.tickets;

  const [message, setMessage] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: TicketsActionTypes.ADD_TICKET,
      payload: { topic, message, num: count + 1 },
    });
    setMessage("");
  };

  return (
    <div className={styles["ticket-description"]}>
      <div className={styles["ticket-description__header"]}>
        <PreviousPageButton to="/tickets" />
        <h2>Tickets</h2>
        <p>Ticket #{count + 1}</p>
      </div>
      <div className={styles["ticket-description__chat"]}>
        <div className={styles["ticket-description__bot-notification"]}>
          <SupportIcon className={styles.icon} />
          <div
            className={styles["ticket-description__bot-notification_message"]}
          >
            <h3>Bot Name</h3>
            <p>
              Hi User Name, we're here to help you. How can I help you today?
            </p>
            <a>My Device</a>
            <a>My Contract</a>
            <a>Return Device</a>
          </div>
        </div>
        {tickets.map((ticket) => (
          <SingleTicket ticket={ticket} />
        ))}
      </div>
      <form
        onSubmit={submitHandler}
        className={styles["ticket-description__form"]}
      >
        <input
          value={message}
          onChange={changeHandler}
          type={"text"}
          placeholder="Tap an option or type a message"
        />
        <SendButton />
      </form>
    </div>
  );
};

export default TicketDescription;
