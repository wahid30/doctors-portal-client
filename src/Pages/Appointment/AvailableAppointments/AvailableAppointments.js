import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";
import { useQuery } from "@tanstack/react-query";

const AvailableAppointments = ({ selectedDate }) => {
  // const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);

  // const { data: appointmentOptions = [] } = useQuery({
  //   // use isLoading or use appointmentOptions=[]
  //   queryKey: ["appointmentOption"],
  //   queryFn: () =>
  //     fetch("http://localhost:5000/appointmentOption").then((res) =>
  //       res.json()
  //     ),
  // });

  const {} = useQuery({
    queryKey: ["appointmentOption"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/appointmentOption");
      const data = await res.json();
      return data;
    },
  });

  // useEffect(() => {
  //   fetch("http://localhost:5000/appointmentOption")
  //     .then((res) => res.json())
  //     .then((data) => setAppointmentOptions(data));
  // });

  return (
    <section className="mt-16">
      <p className="text-center text-secondary font-bold">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {appointmentOptions.map((option) => (
          <AppointmentOption
            setTreatment={setTreatment}
            key={option._id}
            appointmentOption={option}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          selectedDate={selectedDate}
          setTreatment={setTreatment}
          treatment={treatment}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointments;
