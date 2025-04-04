/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL =
  "https://o79r57u9kf.execute-api.us-east-1.amazonaws.com/elev8ai";

const username = "userelev8ai123";
const password = "userElev8@ai123";
const encodedCredentials = btoa(`${username}:${password}`);

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Basic ${encodedCredentials}`,
  },
});

const requestMultipart = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// https://o79r57u9kf.execute-api.us-east-1.amazonaws.com/elev8ai/get-candidates
export const queryKeys = {
  SUMMARY: "summary",
  CANDIDATES_LIST: "candidates-list",
  CHAT_HISTORY: "chat-history",
};

export const useCandidatesList = () => {
  return useQuery({
    queryKey: [queryKeys.CANDIDATES_LIST],
    queryFn: async () => {
      const response = await request.get("/get-candidates");
      return response.data as { emails: string[] };
    },
  });
};
export interface CompetencyDetail {
  description: string;
  match_percentage: number;
  reasoning: string;
}

export interface AreaMatches {
  [area: string]: number;
}

export interface CategoryMatches {
  [category: string]: number;
}

export interface AreaOfImprovement {
  competency: string;
  match_percentage: number;
  feedback: string;
}

export interface CandidateEvaluation {
  summary: string;
  competency_matches: {
    [competency: string]: CompetencyDetail;
  };
  area_matches: AreaMatches;
  category_matches: CategoryMatches;
  final_match: number;
  areas_of_improvement: AreaOfImprovement[];
}

export const useCandidateSummary = (email?: string) => {
  return useQuery({
    queryKey: [queryKeys.SUMMARY, email],
    queryFn: async () => {
      if (!email) return;

      const response = await request.get(`/candidate-summary?email=${email}`);
      return response.data as { email: string; summary_json: string };
    },
    select(data) {
      if (data?.summary_json) {
        const parsedSummary = JSON.parse(data?.summary_json);
        console.log("🚀 ~ select ~ parsedSummary:", parsedSummary);
        return parsedSummary as CandidateEvaluation;
      }
    },
    refetchInterval(query) {
      if (query.state.data?.summary_json) {
        return false;
      } else {
        return 5000;
      }
    },
  });
};

export const useCandidateChatHistory = (email: string) => {
  return useQuery({
    queryKey: [queryKeys.CHAT_HISTORY, email],
    queryFn: async () => {
      const response = await request.get(`/chat-history?email=${email}`);
      return response.data;
    },
  });
};

//  ---------------------------Mutations---------------------------------

export const useUploadCandidateDetails = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await requestMultipart.post("/upload", formData);
      return response.data;
    },
  });
};

export type QueryObj = {
  queryString: string;
  email: string;
};

export const usePostChatQuery = () => {
  return useMutation({
    mutationFn: async (queryObj: QueryObj) => {
      const response = await request.post("/chat", queryObj);
      return response.data;
    },
  });
};
