interface BookingSlotProps {
  time: string;
  booked: boolean;
}

export default function BookingSlot({ time, booked }: BookingSlotProps) {
  return (
    <li
      aria-disabled={booked}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity: booked ? 0.5 : 1,
      }}
    >
      <span>{time}</span>
      <span style={{ fontSize: 12 }}>{booked ? "Booked" : "Available"}</span>
    </li>
  );
}
