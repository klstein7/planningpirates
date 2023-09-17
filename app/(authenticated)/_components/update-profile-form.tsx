"use client";

import { AVATAR_URLS } from "@/app/_util/avatars";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { COLORS, getBackgroundColor } from "../../_util/colors";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
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
import { HiPaintBrush } from "react-icons/hi2";
import { ProfileUpdateSchema } from "@/lib/server/schemas/profiles";
import { useRoomId } from "../r/[roomId]/_hooks/use-room-id";
import { API, api } from "@/lib/server/actions";

export const UpdateUserProfileDialog = ({
  profile,
}: {
  profile: NonNullable<API["profiles"]["get"]>;
}) => {
  const { roomId } = useRoomId();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      name: profile.name,
      avatarUrl: profile.avatarUrl,
      color: profile.color,
    },
  });

  const selectedAvatarUrl = form.watch("avatarUrl");
  const selectedColor = form.watch("color");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <HiPaintBrush className="mr-2 h-4 w-4" />
          Customize
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tailor Yer Pirate Persona!</DialogTitle>
          <DialogDescription>
            Choose yer favorite colors and pick a jolly roger to represent ye!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This be the name that&rsquo;ll show when ye cross swords
                    with other pirates.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <div className="flex flex-wrap justify-center gap-2">
              {COLORS.map((color, index) => (
                <div
                  key={`${color}-${index}`}
                  className={cn(
                    "aspect-square w-6 rounded-full transition-transform duration-200 hover:scale-[100%] md:w-10",
                    getBackgroundColor(color),
                    {
                      "scale-[120%] hover:!scale-[120%]":
                        color === selectedColor,
                      "scale-[80%]": color !== selectedColor,
                    }
                  )}
                  onClick={() => form.setValue("color", color)}
                />
              ))}
            </div>
            <Separator />
            <div className="grid grid-cols-4 gap-4">
              {AVATAR_URLS.map((avatarUrl) => (
                <div
                  key={avatarUrl}
                  className={cn(
                    "aspect-square w-full rounded-full bg-cover bg-center transition-transform duration-150",
                    selectedAvatarUrl === avatarUrl &&
                      getBackgroundColor(selectedColor)
                  )}
                  style={{
                    backgroundImage: `url(${avatarUrl})`,
                  }}
                  onClick={() => form.setValue("avatarUrl", avatarUrl)}
                />
              ))}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={form.handleSubmit(async (values) => {
              setLoading(true);
              await api.profiles.update({
                ...values,
                roomId,
              });
              setLoading(false);
              setOpen(false);
            })}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
