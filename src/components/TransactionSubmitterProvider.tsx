"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface TransactionSubmitterContextState {
  useCustomSubmitter: boolean;
  setUseCustomSubmitter(useCustomSubmitter: boolean): void;
}

export const TransactionSubmitterContext = createContext<TransactionSubmitterContextState>(
  {} as TransactionSubmitterContextState,
);

export function useTransactionSubmitter(): TransactionSubmitterContextState {
  return useContext(TransactionSubmitterContext);
}

export const TransactionSubmitterProvider = ({ children }: { children: ReactNode }) => {
  const [useCustomSubmitter, setUseCustomSubmitter] = useState(false);

  return (
    <TransactionSubmitterContext.Provider value={{ useCustomSubmitter, setUseCustomSubmitter }}>
      {children}
    </TransactionSubmitterContext.Provider>
  );
};
