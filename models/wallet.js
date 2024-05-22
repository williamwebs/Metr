import { Schema, model, models } from "mongoose";

const WalletSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      default: "0",
    },
    transactions: {
      type: Object,
      default: [],
    },
  },
  { timestamps: true }
);

export const Wallet = models?.Wallet || model("Wallet", WalletSchema);
