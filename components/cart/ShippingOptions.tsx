"use client";

import { Dispatch } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SetStateAction } from "jotai";
import { shippingOption } from "@/types";

interface ShippingOptionsProps {
  shippingOption: { option: shippingOption; price: number };
  setShippingOption: Dispatch<
    SetStateAction<{
      option: "standard" | "express" | "eco-friendly" | "next-day";
      price: number;
    }>
  >;
}

function ShippingOptions({
  setShippingOption,
  shippingOption,
}: ShippingOptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Options</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={shippingOption.option}>
          <div
            className="flex items-center space-x-2 w-fit py-1"
            onClick={() => {
              setShippingOption({
                option: "standard",
                price: 4.99,
              });
            }}
          >
            <RadioGroupItem value="standard" id="standard" />
            <Label>
              Standard - 5-7 working days{" "}
              <span className="font-semibold text-primary dark:text-primary-40">
                ($4.99)
              </span>
            </Label>
          </div>
          <div
            className="flex items-center space-x-2 w-fit py-1"
            onClick={() => {
              setShippingOption({
                option: "eco-friendly",
                price: 5.99,
              });
            }}
          >
            <RadioGroupItem value="eco-friendly" id="eco-friendly" />
            <Label>
              Eco-friendly - 5-7 working days{" "}
              <span className="font-semibold text-primary dark:text-primary-40">
                ($5.99)
              </span>
            </Label>
          </div>
          <div
            className="flex items-center space-x-2 w-fit py-1"
            onClick={() => {
              setShippingOption({
                option: "express",
                price: 7.99,
              });
            }}
          >
            <RadioGroupItem value="express" id="express" />

            <Label>
              Express - 1-2 working days{" "}
              <span className="font-semibold text-primary dark:text-primary-40">
                ($7.99)
              </span>
            </Label>
          </div>

          <div
            className="flex items-center space-x-2 w-fit py-1"
            onClick={() => {
              setShippingOption({
                option: "next-day",
                price: 9.99,
              });
            }}
          >
            <RadioGroupItem value="next-day" id="next-day" />
            <Label>
              Next Day - 1 working day{" "}
              <span className="font-semibold text-primary dark:text-primary-40">
                ($9.99)
              </span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
export default ShippingOptions;
