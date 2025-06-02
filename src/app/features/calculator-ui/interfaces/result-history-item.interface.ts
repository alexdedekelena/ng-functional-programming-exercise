export interface ResultHistoryItem {
  expression: string,
  value?: number,
  success: boolean
  rest?: any[],
  reason?: string;
}
