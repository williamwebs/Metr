import { Schema, model, models } from "mongoose";

const WalletSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        reference: String,
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

export const Wallet = models?.Wallet || model("Wallet", WalletSchema);
