import { StreamStatus } from "../types";

export * from "./ids";

export const AIRDROP_AMOUNT = 1; // 1 SOL is the cap on the testnet

export const TX_FINALITY_CONFIRMED = "confirmed";
export const TX_FINALITY_FINALIZED = "finalized";

export const INSTRUCTION_CREATE_STREAM = 0;
export const INSTRUCTION_WITHDRAW_STREAM = 1;
export const INSTRUCTION_CANCEL_STREAM = 2;

export const EXPLORER_TYPE_TX = "tx";
export const EXPLORER_TYPE_ADDR = "address";

export const DATE_FORMAT = "yyyy-MM-dd";
export const TIME_FORMAT = "HH:mm";
export const TIME_SUFFIX = "T00:00";

export const START = "start";
export const END = "end";

//might move to a separate class if it becomes clunky
export const ERR_NO_STREAM =
  "Specified stream doesn't exist. Please double check with the sender.";
export const ERR_NOT_CONNECTED =
  "There was an issue with the connection - please try to refresh the page.";

export const PRODUCT_STREAMS = "streams";
export const PRODUCT_VESTING = "vesting";
export const PRODUCT_PAYROLL = "payroll";
export const PRODUCT_MULTISIG = "multisig";

export const products = [
  PRODUCT_STREAMS,
  PRODUCT_VESTING,
  PRODUCT_PAYROLL,
  PRODUCT_MULTISIG,
];

//don't forget to update tailwind.config.js to safelist dynamically generated classes
export const STREAM_STATUS_COLOR = {
  [StreamStatus.scheduled]: "gray", // now < start
  [StreamStatus.streaming]: "green", // start <= now < end
  [StreamStatus.complete]: "blue", //now >= end;
  [StreamStatus.canceled]: "red",
};
