import { Dispatch, SetStateAction } from "react";
import { Chip } from "@nextui-org/react";
import { motion } from "framer-motion";

interface SearchHistoryProps {
  histories: string[];
  setHistories: Dispatch<SetStateAction<string[]>>;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

export default function SearchHistory({ histories, setHistories, setSearchInput }: SearchHistoryProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {histories.map((history, index) => {
        const duration = index * 0.1 + 0.4;
        return (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.7 }}
            exit={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration }}
          >
            <Chip
              as="button"
              className="transition hover:bg-foreground-200"
              onClick={() => setSearchInput(history)}
              onClose={() => setHistories(histories.filter((currentHistory) => currentHistory !== history))}
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
