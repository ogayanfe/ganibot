"use client";

import { use } from "react";
import { aiContext } from "@/providers/ai-context";

const useAIContext = () => use(aiContext);

export default useAIContext;
