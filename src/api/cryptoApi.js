// const options = {
//   method: "GET",
//   url: "https://coinranking1.p.rapidapi.com/exchanges",
//   headers: {
//     "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//     "X-RapidAPI-Key": "53f25bcdfdmsh6f872042d012798p160b94jsnc37a0a20cb0e",
//   },
// }

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MY_API = "53f25bcdfdmsh6f872042d012798p160b94jsnc37a0a20cb0e";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": MY_API,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count = 10) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptosDetail: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptosHistory: builder.query({
      query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptosDetailQuery, useGetCryptosHistoryQuery, useGetExchangesQuery } =
  cryptoApi;
