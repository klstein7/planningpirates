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

const getModes = (arr: number[]): number[] => {
  const numMapping: { [key: number]: number } = {};
  const modes: number[] = [];

  arr.forEach((num) => {
    numMapping[num] = (numMapping[num] || 0) + 1;
  });

  for (const num in numMapping) {
    if (numMapping[num] > 1) {
      modes.push(Number(num));
    }
  }

  return modes;
};

export function getAlignmentPercentage(
  selectedValues: number[]
): number | null {
  if (!selectedValues || selectedValues.length === 0) {
    return null;
  }

  const modes = getModes(selectedValues);

  if (modes.length === 0) {
    return 0;
  }

  const tolerance = 1;
  const alignedValuesCount = selectedValues.filter((value) =>
    modes.some((mode) => Math.abs(value - mode) <= tolerance)
  ).length;

  const totalValues = selectedValues.length;
  const percentage = (alignedValuesCount / totalValues) * 100;

  return percentage % 1 === 0 ? percentage : parseFloat(percentage.toFixed(2));
}
