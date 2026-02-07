export const formatMonthLabel = (value: string) => {
  const [year, month] = value.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleString("en-US", {
    month: "short",
    year: "2-digit",
  });
};
