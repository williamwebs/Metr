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
        type: {
          type: String,
          enum: ["fund", "withdrawal"],
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    profile: [
      {
        customerName: {
          type: String,
        },
        customerAddress: {
          type: String,
        },
        meterNumber: {
          type: Number,
        },
        meterType: {
          type: String,
        },
        service: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Wallet = models?.Wallet || model("Wallet", WalletSchema);
