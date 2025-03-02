// src/utils/payroll.ts
export const calculateSalary = (baseHours: number, extraHours: number, pricePerHour: number) => {
  const baseSalary = baseHours * pricePerHour;
  const extraSalary = extraHours * pricePerHour * 1.35;
  const totalSalary = baseSalary + extraSalary;
  return { baseSalary, extraSalary, totalSalary };
};