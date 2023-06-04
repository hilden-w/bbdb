"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import supabase from "@/utils/supabase"
import { useRouter } from 'next/navigation';

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const FormSchema = z.object({
  Name: z.string({
    required_error: "Please select a team.",
  }),
})

async function getPlayers() {

const { data, error } = await supabase
.from('PLAYER')
.select('Name')
if (data) return JSON.parse(JSON.stringify(data))
}

export default function ComboboxReactHookForm() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [players, setPlayers] = React.useState<any[]>([])
  const router = useRouter();


  React.useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true)
      const players = await getPlayers()
      setPlayers(players)
      setLoading(false)
    }
    loadPlayers()
  },[])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/q2/display?Player=${data.Name}`)
  }
    return ( <>{loading?(<div>loading</div>): ( <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      { <FormField
        control={form.control}
        name="Name"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Player</FormLabel>
            <Popover>
      <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {field.value
            ? players.find((player)=> player.Name.toLowerCase() === field.value)?.Name
            : "Select player..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search player..." />
          <CommandEmpty>No player found.</CommandEmpty>
          <CommandGroup>
            {players.map((player : {Name:string}) => (
              <CommandItem
                key={player.Name}
                value={player.Name}
                onSelect={(value) => {
                  form.setValue("Name", value)
                  console.log(value)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value === player.Name ? "opacity-100" : "opacity-0"
                  )}
                />
                {player.Name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
            <FormDescription>
              select the player for the query
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />}
      <Button type="submit">Submit</Button>
    </form>
  </Form>)}</>)
}

