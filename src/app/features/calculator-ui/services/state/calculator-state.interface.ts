import { ResultHistoryItem } from "../../interfaces/result-history-item.interface";

export interface CalculatorState {
    expression: string,
    isExpressionValid: boolean,
    history: ResultHistoryItem[],
    errorMessage: string,
    successMessage: string
}