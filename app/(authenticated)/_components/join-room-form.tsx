"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/server/actions";
import { useRouter } from "next/navigation";
import { RoomGetSchema } from "@/lib/server/schemas/rooms";

export const JoinRoomForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const form = useForm<z.infer<typeof RoomGetSchema>>({
    resolver: zodResolver(RoomGetSchema),
    defaultValues: {
      id: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem className="text-center">
              <FormLabel>Room code</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  onFocus={() => setFocused(true)}
                  onBlur={() => {
                    onBlur();
                    setFocused(false);
                  }}
                  className="h-20 text-center text-4xl font-bold uppercase tracking-widest"
                  placeholder={focused ? "" : "YARR"}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the room code provided by your host
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          loading={loading}
          size="lg"
          onClick={form.handleSubmit(async (values) => {
            setLoading(true);
            const room = await api.rooms.get({
              id: values.id.toUpperCase(),
            });
            setLoading(false);

            if (!room) {
              form.setError("id", {
                message: "Shiver me timbers! We can't find that room, matey!",
              });
              return;
            }

            router.push(`/r/${room.id}`);
          })}
        >
          Join room
        </Button>
      </form>
    </Form>
  );
};
