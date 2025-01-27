import { Chip } from "@heroui/react";
import { motion } from "framer-motion";
import React from "react";

interface HistoryProps {
  searchHistories: string[];
  setSearchQuery: (history: string) => void;
  setSearchHistories: (histories: string[]) => void;
}

export default function History({ searchHistories, setSearchQuery, setSearchHistories }: HistoryProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {searchHistories.map((history, index) => {
        const duration = index * 0.1 + 0.4;
        return (
          <motion.div
            layout
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration }}
          >
            <Chip
              as="button"
              key={history}
              onClick={() => setSearchQuery(history)}
              onClose={() => setSearchHistories(searchHistories.filter((currentHistory) => currentHistory !== history))}
              variant="flat"
            >
              {history}
            </Chip>
          </motion.div>
        );
      })}
    </div>
  );
}
