import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import axiosInstance from "../axiosInstance";
import { SortNumbersRequest, SortNumbersResponse } from "./types";

export const useSortNumbers = () => {
  return useMutation({
    mutationFn: async (sortRequest: SortNumbersRequest): Promise<SortNumbersResponse> => {
      const response = await axiosInstance.post<SortNumbersResponse>(`${ BASE_URL }/SortNumbers`, sortRequest);
      return response.data;
    },
  });
};
