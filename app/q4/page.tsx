"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  game: z.number({
    required_error: "Please input a game id",
  }),
})

export default function ComboboxReactHookForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    router.push(`/q4/display?game=${data.game}`)
  }
    return (<><Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
          control={form.control}
          name="game"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GameID</FormLabel>
              <FormControl>
                <Input placeholder="Type in a GameID" {...field} />
              </FormControl>
              <FormDescription>
                Input a GameID to view results the results
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      <Button type="submit">Submit</Button>
    </form>
  </Form>)</>)
}

