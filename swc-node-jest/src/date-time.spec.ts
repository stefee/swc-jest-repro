import { parseDate, parseDateRange } from "./date-time";

describe("parseDate", () => {
  it("returns parsed", () => {
    const result = parseDate("2022-03-01");
    expect(result?.day).toBe(1);
    expect(result?.month).toBe(3);
    expect(result?.year).toBe(2022);
  });

  it("returns null if not valid", () => {
    const result = parseDate("not-valid");
    expect(result).toBeNull();
  });
});

describe("parseDateRange", () => {
  it("returns parsed dates", () => {
    const start = "2022-01-01";
    const end = "2023-01-01";
    const result = parseDateRange(start, end);
    expect(result[0]?.toString()).toBe(start);
    expect(result[1]?.toString()).toBe(end);
  });

  it("returns null if start date is not valid", () => {
    const start = "not-valid";
    const end = "2022-02-01";
    const result = parseDateRange(start, end);
    expect(result[0]).toBeNull();
    expect(result[1]?.toString()).toBe(end);
  });

  it("returns null if end date is not valid", () => {
    const start = "2022-01-01";
    const end = "not-valid";
    const result = parseDateRange(start, end);
    expect(result[0]?.toString()).toBe(start);
    expect(result[1]).toBeNull();
  });

  it("returns null if start and end date are the same", () => {
    const start = "2022-01-01";
    const end = "2022-01-01";
    const result = parseDateRange(start, end);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
  });

  it("returns null if end date comes before start date", () => {
    const start = "2023-01-01";
    const end = "2022-01-01";
    const result = parseDateRange(start, end);
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
  });

  it("returns null if difference is less than the minimum", () => {
    const start = "2022-01-01";
    const end = "2022-01-03"; // Note: 2 days after start
    const min = { days: 3 };
    const result = parseDateRange(start, end, { min });
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
  });

  it("returns null if difference is greater than the maximum", () => {
    const start = "2022-01-01";
    const end = "2022-01-03"; // Note: 2 days after start
    const max = { days: 1 };
    const result = parseDateRange(start, end, { max });
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
  });

  it("returns parsed dates if difference is equal to the minimum", () => {
    const start = "2022-01-01";
    const end = "2022-01-03"; // Note: 2 days after start
    const min = { days: 2 };
    const result = parseDateRange(start, end, { min });
    expect(result[0]?.toString()).toBe(start);
    expect(result[1]?.toString()).toBe(end);
  });

  it("returns parsed dates if difference is equal to the maximum", () => {
    const start = "2022-01-01";
    const end = "2022-01-03"; // Note: 2 days after start
    const max = { days: 2 };
    const result = parseDateRange(start, end, { max });
    expect(result[0]?.toString()).toBe(start);
    expect(result[1]?.toString()).toBe(end);
  });
});
