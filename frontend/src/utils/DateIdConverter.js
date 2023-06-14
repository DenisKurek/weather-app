export default function DateIdConverter(date) {
  console.log("before ", date);
  const newDate = date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");
  console.log("after ", newDate);
  console.log(newDate[2] + newDate[1] + newDate[0] + "test");
  return newDate[2] + newDate[1] + newDate[0] + "";
}
