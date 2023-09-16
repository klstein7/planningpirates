import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAverage(selectedValues: number[]) {
  if (selectedValues.length === 0) {
    return null;
  }

  const sum = selectedValues.reduce((a, b) => a + b, 0);
  const average = sum / selectedValues.length;

  return parseFloat(average.toFixed(1));
}

export function getMedian(selectedValues: number[]) {
  if (!selectedValues || selectedValues.length === 0) {
    return null;
  }

  const sortedSelectedValues = [...selectedValues].sort((a, b) => a - b);
  const n = sortedSelectedValues.length;
  let median;

  if (n % 2 === 1) {
    median = sortedSelectedValues[Math.floor(n / 2)];
  } else {
    const middle1 = sortedSelectedValues[Math.floor(n / 2) - 1];
    const middle2 = sortedSelectedValues[Math.floor(n / 2)];
    median = (middle1 + middle2) / 2;
  }

  return isNaN(median) ? null : parseFloat(median.toFixed(1));
}

export function getAlignmentPercentage(selectedValues: number[]) {
  const medianSelectedValue = getMedian(selectedValues);
  if (!selectedValues || selectedValues.length === 0) {
    return null;
  }

  if (medianSelectedValue === null) {
    return 0;
  }

  const tolerance = 1;
  const alignedValuesCount = selectedValues.filter(
    (value) => Math.abs(value - medianSelectedValue) <= tolerance
  ).length;
  const totalValues = selectedValues.length;
  const percentage = (alignedValuesCount / totalValues) * 100;

  return percentage % 1 === 0 ? percentage : parseFloat(percentage.toFixed(2));
}
