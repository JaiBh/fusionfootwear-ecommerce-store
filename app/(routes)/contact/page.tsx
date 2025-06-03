"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Must be minimum 2 characters")
    .max(50, "Must be no more than 50 characters"),
  email: z
    .string()
    .min(5, "Must be minimum 5 characters")
    .max(254, "Must be no more than 254 characters"),
  title: z
    .string()
    .min(4, "Must be minimum 4 characters")
    .max(100, "Must be no more than 100 characters"),
  message: z
    .string()
    .min(15, "Must be minimum 15 characters")
    .max(2000, "Must be no more than 2000 characters"),
});

function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      title: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Contact form payload", values);
    toast.success("Your message has been sent!");
    form.reset();
  };

  return (
    <div className="h-full flex items-center justify-center py-[50px]">
      <div className="w-[90vw] max-w-[640px] bg-card px-6 py-8 space-y-6 rounded-2xl">
        <h1 className="text-present-2 text-center">Contact Us</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} maxLength={50} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="JohnSmith@mail.com"
                      type="email"
                      maxLength={254}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={100} />
                  </FormControl>
                  <FormDescription>
                    A brief summary of the query.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[80px]"
                      maxLength={2000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Send Message</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default ContactPage;
